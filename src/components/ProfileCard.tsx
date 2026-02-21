import { motion } from "framer-motion";

interface ProfileCardProps {
  name: string;
  interest: string;
  image: string;
  index: number;
  isCenter?: boolean;
}

const ProfileCard = ({ name, interest, image, index, isCenter = false }: ProfileCardProps) => {
  const isOuter = !isCenter && (index === 0 || index >= 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.8 + index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`
        rounded-2xl bg-card shadow-lg overflow-hidden
        ${isCenter ? "w-28 h-36 sm:w-36 sm:h-44 z-10" : "w-24 h-32 sm:w-28 sm:h-36"}
        ${isOuter ? "blur-[1px] opacity-80" : ""}
      `}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.5 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2 + index * 0.2,
        }}
        className="h-full flex flex-col"
      >
        <div className="flex-1 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 text-center">
          <p className="text-xs font-medium text-foreground truncate">{name}</p>
          <span className="text-[10px] text-muted-foreground">{interest}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
