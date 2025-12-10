// Mock authentication for Netlify deployment (when backend is not available)

export const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'Aa123456',
};

export const DEMO_USER = {
  id: 'demo-admin-id',
  email: 'admin',
  name: 'Super Admin',
  role: 'super_admin' as const,
  clientId: null,
};

export function validateDemoCredentials(email: string, password: string): boolean {
  return email === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
}

export function isNetlifyDeployment(): boolean {
  return window.location.hostname.includes('netlify.app') || 
         window.location.hostname.includes('pmpkedu');
}


