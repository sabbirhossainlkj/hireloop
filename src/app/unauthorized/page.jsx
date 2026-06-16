// app/unauthorized/page.jsx
'use client'

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">401</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>

        <p className="mt-2 text-gray-600">
          Sorry, you don't have permission to access this page.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition hover:bg-gray-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}