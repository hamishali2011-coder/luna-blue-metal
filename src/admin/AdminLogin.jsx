import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'

// The admin login screen only asks for a password — this is the email
// behind the scenes that the password is checked against in Supabase.
// Change this if you ever create a different admin account.
const ADMIN_EMAIL = 'hamishali2011@gmail.com'

export default function AdminLogin() {
  const { signIn, isAuthenticated } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: signInError } = await signIn(ADMIN_EMAIL, password)
    if (signInError) setError(signInError.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-midnight-900 grid place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo dark />
        </div>
        <div className="bg-paper rounded-2xl p-7 shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <Lock size={16} className="text-midnight-600" />
            <h1 className="font-display text-[20px] text-ink">Admin sign in</h1>
          </div>
          <p className="text-[13.5px] text-ink/50 mb-6">Authorized studio staff only.</p>

          {!isSupabaseConfigured && (
            <p className="mb-4 text-[13px] text-amber-700 bg-amber-50 rounded-lg px-3 py-2.5">
              Supabase isn't connected yet. Add your project credentials to the .env file, create
              an admin user in Supabase Authentication, then sign in here.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-ink/70 mb-1.5">Password</label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-silver-300 px-4 py-3 text-[14.5px] outline-none focus:border-midnight-500"
              />
            </div>
            {error && <p className="text-[13px] text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-midnight-700 text-white px-6 py-3.5 rounded-full text-[14.5px] font-semibold hover:bg-midnight-800 transition-colors disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
