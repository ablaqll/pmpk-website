import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } =
    options ?? {};
  const utils = trpc.useUtils();
  const [localUser, setLocalUser] = useState<any>(null);

  // Try to get user from localStorage on mount (for Netlify/offline mode)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("manus-runtime-user-info");
      if (stored && stored !== "null" && stored !== "undefined") {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setLocalUser(parsed);
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        // Ignore UNAUTHORIZED errors on logout
      }
    } finally {
      // Clear local storage
      localStorage.removeItem("manus-runtime-user-info");
      setLocalUser(null);
      utils.auth.me.setData(undefined, null);
      try {
        await utils.auth.me.invalidate();
      } catch (e) {
        // Ignore errors
      }
    }
  }, [logoutMutation, utils]);

  const state = useMemo(() => {
    // Use backend data if available, otherwise fall back to localStorage
    const currentUser = meQuery.data || localUser;
    
    if (currentUser) {
      localStorage.setItem(
        "manus-runtime-user-info",
        JSON.stringify(currentUser)
      );
    }
    
    return {
      user: currentUser ?? null,
      loading: meQuery.isLoading || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(currentUser),
    };
  }, [
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    logoutMutation.error,
    logoutMutation.isPending,
    localUser,
  ]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (meQuery.isLoading || logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    logoutMutation.isPending,
    meQuery.isLoading,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
