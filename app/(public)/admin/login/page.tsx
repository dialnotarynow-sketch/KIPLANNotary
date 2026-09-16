'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  const [showReset, setShowReset] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[DEBUG] handleLogin fired', { email, password })
    setLoading(true)
    setError('')
    setResetMessage('')

    console.log('[DEBUG] calling signInWithPassword...')
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('[DEBUG] signInWithPassword returned', { signInError })

    if (signInError) {
      console.log('[DEBUG] signInError branch, setting error and returning')
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log('[DEBUG] getUser returned', { user })

    if (user) {
      const { data: admin } = await supabase
        .from('admins')
        .select('*')
        .eq('email', user.email)
        .eq('is_active', true)
        .single()
      console.log('[DEBUG] admins query returned', { admin })

      if (!admin) {
        console.log('[DEBUG] not admin, signing out')
        await supabase.auth.signOut()
        setError('You are not authorized to access the admin panel.')
        setLoading(false)
        return
      }
    }

    console.log('[DEBUG] redirecting to dashboard')
    router.push('/admin/dashboard')
    router.refresh()
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)
    setError('')
    setResetMessage('')

    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      setError('Please enter your email address first.')
      setResetLoading(false)
      return
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      normalizedEmail,
      {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      }
    )

    setResetLoading(false)

    if (resetError) {
      setError(resetError.message || 'Unable to send the reset email. Please try again later.')
      return
    }

    setResetMessage(
      'If an account exists for this email address, a password reset link has been sent. Please check your inbox.'
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">KIPLAN Admin</h1>
          <p className="text-gray-600 mt-1">
            Sign in to access the dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {resetMessage && (
          <div className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm">
            {resetMessage}
          </div>
        )}

        {!showReset ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowReset(true)
                  setError('')
                  setResetMessage('')
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Enter your admin email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowReset(false)
                  setError('')
                  setResetMessage('')
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}