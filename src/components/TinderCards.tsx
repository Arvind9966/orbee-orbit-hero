import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";

const people = [
  {
    name: "Ava",
    age: 21,
    bio: "Art major who believes every sunset deserves a canvas 🎨",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=560&fit=crop&crop=face",
  },
  {
    name: "Marcus",
    age: 23,
    bio: "Coffee snob & part-time philosopher ☕",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop&crop=face",
  },
  {
    name: "Luna",
    age: 20,
    bio: "Dancing through life one playlist at a time 💃",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=560&fit=crop&crop=face",
  },
  {
    name: "Jay",
    age: 22,
    bio: "Startup kid by day, guitarist by night 🎸",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=560&fit=crop&crop=face",
  },
  {
    name: "Sophie",
    age: 21,
    bio: "Book nerd with a weakness for tacos 📚🌮",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=560&fit=crop&crop=face",
  },
];

interface SwipeCardProps {
  person: (typeof people)[0];
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
}

const SwipeCard = ({ person, onSwipe, isTop }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const threshold = 120;
      if (info.offset.x > threshold) {
        animate(x, 500, { duration: 0.3 });
        setTimeout(() => onSwipe("right"), 250);
      } else if (info.offset.x < -threshold) {
        animate(x, -500, { duration: 0.3 });
        setTimeout(() => onSwipe("left"), 250);
      } else {
        animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
      }
    },
    [onSwipe, x]
  );

  return (
    <motion.div
      style={{ x, rotate, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-border/20">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Like / Nope stamps */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-8 left-6 px-4 py-2 border-4 border-green-400 rounded-xl rotate-[-12deg]"
            >
              <span className="text-green-400 font-bold text-3xl tracking-wider">LIKE</span>
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-8 right-6 px-4 py-2 border-4 border-red-400 rounded-xl rotate-[12deg]"
            >
              <span className="text-red-400 font-bold text-3xl tracking-wider">NOPE</span>
            </motion.div>
          </>
        )}

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {person.name}, {person.age}
          </h3>
          <p className="text-sm sm:text-base text-white/80 mt-1">{person.bio}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TinderCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const visibleCards = people.slice(currentIndex, currentIndex + 2);
  const allSwiped = currentIndex >= people.length;

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4]">
      {allSwiped ? (
        <div className="flex items-center justify-center h-full rounded-3xl border border-border/30 bg-muted/20">
          <div className="text-center px-6">
            <span className="text-4xl mb-3 block">✨</span>
            <p className="text-muted-foreground text-lg font-medium">You've seen everyone!</p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="mt-4 px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Over
            </button>
          </div>
        </div>
      ) : (
        visibleCards
          .map((person, i) => (
            <SwipeCard
              key={person.name + currentIndex + i}
              person={person}
              onSwipe={handleSwipe}
              isTop={i === 0}
            />
          ))
          .reverse()
      )}
    </div>
  );
};

export default TinderCards;
