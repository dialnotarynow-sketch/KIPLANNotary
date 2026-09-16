import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE = 20 * 1024 * 1024 // 20MB

// Public upload endpoint for customer-submitted documents (e.g. ID photos)
// attached during inquiry submission. Deliberately NOT admin-gated, since
// public customers are never authenticated — but scoped tightly:
// a file can only be attached to an inquiry_id that already exists
// (a real UUID returned from a just-created inquiry), which prevents
// arbitrary/unassociated uploads without requiring customer accounts.
export async function POST(req: NextRequest) {
  console.log('[UPLOAD-DEBUG][server] /api/public-upload POST received')
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const inquiryId = formData.get('inquiry_id') as string

    console.log('[UPLOAD-DEBUG][server] parsed formData. file present:', !!file, 'name:', file?.name, 'type:', file?.type, 'size:', file?.size, 'inquiryId:', inquiryId)

    if (!file) {
      console.log('[UPLOAD-DEBUG][server] FAIL: no file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!inquiryId) {
      console.log('[UPLOAD-DEBUG][server] FAIL: no inquiry_id provided')
      return NextResponse.json({ error: 'inquiry_id required' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      console.log('[UPLOAD-DEBUG][server] FAIL: invalid file type:', file.type)
      return NextResponse.json({ error: 'Invalid file type. Only PDF, JPG, JPEG, PNG allowed.' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      console.log('[UPLOAD-DEBUG][server] FAIL: file too large:', file.size)
      return NextResponse.json({ error: 'File too large. Maximum 20MB.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Verify the inquiry actually exists before accepting the upload.
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .select('id')
      .eq('id', inquiryId)
      .single()

    console.log('[UPLOAD-DEBUG][server] inquiry lookup result:', { inquiry, inquiryError })

    if (inquiryError || !inquiry) {
      console.log('[UPLOAD-DEBUG][server] FAIL: inquiry not found for id', inquiryId)
      return NextResponse.json({ error: 'Invalid inquiry_id' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `inquiries/${inquiryId}/${fileName}`

    console.log('[UPLOAD-DEBUG][server] uploading to storage path:', filePath)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, { contentType: file.type })

    console.log('[UPLOAD-DEBUG][server] storage upload result:', { uploadData, uploadError })

    if (uploadError) throw uploadError

const { data: docRecord, error: dbError } = await supabase.from('documents').insert({
  inquiry_id: inquiryId,
  filename: fileName,
  original_name: file.name,
  file_type: file.type,
  file_size: file.size,
  storage_path: filePath,
  uploaded_by: null, // no admin involved — public customer upload
  document_role: 'client_document',
}).select().single()

    console.log('[UPLOAD-DEBUG][server] documents insert result:', { docRecord, dbError })

    if (dbError) throw dbError

    console.log('[UPLOAD-DEBUG][server] SUCCESS, returning document:', docRecord?.id)
    return NextResponse.json({ success: true, document: docRecord })
  } catch (error) {
    console.error('[UPLOAD-DEBUG][server] Public upload error (caught exception):', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}