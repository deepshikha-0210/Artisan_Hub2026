import { ArrowRight } from "lucide-react";
import potteryImg from "@/assets/pottery.jpg";
import textilesImg from "@/assets/textiles.jpg";
import woodcraftImg from "@/assets/woodcraft.jpg";
import metalartImg from "@/assets/metalart.jpg";

const categories = [
  {
    name: "Pottery",
    description: "Handcrafted ceramic pieces shaped with tradition",
    image: potteryImg,
  },
  {
    name: "Textiles",
    description: "Woven stories in vibrant colors and patterns",
    image: textilesImg,
  },
  {
    name: "Woodcraft",
    description: "Carved masterpieces from sustainable sources",
    image: woodcraftImg,
  },
  {
    name: "Metal Art",
    description: "Intricate designs forged with ancient techniques",
    image: metalartImg,
  },
];

const FeaturedCategories = () => {
  return (
    <section id="shop" className="section-padding bg-secondary/30">
      <div className="container-artisan">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section text-foreground mb-4">
            Featured Handicraft Categories
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Explore our curated collection of authentic Indian handicrafts, each category representing centuries of tradition and artistry.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group card-artisan cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
