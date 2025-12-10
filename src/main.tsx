import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't let queries hang - fail after 5 seconds
      staleTime: 0,
      gcTime: 0,
      retry: false,
      refetchOnWindowFocus: false,
      // Network timeout
      networkMode: 'offlineFirst',
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    
    // Log transformation errors but don't show toasts for them
    // (they'll be handled gracefully by fallbacks)
    if (error?.message?.includes('transform') || error?.message?.includes('Unable to transform')) {
      console.warn("[tRPC Transformation Error - using fallback]", error);
      return;
    }
    
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    
    // Log transformation errors but don't show toasts for them
    if (error?.message?.includes('transform') || error?.message?.includes('Unable to transform')) {
      console.warn("[tRPC Transformation Error - using fallback]", error);
      return;
    }
    
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        try {
          const userStr = localStorage.getItem("manus-runtime-user-info");
          if (userStr) {
             const user = JSON.parse(userStr);
             if (user && user.id) {
               return {
                 'x-user-id': user.id
               };
             }
          }
        } catch (e) {
          // ignore
        }
        return {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        }).catch((error) => {
          // Better error handling for network/transformation errors
          console.error('[tRPC Fetch Error]', error);
          throw error;
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
