import { motion } from "framer-motion";
import { lazy, Suspense, useState, useCallback } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import CardStrip from "@/components/CardStrip";
import TypewriterText from "@/components/TypewriterText";
import orbeeLogo from "@/assets/orbee-logo.png";

const Antigravity = lazy(() => import("@/components/Antigravity"));

const Index = () => {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [allTypingDone, setAllTypingDone] = useState(false);

  const handleLine1Complete = useCallback(() => setLine1Done(true), []);
  const handleLine2Complete = useCallback(() => {
    setLine2Done(true);
    setTimeout(() => setAllTypingDone(true), 200);
  }, []);

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col">
        {/* Colorful Particle Background */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <Suspense fallback={null}>
            <Antigravity
              className="w-full h-full"
              count={250}
              magnetRadius={18}
              ringRadius={12}
              waveSpeed={0.15}
              waveAmplitude={0.5}
              particleSize={1.4}
              lerpSpeed={0.025}
              autoAnimate
              rotationSpeed={0.02}
              depthFactor={0.4}
              fieldStrength={6}
              particleShape="capsule"
            />
          </Suspense>
        </div>

        {/* Nav */}
        <nav className="relative z-10 w-full px-6 sm:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src={orbeeLogo} alt="Orbee" className="h-8 w-auto" />
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

        {/* Center content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-8">
          {/* Typewriter Headline */}
          <h1 className="font-sans font-bold text-5xl sm:text-6xl md:text-8xl text-center leading-[1.08] tracking-tight max-w-4xl min-h-[2.2em]">
            <TypewriterText
              text="Connect in the"
              delay={400}
              speed={80}
              className="text-foreground"
              onComplete={handleLine1Complete}
            />
           
                {line2Done && (
                  <span className="bg-gradient-to-r from-foreground via-[hsl(30,70%,55%)] to-[hsl(35,80%,65%)] bg-clip-text text-transparent">
                    <TypewriterText
                      text="Moment"
                      delay={0}
                      speed={100}
                      className="bg-gradient-to-r from-foreground via-[hsl(30,70%,55%)] to-[hsl(35,80%,65%)] bg-clip-text text-transparent"
                    />
                  </span>
                )}
              </>
            )}
          </h1>

          {/* Subtext + CTAs fade in after typing */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={allTypingDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 text-base sm:text-lg text-muted-foreground text-center max-w-lg opacity-0"
          >
            Experience the lighter side of social. Real-time connections, zero gravity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={allTypingDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-8 flex items-center gap-4 opacity-0"
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
