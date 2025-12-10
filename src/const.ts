export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  // For PMPK admin panel, always use /admin/login
  if (typeof window !== 'undefined') {
    return '/admin/login';
  }
  return '/admin/login';
  
  // OLD OAUTH CODE (commented out - not used for PMPK)
  // const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || "https://example.com";
  // const appId = import.meta.env.VITE_APP_ID || "demo-app-id";
  // const redirectUri = `${window.location.origin}/api/oauth/callback`;
  // const state = btoa(redirectUri);
  // const url = new URL(`${oauthPortalUrl}/app-auth`);
  // url.searchParams.set("appId", appId);
  // url.searchParams.set("redirectUri", redirectUri);
  // url.searchParams.set("state", state);
  // url.searchParams.set("type", "signIn");
  // return url.toString();
};
