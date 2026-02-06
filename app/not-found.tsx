import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-pink-600 mb-4">
        404
      </h1>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Page not found
      </h2>

      <p className="text-gray-600 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
        Let’s get you back to flowers 🌸
      </p>

      <Link
        href="/"
        className="px-5 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Go to Home
      </Link>
    </div>
  );
}
