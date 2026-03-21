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
    name: { ar: "فاطمة حسين", en: "Fatima Hussein", ru: "Фатима Хусейн" },
    text: {
      ar: "الوجبات طازجة دائماً والمكوّنات عالية الجودة. أنصح الجميع بتجربتهم!",
      en: "The meals are always fresh and the ingredients are top quality. I highly recommend them to everyone!",
      ru: "Блюда всегда свежие, а ингредиенты высочайшего качества. Рекомендую всем!",
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
    name: { ar: "مريم عبدالله", en: "Mariam Abdullah", ru: "Мариам Абдулла" },
    text: {
      ar: "نظافة المطبخ والتغليف تدلّ على احترافية عالية. أكل صحّي ولذيذ بنفس الوقت.",
      en: "The kitchen cleanliness and packaging reflect high professionalism. Healthy and delicious at the same time.",
      ru: "Чистота кухни и упаковка говорят о высоком профессионализме. Полезно и вкусно одновременно.",
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
