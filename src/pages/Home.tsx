import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

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
          // Default fallback
          setLocation("/admin/pmpk9");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  if (loading) return null;

  if (user) {
      // If already logged in, redirect based on role
       if (user.role === 'super_admin') {
           // We can't use setLocation directly in render, but since we return null it might be ok or cause a warning.
           // Better to use useEffect, but for now this works as a quick redirect.
           window.location.href = "/super-admin";
       } else {
           window.location.href = "/admin/pmpk9";
       }
       return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            PMPK System
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Login (admin)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <Link href="/site/pmpk9" className="text-blue-600 hover:underline">
              Go to Public Website (PMPK №9)
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
