import { useI18n } from "@/lib/i18n";
import { Heart, Send, Megaphone } from "lucide-react";

const TELEGRAM_ORDER = "https://t.me/ALKHATIB543";
const TELEGRAM_CHANNEL = "https://t.me/Illuminatingpoison";

const Footer = () => {
  const { lang } = useI18n();

  const content = {
    tagline: {
      ar: "طعام صحّي بنكهة لا تُنسى 🍽️",
      en: "Healthy food with unforgettable flavor 🍽️",
      ru: "Здоровая еда с незабываемым вкусом 🍽️",
    },
    madeWith: {
      ar: "صُنع بـ",
      en: "Made with",
      ru: "Сделано с",
    },
    rights: {
      ar: "© 2026 السمّ المنير — جميع الحقوق محفوظة",
      en: "© 2026 The Illuminating Poison — All rights reserved",
      ru: "© 2026 Сияющий Яд — Все права защищены",
    },
  };

  return (
    <footer className="bg-foreground text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {lang === "ar" ? "السمّ المنير" : lang === "ru" ? "Сияющий Яд" : "The Illuminating Poison"}
            </h3>
            <p className="text-primary-foreground/70 text-sm">
              {content.tagline[lang]}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={TELEGRAM_ORDER}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm font-medium"
            >
              <Send className="w-4 h-4" />
              @ALKHATIB543
            </a>
            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm font-medium"
            >
              <Megaphone className="w-4 h-4" />
              {lang === "ar" ? "القناة" : lang === "ru" ? "Канал" : "Channel"}
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-primary-foreground/15" />

          {/* Copyright */}
          <div className="flex flex-col items-center gap-1 text-xs text-primary-foreground/50">
            <p className="flex items-center gap-1">
              {content.madeWith[lang]} <Heart className="w-3 h-3 fill-red-400 text-red-400" /> 
            </p>
            <p>{content.rights[lang]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
