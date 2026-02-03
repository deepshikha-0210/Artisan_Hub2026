import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains a number", met: /\d/.test(password) },
    { text: "Contains a special character", met: /[!@#$%^&*]/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    if (!isPasswordValid) {
      toast({
        title: "Weak Password",
        description: "Please meet all password requirements.",
        variant: "destructive",
      });
      return;
    }

    if (!email || !name) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, name);

    setIsLoading(false);

    if (error) {
      let errorMessage = "An error occurred during sign up.";
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please sign in instead.";
      } else if (error.message.includes("valid email")) {
        errorMessage = "Please enter a valid email address.";
      }
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account created!",
      description: "Please check your email to verify your account.",
    });
    navigate("/login");
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
      {/* Left Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-sage-dark to-primary" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h2 className="font-serif text-4xl font-semibold mb-6">
              Join Our Community
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-md mx-auto mb-8">
              Create an account to save your favorites, track orders, and get exclusive access to new artisan collections.
            </p>
            <div className="space-y-4 text-left max-w-sm mx-auto">
              {[
                "Access to AR Try-On feature",
                "Personalized recommendations",
                "Direct artisan connections",
                "Exclusive member discounts",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
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

      {/* Right Panel - Form */}
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
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Start your journey with authentic Indian crafts
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-card border-border focus:ring-primary"
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
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
              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req) => (
                    <div key={req.text} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        req.met ? "bg-primary" : "bg-muted"
                      }`}>
                        {req.met && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                      </div>
                      <span className={req.met ? "text-foreground" : "text-muted-foreground"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-sage-dark text-primary-foreground py-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
