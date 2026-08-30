import { createAdminClient } from '@/lib/supabase/admin'

export async function generateReferenceNumber(): Promise<string> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.rpc('generate_reference_number')
  if (error) throw error
  return data as string
}
