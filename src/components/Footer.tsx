import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Collections", href: "#collections" },
    { name: "AR Try-On", href: "#ar-tryon" },
    { name: "Artisans", href: "#artisans" },
  ];

  const supportLinks = [
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container-artisan">
        <div className="section-padding pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-6">
                <span className="font-serif text-2xl font-semibold">ArtisanHub</span>
              </Link>
              <p className="text-background/70 leading-relaxed mb-6">
                Connecting you with India's finest artisans and their handcrafted treasures. 
                Every purchase supports traditional craftsmanship.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6">Stay Connected</h4>
              <p className="text-background/70 mb-4">
                Subscribe for new arrivals and artisan stories.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 py-6 px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2026 ArtisanHub. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
