import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { validateDemoCredentials, DEMO_USER, isNetlifyDeployment } from "@/lib/mock-auth";
import { Info } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("manus-runtime-user-info", JSON.stringify(data.user));
      utils.auth.me.setData(undefined, data.user);
      toast.success("Login successful");
      if (data.user.role === 'super_admin') {
          setLocation("/super-admin");
      } else {
          setLocation("/admin/pmpk9");
      }
    },
    onError: (error) => {
      // If backend is not available (Netlify), try client-side auth
      console.error("Backend auth failed, trying client-side fallback:", error);
      handleClientSideLogin();
    }
  });

  const handleClientSideLogin = () => {
    // Client-side fallback for Netlify deployments (when backend is not available)
    if (validateDemoCredentials(email, password)) {
      localStorage.setItem("manus-runtime-user-info", JSON.stringify(DEMO_USER));
      utils.auth.me.setData(undefined, DEMO_USER);
      toast.success(isNetlifyDeployment() ? "Login successful (Demo Mode - No Backend)" : "Login successful");
      setLocation("/admin/pmpk9");
    } else {
      toast.error("Invalid credentials. Demo: admin / Aa123456");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // On Netlify or if backend not available, use client-side auth immediately
    if (isNetlifyDeployment()) {
      handleClientSideLogin();
      return;
    }
    
    // Otherwise try backend first, fallback to client-side if it fails
    loginMutation.mutate({ email, password });
  };

  if (loading) return null;

  // If already logged in, show message instead of login form
  if (user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Already Logged In
              </CardTitle>
              <CardDescription>
                You are currently logged in as {user.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                {user.role === 'super_admin' && (
                  <Button 
                    onClick={() => setLocation("/super-admin")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Super Admin Panel
                  </Button>
                )}
                <Button 
                  onClick={() => setLocation("/admin/pmpk9")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Go to PMPK Admin Panel
                </Button>
                <Button 
                  onClick={() => setLocation("/")}
                  variant="outline"
                  className="w-full"
                >
                  Back to Website
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            PMPK System Admin
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isNetlifyDeployment() && (
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Demo Mode: Backend not available. Login works with client-side auth.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loginMutation.isPending && !isNetlifyDeployment()}
            >
              {loginMutation.isPending && !isNetlifyDeployment() ? "Logging in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="mb-2">Demo credentials:</p>
            <p className="font-mono text-xs bg-gray-100 px-3 py-2 rounded">
              admin / Aa123456
            </p>
          </div>
          
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
