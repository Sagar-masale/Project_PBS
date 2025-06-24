import { ArrowRight, Heart, Target, Users } from "lucide-react";

export const About = () => {
  const stats = [
    { number: "25+", label: "Years of Legacy" },
    { number: "10K+", label: "Happy Customers" },
    { number: "100%", label: "Pure Gold Guarantee" },
    { number: "24/7", label: "Customer Service" },
  ];

  return (
    <div className="text-[#4f3267] bg-[rgb(246,239,246)]">
      {/* Hero Section */}
      <section className="py-14 px-4 sm:px-6 md:px-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-snug">
          Welcome to PBS Jewellers
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Since 1998, PBS Jewellers has been a name synonymous with purity, tradition, and trust in the world of fine jewellery. With over two decades of excellence, we craft not just ornaments, but heirlooms that tell stories.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-14 px-4 sm:px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            To provide high-quality, authentic jewellery that celebrates every milestone of our customers’ lives with trust and elegance.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-3">
              <Target className="text-purple-800 w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Tradition</h3>
            <p className="text-sm sm:text-base">Rooted in rich Indian heritage, every piece reflects timeless culture and values.</p>
          </div>
          <div className="text-center px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-pink-200 rounded-full flex items-center justify-center mb-3">
              <Heart className="text-pink-800 w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Passion</h3>
            <p className="text-sm sm:text-base">Driven by passion for perfection, we design jewellery that wins hearts.</p>
          </div>
          <div className="text-center px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-yellow-200 rounded-full flex items-center justify-center mb-3">
              <Users className="text-yellow-800 w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Community</h3>
            <p className="text-sm sm:text-base">We are proud to be part of countless celebrations and family moments across generations.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#e9daec]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 sm:px-12 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">{s.number}</div>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2 font-normal">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
