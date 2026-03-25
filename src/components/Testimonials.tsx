import { useI18n } from "@/lib/i18n";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: { ar: "أحمد الكريم", en: "Ahmed Al-Kareem", ru: "Ахмед Аль-Карим" },
    text: {
      ar: "أفضل أكل صحّي جرّبته! النظافة ممتازة والطعم لا يُوصف. دائماً أطلب منهم.",
      en: "The best healthy food I've ever tried! Excellent hygiene and an incredible taste. I always order from them.",
      ru: "Лучшая здоровая еда, которую я пробовал! Безупречная чистота и потрясающий вкус. Всегда заказываю у них.",
    },
    rating: 5,
  },
  {
    name: { ar: "بشر زغنون", en: "Bishr Zaghnoun", ru: "Бишр Загнун" },
    text: {
      ar: "طعام لذيذ وخصوصاً صحّي، أنصح الجميع بتجربته!",
      en: "Delicious food and especially healthy, I recommend everyone to try it!",
      ru: "Вкусная и особенно полезная еда, рекомендую всем попробовать!",
    },
    rating: 5,
  },
  {
    name: { ar: "علي محمد", en: "Ali Mohammed", ru: "Али Мохаммед" },
    text: {
      ar: "التمر المحشي خرافي! والشوكولاتة الصحّية إدمان. شكراً السمّ المنير على هالجودة.",
      en: "The stuffed dates are incredible! And the healthy chocolate is addictive. Thank you for this quality.",
      ru: "Финики с начинкой — невероятные! А полезный шоколад вызывает зависимость. Спасибо за такое качество.",
    },
    rating: 5,
  },
  {
    name: { ar: "حسان الزعبي", en: "Hassan Al-Zoubi", ru: "Хассан Аз-Зуби" },
    text: {
      ar: "جودة عالية ونكهة مميّزة، من أفضل الأكل الصحّي اللي جرّبته. ما رح تندم!",
      en: "High quality and distinctive flavor, one of the best healthy food I've tried. You won't regret it!",
      ru: "Высокое качество и особенный вкус, одна из лучших здоровых блюд, что я пробовал. Не пожалеете!",
    },
    rating: 5,
  },
];

const Testimonials = () => {
  const { t, lang } = useI18n();

  const sectionTitle: Record<string, string> = {
    ar: "آراء العملاء",
    en: "Customer Reviews",
    ru: "Отзывы клиентов",
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
        {sectionTitle[lang]}
      </h2>
      <div className="section-divider" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-card rounded-xl p-6 card-elevated flex flex-col"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-secondary text-secondary"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
              "{item.text[lang]}"
            </p>
            <p className="font-bold text-foreground text-sm">
              — {item.name[lang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
