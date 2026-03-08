import { useI18n, Lang } from "@/lib/i18n";
import { ShoppingCart } from "lucide-react";

const langLabels: Record<Lang, string> = { ar: "عربي", en: "EN", ru: "RU" };

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">{t("storeName")}</h1>

        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-full p-1 gap-0.5">
            {(Object.keys(langLabels) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-sm rounded-full font-medium transition-all ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>

          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
