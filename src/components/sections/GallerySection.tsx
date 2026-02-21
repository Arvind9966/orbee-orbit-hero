import CircularGallery from "@/components/CircularGallery";
import ScrambledText from "@/components/ScrambledText";

const GALLERY_ITEMS = [
  { image: "/images/dining-bubbles.jpg", text: "Dining Bubbles" },
  { image: "/images/hobby-bubbles.jpg", text: "Hobby Bubbles" },
  { image: "/images/travel-bubbles.jpg", text: "Travel Bubbles" },
  { image: "/images/interest-bubbles.jpg", text: "Interest Bubbles" },
  { image: "/images/party-bubbles.jpg", text: "Party Bubbles" },
  { image: "/images/chill-bubbles.jpg", text: "Chill Bubbles" },
];

const GallerySection = () => (
  <section className="relative w-full flex items-center px-4 sm:px-12 md:px-20 py-10">
    <div className="flex flex-col md:flex-row items-center md:items-stretch w-full md:h-[60vh] gap-6 md:gap-0">
      {/* Gallery Card */}
      <div className="relative z-20 w-full md:w-[40%] h-[40vh] md:h-full rounded-3xl overflow-hidden border border-border/30 bg-muted/10 shrink-0 [filter:grayscale(100%)]">
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={3}
          textColor="#000000"
          font="bold 24px 'Google Sans Flex', sans-serif"
          borderRadius={0.05}
          scrollSpeed={2}
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-[60%] flex flex-col justify-center gap-4 sm:gap-6 px-2 sm:px-6 md:px-16 py-6 md:py-0">
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground leading-tight">
          Create Your <span className="text-[#FF9A1F]">Bubble</span>
        </h2>
        <ScrambledText
          radius={80}
          duration={2}
          speed={0.3}
          scrambleChars="·•"
          className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Build your own circle of campus connections. From dining partners to travel buddies, hobby groups to party
          squads — find your people and create moments that matter.
        </ScrambledText>
      </div>
    </div>
  </section>
);

export default GallerySection;
