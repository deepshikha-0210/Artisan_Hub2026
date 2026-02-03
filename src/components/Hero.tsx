import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-beige opacity-80" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-terra/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-artisan relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Discover Authentic Indian Craftsmanship</span>
          </div>

          {/* Main Heading */}
          <h1 className="heading-display text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Handcrafted Heritage,{" "}
            <span className="text-primary">Reimagined</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover authentic Indian handcrafts and try them in your space using AR before you buy. 
            Connect with master artisans and bring timeless traditions into your modern home.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-sage-dark text-primary-foreground px-8 py-6 text-lg font-medium shadow-card hover:shadow-elevated transition-all duration-300 group"
            >
              Explore Crafts
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="#ar-tryon">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-medium transition-all duration-300"
              >
                Try in AR
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Artisans</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-primary">10k+</p>
              <p className="text-sm text-muted-foreground mt-1">Products</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-primary">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Craft Forms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
