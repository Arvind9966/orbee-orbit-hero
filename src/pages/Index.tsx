import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import CardStrip from "@/components/CardStrip";

const Index = () => {
  return (
    <div className="bg-background overflow-hidden">
      {/* Hero — full viewport */}
      <section className="relative min-h-screen flex flex-col">
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

        {/* Centered content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl text-center leading-[1.1] text-foreground max-w-3xl"
        >
          Meet your campus orbit.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-5 text-base sm:text-lg text-muted-foreground text-center max-w-md"
        >
          Discover students around you based on shared interests.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.04, boxShadow: "0 8px 30px -8px hsl(240 20% 12% / 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-md flex items-center gap-2"
        >
          Enter the Orbit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.button>
        </main>

        {/* Phone + Card strip pinned to bottom of hero */}
        <div className="relative w-full mt-auto">
          <div className="relative z-20 -mb-36 sm:-mb-44 md:-mb-52">
            <PhoneMockup />
          </div>
          <div className="relative z-0">
            <CardStrip />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
