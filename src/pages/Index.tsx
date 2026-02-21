import { motion } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import CardStrip from "@/components/CardStrip";

const Index = () => {
  return (
    <div className="bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col">
        {/* Warm radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] rounded-full bg-orbee-pink/60 blur-[120px]" />
        </div>

        {/* Nav */}
        <nav className="relative z-10 w-full px-6 sm:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-serif text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs">🌐</span>
              Orbee
            </span>
            <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Features</a>
              <a href="#" className="hover:text-foreground transition-colors">Community</a>
              <a href="#" className="hover:text-foreground transition-colors">Safety</a>
            </div>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get App
          </motion.button>
        </nav>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute top-28 right-8 sm:right-16 z-10"
        >
          <div className="bg-card rounded-full px-4 py-2 shadow-md flex items-center gap-2 text-sm">
            <span className="text-accent">📍</span>
            <span className="text-foreground font-medium">SoHo, NYC</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-32 left-6 sm:left-12 z-10"
        >
          <div className="bg-card rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt="Sarah"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Sarah M.</p>
              <p className="text-xs text-accent">● Nearby</p>
            </div>
          </div>
        </motion.div>

        {/* Center content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-6xl md:text-8xl text-center leading-[1.05] max-w-4xl"
          >
            <span className="text-foreground">Connect in</span>
            <br />
            <span className="text-foreground">the </span>
            <span className="bg-gradient-to-r from-foreground via-[hsl(30,70%,55%)] to-[hsl(35,80%,65%)] bg-clip-text text-transparent">
              Moment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-base sm:text-lg text-muted-foreground text-center max-w-lg"
          >
            Experience the lighter side of social. Real-time connections, zero gravity.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-8 flex items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm shadow-md flex items-center gap-2"
            >
              Launch Orbee
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3.5 rounded-full border border-border text-foreground font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Video
            </motion.button>
          </motion.div>
        </main>
      </section>

      {/* Phone + Cards — below the fold */}
      <section className="relative w-full -mt-16 pb-12">
        <div className="relative z-20 -mb-36 sm:-mb-44 md:-mb-52">
          <PhoneMockup />
        </div>
        <div className="relative z-0">
          <CardStrip />
        </div>
      </section>
    </div>
  );
};

export default Index;
