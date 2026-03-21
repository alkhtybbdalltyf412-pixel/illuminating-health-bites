import React, { createContext, useContext, useState, useCallback } from "react";

export type Lang = "ar" | "en" | "ru";

const translations = {
  storeName: { ar: "السمّ المنير", en: "The Illuminating Poison", ru: "Сияющий Яд" },
  heroSubtitle: {
    ar: "طعام صحّي بنكهة لا تُنسى",
    en: "Healthy food with an unforgettable flavor",
    ru: "Здоровая еда с незабываемым вкусом",
  },
  mealsSection: { ar: "الوجبات الرئيسية", en: "Main Meals", ru: "Основные блюда" },
  snacksSection: { ar: "السناكات والحلويات الصحّية", en: "Healthy Snacks", ru: "Полезные закуски" },
  cocktailsSection: { ar: "الكوكتيلات", en: "Cocktails", ru: "Коктейли" },
  juicesSection: { ar: "العصائر الطبيعية", en: "Fresh Drinks", ru: "Натуральные соки" },
  bakerySection: { ar: "المخبوزات الصحّية", en: "Healthy Bakery", ru: "Полезная выпечка" },

  grilledWings: { ar: "أجنحة المنير المشوية", en: "Grilled Chicken Wings", ru: "Куриные крылышки на гриле" },
  grilledWingsDesc: {
    ar: "وجبة 250 غرام — أجنحة دجاج مشوية ومتبّلة بتوابل خاصّة",
    en: "250g portion — Grilled chicken wings seasoned with special spices",
    ru: "Порция 250 г — Куриные крылышки на гриле с особыми специями",
  },
  fajita: { ar: "فاهيتا الدجاج المنيرة", en: "Chicken Fajita", ru: "Фахитас с курицей" },
  fajitaDesc: {
    ar: "وجبة 200 غرام — فاهيتا دجاج مع خضروات مشوية طازجة",
    en: "200g portion — Chicken fajita with fresh grilled vegetables",
    ru: "Порция 200 г — Фахитас с курицей и свежими овощами на гриле",
  },
  shawarma: { ar: "شاورما المنير السوريّة", en: "Syrian Shawarma", ru: "Сирийская шаурма" },
  shawarmaDesc: {
    ar: "لفّة واحدة — شاورما دجاج سوريّة أصيلة مع مخلّلات وصوص ثوم",
    en: "1 roll — Authentic Syrian chicken shawarma with pickles and garlic sauce",
    ru: "1 ролл — Настоящая сирийская шаурма с курицей, соленьями и чесночным соусом",
  },

  dateBalls: { ar: "كرات تمر المنير", en: "Date Balls", ru: "Финиковые шарики" },
  dateBallsDesc: {
    ar: "علبة 200 غرام — بالجوز والسمسم",
    en: "200g box — with walnuts and sesame",
    ru: "Коробка 200 г — с грецкими орехами и кунжутом",
  },
  stuffedDates: { ar: "تمر محشي ملكي", en: "Royal Stuffed Dates", ru: "Королевские финики с начинкой" },
  stuffedDatesDesc: {
    ar: "علبة 200 غرام — بالمكسّرات والشوكولاتة",
    en: "200g box — with nuts and chocolate",
    ru: "Коробка 200 г — с орехами и шоколадом",
  },
  nutBars: { ar: "بارات مكسّرات المنير", en: "Nut Bars", ru: "Ореховые батончики" },
  nutBarsDesc: {
    ar: "علبة 200 غرام — مكسّرات مشكّلة وعسل",
    en: "200g box — mixed nuts and honey",
    ru: "Коробка 200 г — ассорти орехов с мёдом",
  },

  bananaCocktail: { ar: "كوكتيل موز المنير", en: "Banana Cocktail", ru: "Банановый коктейль" },
  bananaCocktailDesc: {
    ar: "250 مل — بالحليب والعسل",
    en: "250ml — with milk and honey",
    ru: "250 мл — с молоком и мёдом",
  },
  avocadoCocktail: { ar: "عصير أفوكادو المنير الملكي", en: "Royal Avocado Juice", ru: "Королевский сок авокадо" },
  avocadoCocktailDesc: {
    ar: "250 مل — مع مكسّرات وتمر",
    en: "250ml — with nuts and dates",
    ru: "250 мл — с орехами и финиками",
  },

  orangeJuice: { ar: "عصير برتقال طبيعي", en: "Fresh Orange Juice", ru: "Свежевыжатый апельсиновый сок" },
  orangeJuiceDesc: {
    ar: "250 مل — فريش طبيعي 100%",
    en: "250ml — 100% natural fresh",
    ru: "250 мл — 100% натуральный фреш",
  },
  carrotJuice: { ar: "عصير الجزر المنير", en: "Carrot Juice", ru: "Морковный сок" },
  carrotJuiceDesc: {
    ar: "250 مل — طبيعي 100%",
    en: "250ml — 100% natural",
    ru: "250 мл — 100% натуральный",
  },

  riceChicken: { ar: "صدر دجاج المنير مع الرز", en: "Chicken Breast & Rice", ru: "Куриная грудка с рисом" },
  riceChickenDesc: {
    ar: "وجبة — صدر دجاج مقلي بكمية قليلة من زيت الزيتون مع رز بسمتي نثري",
    en: "Chicken breast lightly fried in olive oil with fluffy basmati rice",
    ru: "Куриная грудка, слегка обжаренная в оливковом масле, с рассыпчатым рисом басмати",
  },
  healthyBread: { ar: "خبز المنير الصحّي", en: "Healthy Bread", ru: "Полезный хлеб" },
  healthyBreadDesc: {
    ar: "ربطة 250 غرام — قمح كامل",
    en: "250g loaf — whole wheat",
    ru: "Буханка 250 г — цельнозерновой",
  },

  addToOrder: { ar: "أضف للطلب", en: "Add to Order", ru: "Добавить в заказ" },
  removeFromOrder: { ar: "إزالة", en: "Remove", ru: "Удалить" },
  myOrder: { ar: "طلبي", en: "My Order", ru: "Мой заказ" },
  orderVia: { ar: "اطلب عبر تلغرام", en: "Order via Telegram", ru: "Заказать через Telegram" },
  emptyCart: { ar: "السلّة فارغة", en: "Your cart is empty", ru: "Корзина пуста" },
  total: { ar: "المجموع", en: "Total", ru: "Итого" },
  currency: { ar: "₽", en: "₽", ru: "₽" },
  orderOnTelegram: { ar: "أكمل الطلب عبر تلغرام", en: "Complete order on Telegram", ru: "Завершить заказ в Telegram" },
  items: { ar: "عنصر", en: "items", ru: "шт." },
  reviewSection: { ar: "قيّمنا", en: "Rate Us", ru: "Оцените нас" },
  yourName: { ar: "اسمك", en: "Your Name", ru: "Ваше имя" },
  yourReview: { ar: "اكتب تقييمك هنا...", en: "Write your review here...", ru: "Напишите отзыв..." },
  sendReview: { ar: "إرسال التقييم", en: "Send Review", ru: "Отправить отзыв" },
  reviewSent: { ar: "تم نسخ التقييم! الصقه في المحادثة 📋", en: "Review copied! Paste it in the chat 📋", ru: "Отзыв скопирован! Вставьте в чат 📋" },
  ratingRequired: { ar: "يرجى اختيار التقييم", en: "Please select a rating", ru: "Пожалуйста, выберите оценку" },
  advanceOrder: {
    ar: "⏰ جميع الطلبات تتطلّب حجزاً مسبقاً قبل 24 ساعة",
    en: "⏰ All orders require 24-hour advance booking",
    ru: "⏰ Все заказы требуют бронирования за 24 часа",
  },
  deliveryNote: {
    ar: "🚚 التوصيل متاح للمترو (للكميات الكبيرة فقط) — 80 روبل إضافية",
    en: "🚚 Metro delivery available (large orders only) — 80₽ extra",
    ru: "🚚 Доставка до метро (только большие заказы) — 80₽ дополнительно",
  },
  contactUs: {
    ar: "📱 للطلب والتواصل",
    en: "📱 Order & Contact",
    ru: "📱 Заказ и контакт",
  },
  visitChannel: {
    ar: "📢 زيارة القناة",
    en: "📢 Visit Channel",
    ru: "📢 Посетить канал",
  },
  comingSoon: {
    ar: "سيكون متاح قريباً 🔜",
    en: "Coming Soon 🔜",
    ru: "Скоро в наличии 🔜",
  },

  // About Section
  aboutTitle: { ar: "من نحن", en: "About Us", ru: "О нас" },
  aboutDescription: {
    ar: "طالب سوري في السكن الجامعي، أقدّم وجبات صحية ولذيذة لكل من يهتم بجسده وصحّته.",
    en: "A Syrian student living in a university dorm, preparing healthy and delicious meals for anyone who cares about their body and health.",
    ru: "Сирийский студент в общежитии, готовлю здоровые и вкусные блюда для тех, кто заботится о своём теле и здоровье.",
  },
  aboutFeature1Title: { ar: "مكوّنات طبيعية 100%", en: "100% Natural Ingredients", ru: "100% натуральные ингредиенты" },
  aboutFeature1Desc: {
    ar: "لا نستخدم أي مواد حافظة أو ألوان صناعية — كل شيء طازج وطبيعي",
    en: "No preservatives or artificial colors — everything is fresh and natural",
    ru: "Без консервантов и красителей — всё свежее и натуральное",
  },
  aboutFeature2Title: { ar: "وصفات صحية بنكهة سورية", en: "Healthy Recipes, Syrian Flavor", ru: "Здоровые рецепты с сирийским вкусом" },
  aboutFeature2Desc: {
    ar: "وصفات صحية بنكهة سورية أصيلة",
    en: "Healthy recipes with authentic Syrian flavor",
    ru: "Здоровые рецепты с настоящим сирийским вкусом",
  },
  aboutFeature3Title: { ar: "صحّة بلا تنازل", en: "Health Without Compromise", ru: "Здоровье без компромиссов" },
  aboutFeature3Desc: {
    ar: "نطبخ بزيت الزيتون ونختار أفضل المكوّنات لصحّتك",
    en: "We cook with olive oil and choose the best ingredients for your health",
    ru: "Готовим на оливковом масле, выбирая лучшие ингредиенты для вашего здоровья",
  },

  // Offers Section
  offersTitle: { ar: "عروض خاصّة 🔥", en: "Special Offers 🔥", ru: "Специальные предложения 🔥" },
  offer1Title: { ar: "وجبة ثنائية", en: "Duo Meal Deal", ru: "Комбо на двоих" },
  offer1Desc: {
    ar: "أجنحة مشوية + صدر دجاج مع الرز",
    en: "Grilled Wings + Chicken Breast with Rice",
    ru: "Крылышки на гриле + Куриная грудка с рисом",
  },
  offer1Ends: { ar: "ينتهي العرض: 30 أبريل 2026", en: "Offer ends: April 30, 2026", ru: "Предложение до: 30 апреля 2026" },
  offer2Title: { ar: "باقة السناك الصحّي", en: "Healthy Snack Bundle", ru: "Набор полезных закусок" },
  offer2Desc: {
    ar: "كرات تمر + بارات مكسّرات",
    en: "Date Balls + Nut Bars",
    ru: "Финиковые шарики + Ореховые батончики",
  },
  offer2Ends: { ar: "ينتهي العرض: 30 أبريل 2026", en: "Offer ends: April 30, 2026", ru: "Предложение до: 30 апреля 2026" },

  // Nutrition labels
  calories: { ar: "سعرة", en: "cal", ru: "ккал" },
  protein: { ar: "بروتين", en: "protein", ru: "белок" },
  carbs: { ar: "كربو", en: "carbs", ru: "углев." },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("ar");
  const t = useCallback((key: TranslationKey) => translations[key]?.[lang] || key, [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir}>{children}</div>
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
