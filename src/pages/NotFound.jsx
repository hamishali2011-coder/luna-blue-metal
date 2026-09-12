import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-[40px] text-ink">Page not found</h1>
      <p className="mt-3 text-[15px] text-ink/55">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-[14.5px] font-semibold text-midnight-700 underline underline-offset-4">
        Back to home
      </Link>
    </div>
  )
}
