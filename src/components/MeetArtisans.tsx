import artisanRajesh from "@/assets/artisan-rajesh.jpg";
import artisanPriya from "@/assets/artisan-priya.jpg";
import artisanArjun from "@/assets/artisan-arjun.jpg";

const artisans = [
  {
    name: "Rajesh Kumar",
    title: "MASTER POTTER",
    bio: "Three generations of pottery craftsmanship from Rajasthan, creating timeless pieces with traditional techniques.",
    image: artisanRajesh,
    location: "Jaipur, Rajasthan",
  },
  {
    name: "Priya Devi",
    title: "TEXTILE WEAVER",
    bio: "Preserving the ancient art of handloom weaving, creating vibrant textiles with natural dyes and traditional patterns.",
    image: artisanPriya,
    location: "Varanasi, UP",
  },
  {
    name: "Arjun Singh",
    title: "WOOD CARVER",
    bio: "Intricate woodwork inspired by temple architecture, each piece carved with precision and reverence for tradition.",
    image: artisanArjun,
    location: "Saharanpur, UP",
  },
];

const MeetArtisans = () => {
  return (
    <section id="artisans" className="section-padding bg-secondary/30">
      <div className="container-artisan">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section text-foreground mb-4">
            Meet the Artisans
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Every piece tells a story of dedication, skill, and cultural heritage. 
            Get to know the master craftspeople behind our collections.
          </p>
        </div>

        {/* Artisan Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <div
              key={artisan.name}
              className="group card-artisan animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Location Tag */}
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground">
                  📍 {artisan.location}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-semibold text-terra tracking-wider mb-2">
                  {artisan.title}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  {artisan.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {artisan.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetArtisans;
