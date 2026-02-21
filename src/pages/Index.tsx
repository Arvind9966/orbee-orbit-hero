import { motion } from "framer-motion";
import { lazy, Suspense, useState, useCallback } from "react";
import CircularGallery from "@/components/CircularGallery";
import TypewriterText from "@/components/TypewriterText";
import ScrambledText from "@/components/ScrambledText";
import TinderCards from "@/components/TinderCards";
import BounceCards from "@/components/BounceCards";
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
      <section className="relative h-screen min-h-screen max-h-screen flex flex-col overflow-hidden">
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
          <h1 className="font-display font-light text-5xl sm:text-6xl md:text-8xl text-center leading-[1.08] tracking-tight max-w-4xl min-h-[2.2em]">
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

      {/* Gallery Section */}
      <section className="relative w-full h-screen flex items-center px-6 sm:px-12 md:px-20">
        <div className="flex flex-col md:flex-row items-center md:items-stretch w-full h-[80vh] gap-0">
          {/* Gallery Card - 40% */}
          <div className="relative z-20 w-full md:w-[40%] h-[50vh] md:h-full rounded-3xl overflow-hidden border border-border/30 bg-muted/10 shrink-0 [filter:grayscale(100%)]">
            <CircularGallery
              items={[
                { image: "/images/dining-bubbles.jpg", text: "Dining Bubbles" },
                { image: "/images/hobby-bubbles.jpg", text: "Hobby Bubbles" },
                { image: "/images/travel-bubbles.jpg", text: "Travel Bubbles" },
                { image: "/images/interest-bubbles.jpg", text: "Interest Bubbles" },
                { image: "/images/party-bubbles.jpg", text: "Party Bubbles" },
                { image: "/images/chill-bubbles.jpg", text: "Chill Bubbles" },
              ]}
              bend={3}
              textColor="#000000"
              font="bold 24px 'Google Sans Flex', sans-serif"
              borderRadius={0.05}
              scrollSpeed={2}
            />
          </div>

          {/* Text Content - 60% */}
          <div className="w-full md:w-[60%] flex flex-col justify-center gap-6 px-6 md:px-16 py-8 md:py-0">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight">
              Create Your <span className="text-[#FF9A1F]">Bubble</span>
            </h2>
            <ScrambledText
              radius={80}
              duration={2}
              speed={0.3}
              scrambleChars="·•"
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Build your own circle of campus connections. From dining partners to travel buddies, hobby groups to party squads — find your people and create moments that matter.
            </ScrambledText>
          </div>
        </div>
      </section>

      {/* Find Your Date — Tinder Style */}
      <section className="relative w-full min-h-screen flex items-center px-6 sm:px-12 md:px-20 py-16">
        <div className="flex flex-col md:flex-row items-center w-full gap-12 md:gap-0">
          {/* Text — Left 40% */}
          <div className="w-full md:w-[40%] flex flex-col gap-6 md:pr-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium tracking-widest uppercase text-accent"
            >
              Swipe & Match
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight"
            >
              Find Your <span className="text-[#FF9A1F]">Date</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md"
            >
              Swipe right to connect, left to pass. Discover people on campus who match your vibe — no awkward DMs needed.
            </motion.p>
          </div>

          {/* Bounce Cards — Right 60% */}
          <div className="w-full md:w-[60%] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <BounceCards
                images={[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=350&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&h=350&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&h=350&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=250&h=350&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&h=350&fit=crop&crop=face",
                ]}
                containerWidth={500}
                containerHeight={350}
                animationDelay={0.5}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.8)"
                transformStyles={[
                  "rotate(10deg) translate(-170px)",
                  "rotate(5deg) translate(-85px)",
                  "rotate(-3deg)",
                  "rotate(-10deg) translate(85px)",
                  "rotate(2deg) translate(170px)",
                ]}
                enableHover
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
