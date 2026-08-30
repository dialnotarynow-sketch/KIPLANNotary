import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE = 20 * 1024 * 1024 // 20MB

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminUser()
    // Allow public uploads for translation form if needed, but require admin for general uploads
    // For now, require admin auth
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const inquiryId = formData.get('inquiry_id') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, JPG, JPEG, PNG allowed.' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 20MB.' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = inquiryId ? `inquiries/${inquiryId}/${fileName}` : `general/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, { contentType: file.type })

    if (uploadError) throw uploadError

    // Record in database
    const { data: docRecord, error: dbError } = await supabase.from('documents').insert({
      inquiry_id: inquiryId || null,
      filename: fileName,
      original_name: file.name,
      file_type: file.type,
      file_size: file.size,
      storage_path: filePath,
      uploaded_by: admin.id,
    }).select().single()

    if (dbError) throw dbError

    return NextResponse.json({ success: true, document: docRecord })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
