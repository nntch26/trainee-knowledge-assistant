import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-6xl font-bold text-gray-800 mb-4">404 Not Found</h2>
      <p className="text-xl text-gray-600 mb-8">Sorry, the page you were looking for was not found.</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}