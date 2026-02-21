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
            <img src={orbeeLogo} alt="Orbee" className="h-20 w-auto" />
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

          {/* Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={allTypingDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-5 flex items-center gap-4 opacity-0"
          >
            <a
              href="#"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-muted/60 border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors shadow-sm"
            >
              <span className="text-lg">🍏</span>
              App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-muted/60 border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors shadow-sm"
            >
              <span className="text-lg">🤖</span>
              Google Play
            </a>
          </motion.div>
        </main>
      </section>

      {/* Gallery Section */}
      <section className="relative w-full min-h-[70vh] flex items-center px-6 sm:px-12 md:px-20 py-16">
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
      <section className="relative w-full flex items-center px-6 sm:px-12 md:px-20 py-16">
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

      {/* Join Waiting List */}
      <section className="relative w-full py-20 px-6 sm:px-12 md:px-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
            Coming Soon
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight">
            Be the First to <span className="text-[#FF9A1F]">Orbee</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-md">
            Join the waitlist and get early access when we launch on your campus. No spam, just good vibes.
          </p>
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
          >
            <input
              type="email"
              placeholder="your@email.com"
              maxLength={255}
              required
              className="flex-1 w-full px-5 py-3.5 rounded-full border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm shadow-md whitespace-nowrap"
            >
              Join Waitlist
            </motion.button>
          </motion.form>
          <p className="mt-4 text-xs text-muted-foreground/60">
            2,400+ students already signed up
          </p>

          {/* App Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-muted/60 border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors shadow-sm"
            >
              <span className="text-xl">🍏</span>
              App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-muted/60 border border-border/50 text-foreground font-medium text-sm hover:bg-muted transition-colors shadow-sm"
            >
              <span className="text-xl">🤖</span>
              Google Play
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#2A2118] text-white/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-14">
          <div className="flex flex-col md:flex-row items-start gap-16">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <img src={orbeeLogo} alt="Orbee" className="h-18 w-auto brightness-0 invert" />
              <p className="text-sm text-white/50 leading-relaxed">
                The lighter side of social. Real-time connections, zero gravity.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-16">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Product</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Safety</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Community</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Company</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Blog</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Careers</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Legal</span>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex items-center justify-center">
            <p className="text-xs text-white/30">© Copyright Orbee 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
