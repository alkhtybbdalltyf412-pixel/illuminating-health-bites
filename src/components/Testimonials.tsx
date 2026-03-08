import { useI18n } from "@/lib/i18n";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: { ar: "أحمد الكريم", en: "Ahmed Al-Kareem", ru: "Ахмед Аль-Карим" },
    text: {
      ar: "أفضل أكل صحي جربته! النظافة ممتازة والطعم لا يُوصف. دائماً أطلب منهم.",
      en: "Best healthy food I've ever tried! Excellent hygiene and indescribable taste.",
      ru: "Лучшая здоровая еда, которую я пробовал! Отличная гигиена и невероятный вкус.",
    },
    rating: 5,
  },
  {
    name: { ar: "فاطمة حسين", en: "Fatima Hussein", ru: "Фатима Хусейн" },
    text: {
      ar: "الوجبات طازجة دائماً والمكونات عالية الجودة. أنصح الجميع بتجربتهم!",
      en: "Meals are always fresh with high quality ingredients. Highly recommend!",
      ru: "Блюда всегда свежие, ингредиенты высочайшего качества. Рекомендую всем!",
    },
    rating: 5,
  },
  {
    name: { ar: "علي محمد", en: "Ali Mohammed", ru: "Али Мохаммед" },
    text: {
      ar: "التمر المحشي خرافي! والشوكولا الصحية إدمان. شكراً السم المنير على هالجودة.",
      en: "The stuffed dates are amazing! And the healthy chocolate is addictive.",
      ru: "Финики с начинкой — просто фантастика! А полезный шоколад — это зависимость.",
    },
    rating: 5,
  },
  {
    name: { ar: "مريم عبدالله", en: "Mariam Abdullah", ru: "Мариам Абдулла" },
    text: {
      ar: "نظافة المطبخ والتغليف تدل على احترافية عالية. أكل صحي ولذيذ بنفس الوقت.",
      en: "Kitchen cleanliness and packaging show high professionalism. Healthy and delicious!",
      ru: "Чистота кухни и упаковки говорят о высоком профессионализме. Здорово и вкусно!",
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
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
        {sectionTitle[lang]}
      </h2>
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
