import { useI18n } from "@/lib/i18n";
import { Heart, Leaf, ChefHat } from "lucide-react";

const AboutSection = () => {
  const { t } = useI18n();

  const features = [
    { icon: Leaf, titleKey: "aboutFeature1Title" as const, descKey: "aboutFeature1Desc" as const },
    { icon: ChefHat, titleKey: "aboutFeature2Title" as const, descKey: "aboutFeature2Desc" as const },
    { icon: Heart, titleKey: "aboutFeature3Title" as const, descKey: "aboutFeature3Desc" as const },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
        {t("aboutTitle" as any)}
      </h2>
      <div className="section-divider" />
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
        {t("aboutDescription" as any)}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-card rounded-xl p-6 text-center card-elevated"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {t(f.titleKey as any)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(f.descKey as any)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
