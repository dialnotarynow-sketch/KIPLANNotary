import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const documentId = searchParams.get('id')

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: doc, error: docError } = await supabase
      .from('documents')
      .select('storage_path')
      .eq('id', documentId)
      .single()

    if (docError || !doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const { data: signedUrl, error: urlError } = await supabase.storage
      .from('documents')
      .createSignedUrl(doc.storage_path, 3600)

    if (urlError) throw urlError

    return NextResponse.json({ url: signedUrl?.signedUrl })
  } catch (error) {
    console.error('Document signed URL error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
