import { useState } from "react";
import { Search, ShoppingCart, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const navLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Collections", href: "#collections" },
    { name: "AR Try-On", href: "#ar-tryon" },
    { name: "Artisans", href: "#artisans" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-artisan">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-primary">
              ArtisanHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-foreground/70 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-foreground/70 hover:text-primary transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-terra text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            
            {!loading && (
              <div className="hidden md:flex items-center gap-2 ml-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground/80 max-w-[120px] truncate">
                          {user.email?.split("@")[0]}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-muted-foreground text-xs">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="sm" className="bg-primary hover:bg-sage-dark text-primary-foreground">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-foreground/80 hover:text-primary transition-colors py-2 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-sage-dark">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
