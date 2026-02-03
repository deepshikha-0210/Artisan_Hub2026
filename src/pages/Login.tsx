import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signIn(email, password);

    setIsLoading(false);

    if (error) {
      let errorMessage = "An error occurred during sign in.";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before signing in.";
      }
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold text-primary">ArtisanHub</span>
            </Link>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue your artisan journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card border-border focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-sage-dark text-primary-foreground py-6"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-sage-dark to-primary" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h2 className="font-serif text-4xl font-semibold mb-6">
              Discover Authentic Craftsmanship
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-md mx-auto">
              Join thousands of customers who support traditional artisans and bring heritage into their homes.
            </p>
          </div>
        </div>
        {/* Decorative Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
};

export default Login;
