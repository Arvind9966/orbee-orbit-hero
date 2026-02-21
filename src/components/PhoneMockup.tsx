import { motion } from "framer-motion";

const PhoneMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="relative z-10 w-56 sm:w-64 md:w-72 mx-auto"
    >
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border-[6px] border-foreground/10 bg-card shadow-2xl overflow-hidden aspect-[9/19]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/10 rounded-b-2xl z-10" />

        {/* Screen content */}
        <div className="h-full pt-8 px-4 pb-4 flex flex-col items-center gap-3">
          {/* Profile picture */}
          <div className="w-16 h-16 rounded-full bg-orbee-lavender overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Alex Rivera</p>
            <p className="text-[10px] text-muted-foreground">Computer Science • Sophomore</p>
          </div>

          {/* Interest tags */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-1">
            {["🎵 Music", "💻 Code", "📷 Photo"].map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 rounded-full bg-orbee-pink text-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Fake content lines */}
          <div className="w-full mt-3 space-y-2">
            <div className="h-2 rounded-full bg-muted w-full" />
            <div className="h-2 rounded-full bg-muted w-3/4" />
            <div className="h-2 rounded-full bg-muted w-5/6" />
          </div>

          {/* Connect button */}
          <div className="mt-auto w-full">
            <div className="w-full py-2 rounded-full bg-primary text-center">
              <span className="text-[10px] font-semibold text-primary-foreground">Connect</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
