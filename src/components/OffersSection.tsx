import { useI18n } from "@/lib/i18n";
import { Flame, Clock } from "lucide-react";

interface Offer {
  titleKey: string;
  descKey: string;
  oldPrice: number;
  newPrice: number;
  endsKey: string;
}

const offers: Offer[] = [
  {
    titleKey: "offer1Title",
    descKey: "offer1Desc",
    oldPrice: 400,
    newPrice: 320,
    endsKey: "offer1Ends",
  },
  {
    titleKey: "offer2Title",
    descKey: "offer2Desc",
    oldPrice: 500,
    newPrice: 400,
    endsKey: "offer2Ends",
  },
];

const OffersSection = () => {
  const { t } = useI18n();

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Flame className="w-7 h-7 text-destructive" />
        <h2 className="text-3xl font-bold text-foreground">
          {t("offersTitle" as any)}
        </h2>
        <Flame className="w-7 h-7 text-destructive" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {offers.map((offer, i) => (
          <div
            key={i}
            className="relative bg-card rounded-xl overflow-hidden card-elevated border-2 border-secondary/30"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t(offer.titleKey as any)}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t(offer.descKey as any)}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-muted-foreground line-through text-lg">
                  {offer.oldPrice}₽
                </span>
                <span className="text-2xl font-extrabold text-primary">
                  {offer.newPrice}₽
                </span>
                <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                  -{Math.round(((offer.oldPrice - offer.newPrice) / offer.oldPrice) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {t(offer.endsKey as any)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffersSection;
