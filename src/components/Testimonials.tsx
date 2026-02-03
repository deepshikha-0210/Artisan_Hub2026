import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    location: "Mumbai",
    text: "The AR feature made it so easy to visualize the pottery in my living room. The quality is exceptional and I love supporting artisans directly.",
    rating: 5,
  },
  {
    name: "Vikram Patol",
    location: "Bangalore",
    text: "Beautiful textile with incredible craftsmanship. Knowing that my purchase supports traditional weavers makes it even more special.",
    rating: 5,
  },
  {
    name: "Meera Iyer",
    location: "Chennai",
    text: "The wooden sculpture I ordered exceeded my expectations. Each detail shows the artisan's skill and dedication to their craft.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-artisan">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Hear from customers who have brought authentic Indian craftsmanship into their homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="card-artisan p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="h-10 w-10 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-terra text-terra" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6 text-lg">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-border">
                <p className="font-serif text-lg font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
