import { motion } from "framer-motion";

const PhoneMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="relative z-20 w-60 sm:w-72 md:w-80 mx-auto"
    >
      {/* Phone frame — realistic with silver bezel */}
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
        <div className="h-full pt-12 px-5 pb-5 flex flex-col items-center gap-3 bg-card">
          {/* Profile picture */}
          <div className="w-20 h-20 rounded-2xl bg-orbee-lavender overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center">
            <p className="text-base font-bold text-foreground">Alex Rivera</p>
            <p className="text-xs text-muted-foreground mt-0.5">CS Major • Sophomore</p>
          </div>

          {/* Dots + icon row */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-foreground' : 'bg-muted'}`} />
              ))}
            </div>
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </div>
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-foreground' : 'bg-muted'}`} />
              ))}
            </div>
          </div>

          {/* About me section */}
          <div className="w-full mt-3 text-left">
            <p className="text-sm font-bold text-foreground">About me</p>
            <div className="mt-2 h-px bg-border w-full" />
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              My downtime includes exploring new coffee spots, hitting the basketball court, and experimenting with creative coding projects.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
