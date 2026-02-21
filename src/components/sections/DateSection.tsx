import { motion } from "framer-motion";
import BounceCards from "@/components/BounceCards";
import ScrambledText from "@/components/ScrambledText";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=350&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&h=350&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&h=350&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=250&h=350&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&h=350&fit=crop&crop=face",
];

const CARD_TRANSFORMS = [
  "rotate(10deg) translate(-170px)",
  "rotate(5deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(85px)",
  "rotate(2deg) translate(170px)",
];

const DateSection = () => (
  <section className="relative w-full flex items-center px-4 sm:px-12 md:px-20 py-10">
    <div className="flex flex-col md:flex-row items-center w-full gap-8 md:gap-0">
      {/* Text — Left 60% */}
      <div className="w-full md:w-[60%] flex flex-col justify-center gap-4 sm:gap-6 px-2 sm:px-6 md:px-16 py-6 md:py-0">
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground leading-tight">
          Find Your <span className="text-[#FF9A1F]">Date</span>
        </h2>
        <ScrambledText
          radius={80}
          duration={2}
          speed={0.3}
          scrambleChars="·•"
          className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Swipe right to connect, left to pass. Discover people on campus who match your vibe — no awkward DMs needed.
        </ScrambledText>
      </div>

      {/* Bounce Cards — Right 40% */}
      <div className="w-full md:w-[40%] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="scale-[0.6] sm:scale-75 md:scale-100 origin-center">
            <BounceCards
              images={CARD_IMAGES}
              containerWidth={500}
              containerHeight={350}
              animationDelay={0.5}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.8)"
              transformStyles={CARD_TRANSFORMS}
              enableHover
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DateSection;
