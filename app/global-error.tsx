"use client";
import React, { useEffect } from "react";

export function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error: ", error);
  }, [error]);
  return (
    <html>
      <body>
        <div className="h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-red-600">Something went wrong!</h2>
          <p className="mt-2 text-gray-700">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
