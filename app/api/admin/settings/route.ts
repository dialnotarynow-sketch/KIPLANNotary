import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('key')

    if (error) {
      console.error('[SETTINGS-DEBUG] GET Supabase error:', error)

      return NextResponse.json(
        {
          error: error.message,
          details: error.details || null,
          hint: error.hint || null,
          code: error.code || null,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || [] })
  } catch (error: any) {
    console.error('[SETTINGS-DEBUG] GET error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || null,
        hint: error?.hint || null,
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { key, value, value_json } = body

    if (!key) {
      return NextResponse.json(
        { error: 'Key required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Use the public.admins ID, not the auth.users ID.
    const adminId = admin.admin.id

    const { data, error } = await supabase
      .from('settings')
      .update({
        value: value ?? '',
        value_json: value_json ?? null,
        updated_by: adminId,
        updated_at: new Date().toISOString(),
      })
      .eq('key', key)
      .select()
      .maybeSingle()

    if (error) {
      console.error('[SETTINGS-DEBUG] PATCH Supabase error:', error)

      return NextResponse.json(
        {
          error: error.message,
          details: error.details || null,
          hint: error.hint || null,
          code: error.code || null,
        },
        { status: 500 }
      )
    }

    // If the setting does not exist yet, create it.
    if (!data) {
      const { data: inserted, error: insertError } = await supabase
        .from('settings')
        .insert({
          key,
          value: value ?? '',
          value_json: value_json ?? null,
          updated_by: adminId,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (insertError) {
        console.error(
          '[SETTINGS-DEBUG] INSERT Supabase error:',
          insertError
        )

        return NextResponse.json(
          {
            error: insertError.message,
            details: insertError.details || null,
            hint: insertError.hint || null,
            code: insertError.code || null,
          },
          { status: 500 }
        )
      }

      return NextResponse.json({ data: inserted })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('[SETTINGS-DEBUG] PATCH error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || null,
        hint: error?.hint || null,
      },
      { status: 500 }
    )
  }
}