import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="text-center">
        <h1 className="text-6xl font-black text-ink mb-4">404</h1>
        <h2 className="text-2xl font-bold text-ink mb-6">Page Not Found</h2>
        <p className="text-ink/60 mb-8 max-w-md mx-auto">
          The trail seems to have gone cold. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-sage text-canvas rounded-full px-8 py-3 font-bold hover:bg-sage-light transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
