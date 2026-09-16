'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const MIN_PASSWORD_LENGTH = 8

type SessionState = 'checking' | 'ready' | 'invalid'

export default function ResetPasswordPage() {
  const [sessionState, setSessionState] = useState<SessionState>('checking')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Supabase fires a PASSWORD_RECOVERY auth event once it has parsed the
    // recovery token from the URL (hash fragment or ?code=, depending on flow).
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionState('ready')
      }
    })

    // Fallback: the event can fire before this effect subscribes, so also
    // check directly whether a session already exists on mount.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionState((prev) => (prev === 'checking' ? 'ready' : prev))
      }
    })

    // If neither the event nor an existing session shows up quickly, the
    // link was invalid, expired, or already used.
    const timeout = setTimeout(() => {
      setSessionState((prev) => (prev === 'checking' ? 'invalid' : prev))
    }, 4000)

    return () => {
      listener.subscription.unsubscribe()
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) {
      setError(updateError.message || 'Could not update password. Your reset link may have expired — request a new one from the login page.')
      return
    }

    // Sign out of the temporary recovery session so the admin logs back in
    // fresh with the new password (and goes through the normal admin check).
    await supabase.auth.signOut()
    setSuccess(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-1">Choose a new password for your admin account</p>
        </div>

        {sessionState === 'checking' && (
          <p className="text-gray-600 text-sm text-center">Verifying your reset link…</p>
        )}

        {sessionState === 'invalid' && (
          <div className="space-y-4">
            <div className="bg-red-50 text-red-700 p-3 rounded text-sm">
              This reset link is invalid or has expired. Please request a new one from the login page.
            </div>
            <button
              onClick={() => router.push('/admin/login')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        )}

        {sessionState === 'ready' && !success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}

        {success && (
          <div className="space-y-4">
            <div className="bg-green-50 text-green-700 p-3 rounded text-sm">
              Your password has been updated. You can now sign in with your new password.
            </div>
            <button
              onClick={() => router.push('/admin/login')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}