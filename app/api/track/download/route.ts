import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ref = searchParams.get("ref")

    if (!ref) {
      return NextResponse.json(
        { error: "Reference number required" },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Find the application using the customer's tracking number.
    const { data: inquiry, error: inquiryError } = await supabase
      .from("inquiries")
      .select("id, reference_number, status")
      .eq("reference_number", ref)
      .single()

    if (inquiryError || !inquiry) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }

    // Only allow downloads after the translation has been completed.
    const allowedStatuses = ["ready", "completed", "closed"]

    if (!allowedStatuses.includes(inquiry.status)) {
      return NextResponse.json(
        { error: "Certified translation is not ready for download" },
        { status: 403 }
      )
    }

    // Only retrieve certified translations.
    // Applicant documents and ID documents cannot be downloaded
    // through this customer route.
    const { data: documents, error: documentError } = await supabase
      .from("documents")
      .select("storage_path, original_name, file_type")
      .eq("inquiry_id", inquiry.id)
      .eq("document_role", "certified_translation")
      .order("created_at", { ascending: true })

    if (documentError) {
      console.error(
        "Certified translation lookup error:",
        documentError
      )

      return NextResponse.json(
        { error: "Unable to locate certified translations" },
        { status: 500 }
      )
    }

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { error: "Certified translation is not available yet" },
        { status: 404 }
      )
    }

    // Generate a temporary signed URL for every certified translation.
    // The storage paths themselves are never exposed to the customer.
    const downloads = []

    for (const document of documents) {
      const { data: signedUrl, error: signedUrlError } =
        await supabase.storage
          .from("documents")
          .createSignedUrl(document.storage_path, 300)

      if (signedUrlError || !signedUrl?.signedUrl) {
        console.error(
          "Certified translation signed URL error:",
          signedUrlError
        )

        return NextResponse.json(
          { error: "Unable to generate secure download link" },
          { status: 500 }
        )
      }

      downloads.push({
        url: signedUrl.signedUrl,
        filename: document.original_name,
        fileType: document.file_type,
      })
    }

    return NextResponse.json({
      downloads,
    })
  } catch (error) {
    console.error("Track download error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}