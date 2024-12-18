"use client";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    // Log error ke console
    console.error(error);
  }, [error]);

  return (
    <div>
      <Error title="An error occurred" statusCode={error?.statusCode || 500} />
    </div>
  );
}
