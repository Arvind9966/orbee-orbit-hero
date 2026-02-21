import { motion } from "framer-motion";
import { lazy, Suspense, useState, useCallback } from "react";
import TypewriterText from "@/components/TypewriterText";
import { AppleIcon, GooglePlayIcon } from "@/components/icons/StoreIcons";
import orbeeLogo from "@/assets/orbee-logo.png";

const Antigravity = lazy(() => import("@/components/Antigravity"));

const HeroSection = () => {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [allTypingDone, setAllTypingDone] = useState(false);

  const handleLine1Complete = useCallback(() => setLine1Done(true), []);
  const handleLine2Complete = useCallback(() => {
    setLine2Done(true);
    setTimeout(() => setAllTypingDone(true), 200);
  }, []);

  return (
    <section className="relative h-screen min-h-screen max-h-screen flex flex-col overflow-hidden">
      {/* Particle Background */}
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
      <nav className="relative z-10 w-full px-6 sm:px-10 py-5 flex items-center justify-center">
        <img src={orbeeLogo} alt="Orbee" className="h-20 sm:h-24 md:h-[134px] w-auto" />
      </nav>

      {/* Center Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-8">
        <h1 className="font-display font-light text-4xl sm:text-5xl md:text-8xl text-center leading-[1.08] tracking-tight max-w-4xl min-h-[2.2em]">
          <TypewriterText
            text="Connect in the"
            delay={400}
            speed={80}
            className="text-foreground"
            onComplete={handleLine1Complete}
          />
          {line1Done && (
            <>
              <br />
              <span className="text-[#FF9A1F]">
                <TypewriterText
                  text="Moment"
                  delay={0}
                  speed={100}
                  className="text-[#FF9A1F]"
                  onComplete={handleLine2Complete}
                />
              </span>
            </>
          )}
        </h1>

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
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 opacity-0"
        >
          <a
            href="#"
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-muted/60 border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors shadow-sm"
          >
            <AppleIcon />
            App Store
          </a>
          <a
            href="#"
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-muted/60 border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors shadow-sm"
          >
            <GooglePlayIcon />
            Google Play
          </a>
        </motion.div>
      </main>
    </section>
  );
};

export default HeroSection;
