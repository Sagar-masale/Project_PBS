import { ArrowRight, Heart, Target, Users, Linkedin, Twitter } from "lucide-react";

export const About = () => {
  const stats = [
    { number: "25+", label: "Years of Legacy" },
    { number: "10K+", label: "Happy Customers" },
    { number: "100%", label: "Pure Gold Guarantee" },
    { number: "24/7", label: "Customer Service" },
  ];

  const teamMembers = [
    {
      name: "Prakash B. Salegaonkar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c5e2?w=300&h=300&fit=crop&crop=face",
      bio: "A visionary leader who started PBS Jewellers with a mission to bring purity and trust in every ornament.",
    },
    {
      name: "Sneha Salegaonkar",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Designs every jewellery piece with a blend of tradition and modern elegance.",
    },
    {
      name: "Rohit Salegaonkar",
      role: "Marketing Head",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Drives PBS Jewellers' reach through innovative campaigns and customer engagement.",
    },
    {
      name: "Kavita Joshi",
      role: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Ensures every customer feels special, from their first visit to their final purchase.",
    },
  ];

  return (
    <div className="text-[#4f3267] bg-[rgb(246,239,246)]">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to PBS Jewellers</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Since 1998, PBS Jewellers has been a name synonymous with purity, tradition, and trust in the world of fine jewellery. With over two decades of excellence, we craft not just ornaments, but heirlooms that tell stories.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto">
            To provide high-quality, authentic jewellery that celebrates every milestone of our customers’ lives with trust and elegance.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 px-4 md:px-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-4">
              <Target className="text-purple-800 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tradition</h3>
            <p>Rooted in rich Indian heritage, every piece reflects timeless culture and values.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-pink-200 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-pink-800 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Passion</h3>
            <p>Driven by passion for perfection, we design jewellery that wins hearts.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-yellow-200 rounded-full flex items-center justify-center mb-4">
              <Users className="text-yellow-800 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p>We are proud to be part of countless celebrations and family moments across generations.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#e9daec] mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="text-3xl font-bold">
              {s.number}
              <p className="text-sm mt-2 font-normal">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
    </div>
  );
};
export default About;