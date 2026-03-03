"use client";

import IntroLoader from "@/components/common/Loading/IntroLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {loading && <IntroLoader onFinish={() => setLoading(false)} />}
{
        !loading && children
}
    </QueryClientProvider>
  );
}
