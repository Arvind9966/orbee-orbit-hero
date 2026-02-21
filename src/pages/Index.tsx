import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import PhoneMockup from "@/components/PhoneMockup";

const profiles = [
  { name: "Maya", interest: "🎸 Music", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Jordan", interest: "🏀 Basketball", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya", interest: "📸 Photography", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
  { name: "Ethan", interest: "🎨 Design", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
  { name: "Zara", interest: "📚 Literature", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face" },
  { name: "Leo", interest: "🎮 Gaming", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orbee-pink via-orbee-lavender to-background overflow-hidden">
      {/* Nav */}
      <nav className="w-full px-6 sm:px-10 py-5">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-2xl text-foreground tracking-tight"
        >
          Orbee
        </motion.span>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center px-6 pt-12 sm:pt-20 pb-24">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl text-center leading-tight text-foreground max-w-2xl"
        >
          Meet your
          <br />
          campus orbit.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground text-center max-w-md"
        >
          Discover students around you based on shared interests.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.04, boxShadow: "0 8px 30px -8px hsl(240 20% 12% / 0.25)" }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-base shadow-md transition-shadow"
        >
          Enter the Orbit
        </motion.button>

        {/* Visual Section */}
        <div className="relative mt-20 sm:mt-28 w-full max-w-3xl mx-auto">
          {/* Profile cards - positioned around the phone */}
          <div className="absolute inset-0 z-0">
            {/* Left cards */}
            <div className="absolute left-0 sm:left-4 top-8 sm:top-4">
              <ProfileCard {...profiles[0]} index={0} />
            </div>
            <div className="absolute left-6 sm:left-16 bottom-4 sm:bottom-8">
              <ProfileCard {...profiles[1]} index={1} />
            </div>

            {/* Top center */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-10">
              <ProfileCard {...profiles[2]} index={2} isCenter />
            </div>

            {/* Right cards */}
            <div className="absolute right-0 sm:right-4 top-8 sm:top-4">
              <ProfileCard {...profiles[3]} index={3} />
            </div>
            <div className="absolute right-6 sm:right-16 bottom-4 sm:bottom-8">
              <ProfileCard {...profiles[4]} index={4} />
            </div>

            {/* Bottom center */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 sm:-bottom-8">
              <ProfileCard {...profiles[5]} index={5} />
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative z-10 py-16">
            <PhoneMockup />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
