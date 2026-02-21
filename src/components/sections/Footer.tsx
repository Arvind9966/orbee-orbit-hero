import { SocialIcons } from "@/components/icons/StoreIcons";
import orbeeLogoWhite from "@/assets/orbee-logo-white.png";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: ["Features", "Safety", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

const SOCIAL_LINKS = [
  { label: "TikTok", Icon: SocialIcons.TikTok },
  { label: "Instagram", Icon: SocialIcons.Instagram },
  { label: "LinkedIn", Icon: SocialIcons.LinkedIn },
  { label: "Twitter", Icon: SocialIcons.Twitter },
];

const Footer = () => (
  <footer className="w-full bg-[#000000] text-white/80">
    <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-10 sm:py-14">
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="w-24 h-10 rounded-[20%] overflow-hidden">
            <img src={orbeeLogoWhite} alt="Orbee" className="w-full h-full object-contain invert" />
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            The lighter side of social. Real-time connections, zero gravity.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                className="text-white/50 hover:text-white transition-colors"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-10 sm:gap-16">
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">{title}</span>
              {links.map((link) => (
                <a key={link} href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 pt-6 border-t border-white/10 flex items-center justify-center">
        <p className="text-xs text-white/30">© Copyright Orbee 2026</p>
      </div>
    </div>
  </footer>
);

export default Footer;
