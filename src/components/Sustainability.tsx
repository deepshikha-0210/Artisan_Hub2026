import { Leaf, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable materials and traditional methods that respect our planet",
  },
  {
    icon: Heart,
    title: "Fair Wages",
    description: "Direct support to artisans ensuring fair compensation for their craft",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Empowering rural communities and preserving cultural heritage",
  },
];

const Sustainability = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-artisan">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section mb-4">
            Sustainability & Fair Trade
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We are committed to ethical practices that benefit artisans, communities, and our environment.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-6">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">
                {value.title}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-16 border-t border-primary-foreground/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-serif text-4xl md:text-5xl font-semibold mb-2">100%</p>
              <p className="text-sm text-primary-foreground/70">Handcrafted</p>
            </div>
            <div>
              <p className="font-serif text-4xl md:text-5xl font-semibold mb-2">85%</p>
              <p className="text-sm text-primary-foreground/70">Revenue to Artisans</p>
            </div>
            <div>
              <p className="font-serif text-4xl md:text-5xl font-semibold mb-2">Zero</p>
              <p className="text-sm text-primary-foreground/70">Carbon Footprint Goal</p>
            </div>
            <div>
              <p className="font-serif text-4xl md:text-5xl font-semibold mb-2">200+</p>
              <p className="text-sm text-primary-foreground/70">Villages Supported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
