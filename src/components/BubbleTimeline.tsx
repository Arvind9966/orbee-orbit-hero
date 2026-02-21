import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    icon: "💬",
    title: "Start a Bubble",
    description:
      "Drop a topic, question, or vibe into your campus feed. Your Bubble floats out to nearby students.",
  },
  {
    icon: "🫧",
    title: "It Floats Nearby",
    description:
      "Your Bubble drifts to students within your orbit — same building, same class, same energy.",
  },
  {
    icon: "🤝",
    title: "Someone Pops In",
    description:
      "When someone taps your Bubble, a real-time conversation begins. No followers, no pressure.",
  },
  {
    icon: "✨",
    title: "Connections Form",
    description:
      "Great conversations become lasting connections. Your orbit grows naturally, one Bubble at a time.",
  },
];

const TimelineStep = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Alternate sides for visual interest
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-4 sm:gap-6">
      {/* Timeline line + bubble dot */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Connector line above */}
        {index > 0 && (
          <motion.div
            style={{ opacity }}
            className="w-px h-8 bg-gradient-to-b from-border to-accent/40"
          />
        )}
        {/* Floating bubble dot */}
        <motion.div
          style={{ scale, opacity }}
          className="relative z-10 w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-xl shadow-[0_0_20px_hsl(var(--accent)/0.2)]"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        >
          {step.icon}
        </motion.div>
        {/* Connector line below */}
        {index < steps.length - 1 && (
          <motion.div
            style={{ opacity }}
            className="w-px h-8 bg-gradient-to-b from-accent/40 to-border"
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        style={{ opacity, y, scale }}
        className={`flex-1 pb-6 ${isLeft ? "" : ""}`}
      >
        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
          <p className="text-sm font-bold text-foreground">{step.title}</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const BubbleTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={containerRef} className="relative w-full px-6 py-20 sm:py-28">
      {/* Decorative floating bubbles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/5 border border-accent/10"
            style={{
              width: 20 + i * 12,
              height: 20 + i * 12,
              left: `${15 + i * 14}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <motion.div
        style={{ opacity: headingOpacity, y: headingY }}
        className="text-center mb-14 max-w-sm mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          The{" "}
          <span className="bg-gradient-to-r from-accent to-[hsl(35,80%,65%)] bg-clip-text text-transparent">
            Bubble
          </span>{" "}
          Concept
        </h2>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          Forget followers and feeds. Orbee connects you through floating
          Bubbles — spontaneous, real, and local.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-md mx-auto flex flex-col">
        {steps.map((step, i) => (
          <TimelineStep key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  );
};

export default BubbleTimeline;
