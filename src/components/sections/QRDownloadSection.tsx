import { motion } from "framer-motion";
import { AppleIcon, GooglePlayIcon } from "@/components/icons/StoreIcons";

const QR_CODES = [
  {
    label: "App Store",
    icon: AppleIcon,
    url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://apps.apple.com/app/orbee",
    alt: "iOS QR Code",
  },
  {
    label: "Google Play",
    icon: GooglePlayIcon,
    url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://play.google.com/store/apps/details?id=com.orbee",
    alt: "Android QR Code",
  },
];

const QRDownloadSection = () => (
  <section className="relative w-full py-10 px-6 sm:px-12 md:px-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative z-10 flex flex-col items-center text-center max-w-3xl"
    >
      <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Download Now</span>
      <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-foreground leading-tight">
        Scan to <span className="text-[#FF9A1F]">Download</span>
      </h2>
      <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-md">
        Point your camera at the QR code to get Orbee on your device.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        {QR_CODES.map(({ label, icon: Icon, url, alt }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white p-3 shadow-lg">
              <img src={url} alt={alt} className="w-full h-full" />
            </div>
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <Icon />
              {label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default QRDownloadSection;
