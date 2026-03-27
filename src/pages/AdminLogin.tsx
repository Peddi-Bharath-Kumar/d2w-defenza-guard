import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/api/adminApi";

import logo from "@/assets/deals2wheels-logo100.png";
import bgImage from "@/assets/store-look.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginAdmin(email, password);

      localStorage.setItem("loggedInAdmin", JSON.stringify(res.data));

      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Portal",
      });

      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error?.response?.data || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark blur overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Bigger brighter logo */}
        <div className="text-center mb-4">
  <img
    src={logo}
    alt="D2W Logo"
    className="mx-auto w-24 h-24 object-contain mb-1 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
  />

  <h1 className="text-3xl font-bold text-white leading-tight">
    D2W Defenza
  </h1>

  <p className="text-gray-200 text-sm mt-1">Admin Portal</p>
</div>

        {/* Login card */}
        <Card className="w-full bg-white/12 backdrop-blur-lg border border-white/25 shadow-2xl rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2 text-white">
              <Lock className="w-5 h-5" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-gray-200">
              Enter your credentials to access the warranty management system
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 text-white placeholder:text-gray-200 border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/20 text-white placeholder:text-gray-200 border-white/30"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-200 mt-6">
          <a href="/" className="hover:text-white transition-colors">
            ← Back to Website
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;