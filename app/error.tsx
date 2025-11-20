"use client";

import { useEffect } from "react";
import { CONTENT } from "@/constants/content";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-brand-dark text-white p-4">
      <div className="bg-brand-card p-8 rounded-lg text-center max-w-md border border-white/10">
        <h2 className="text-2xl font-inter font-medium mb-4 text-red-400">
          {CONTENT.error.title}
        </h2>
        <p className="text-gray-400 mb-6">{CONTENT.error.description}</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-white text-brand-dark px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          {CONTENT.error.retryButton}
        </button>
      </div>
    </div>
  );
}
