import { useI18n } from "@/lib/i18n";
import { Clock, Truck, MessageCircle, Megaphone } from "lucide-react";

const TELEGRAM_ORDER = "https://t.me/ALKHATIB543";
const TELEGRAM_CHANNEL = "https://t.me/Illuminatingpoison";

const InfoSection = () => {
  const { t } = useI18n();

  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="max-w-2xl mx-auto space-y-3">
        <div className="flex items-center gap-3 bg-card rounded-xl p-4 card-elevated">
          <Clock className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm font-medium text-foreground">{t("advanceOrder")}</p>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-xl p-4 card-elevated">
          <Truck className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm font-medium text-foreground">{t("deliveryNote")}</p>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-xl p-4 card-elevated">
          <MessageCircle className="w-5 h-5 text-primary shrink-0" />
          <a href={TELEGRAM_ORDER} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
            {t("contactUs")} — @ALKHATIB543
          </a>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-xl p-4 card-elevated">
          <Megaphone className="w-5 h-5 text-primary shrink-0" />
          <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
            {t("visitChannel")} — @Illuminatingpoison
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
