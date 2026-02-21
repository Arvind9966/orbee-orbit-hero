import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CircularGallery from "@/components/CircularGallery";

const PhoneMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale from 0.6 → 1 as it enters view
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);
  // Slide up from 120px
  const y = useTransform(scrollYProgress, [0, 0.4], [120, 0]);
  // Fade in
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <div ref={containerRef} className="relative z-20 w-60 sm:w-72 md:w-80 mx-auto">
      <motion.div
        style={{ scale, y, opacity }}
        className="relative"
      >
        {/* Phone frame */}
        <div className="relative rounded-[2.8rem] border-[8px] border-foreground/90 bg-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden aspect-[9/19]">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground rounded-full z-10" />

          {/* Status bar */}
          <div className="absolute top-2 left-6 text-[10px] font-semibold text-foreground z-10">9:41</div>
          <div className="absolute top-2 right-5 flex items-center gap-0.5 z-10">
            <svg className="w-3.5 h-3.5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
            <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          </div>

          {/* Screen content */}
          <div className="h-full w-full bg-card pt-12 px-4 pb-6">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.08} autoScrollSpeed={0.3} scrollSpeed={1} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhoneMockup;
