import { motion } from "framer-motion";

const profiles = [
  { name: "Maya", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face" },
  { name: "Jordan", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face" },
  { name: "Priya", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face" },
  { name: "Ethan", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face" },
  { name: "Zara", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face" },
  { name: "Leo", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop&crop=face" },
  { name: "Sofia", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face" },
  { name: "Kai", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" },
];

const CardStrip = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex items-center justify-center gap-3 sm:gap-4 px-4"
      >
        {profiles.map((profile, i) => {
          const distFromCenter = Math.abs(i - (profiles.length - 1) / 2);
          const isOuter = distFromCenter > 1.5;

          return (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`
                flex-shrink-0 w-28 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52
                rounded-2xl overflow-hidden shadow-md
                ${isOuter ? "blur-[2px] opacity-60" : ""}
              `}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CardStrip;
