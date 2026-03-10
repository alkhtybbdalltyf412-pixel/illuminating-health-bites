import React, { createContext, useContext, useState, useCallback } from "react";

export type Lang = "ar" | "en" | "ru";

const translations = {
  storeName: { ar: "السمّ المنير", en: "The Illuminating Poison", ru: "Сияющий Яд" },
  heroSubtitle: {
    ar: "طعام صحّي بنكهة لا تُنسى",
    en: "Healthy food with an unforgettable flavor",
    ru: "Здоровая еда с незабываемым вкусом",
  },
  mealsSection: { ar: "الوجبات الصحّية", en: "Healthy Meals", ru: "Полезные блюда" },
  snacksSection: { ar: "السناكات الصحّية", en: "Healthy Snacks", ru: "Полезные закуски" },
  riceChicken: { ar: "رز ودجاج", en: "Rice and Chicken", ru: "Рис с курицей" },
  riceChickenDesc: {
    ar: "أرز مطهوّ على البخار مع دجاج لذيذ",
    en: "Steamed rice with delicious chicken",
    ru: "Рис на пару с вкусной курицей",
  },
  grilledWings: { ar: "أجنحة مشوية", en: "Grilled Chicken Wings", ru: "Куриные крылышки на гриле" },
  grilledWingsDesc: {
    ar: "أجنحة دجاج مشوية ومتبّلة بتوابل خاصّة",
    en: "Grilled chicken wings seasoned with special spices",
    ru: "Куриные крылышки на гриле с особыми специями",
  },
  fajita: { ar: "فاهيتا", en: "Fajita", ru: "Фахитас" },
  fajitaDesc: {
    ar: "فاهيتا دجاج مع خضروات مشوية طازجة",
    en: "Chicken fajita with fresh grilled vegetables",
    ru: "Фахитас с курицей и свежими овощами на гриле",
  },
  dateBalls: { ar: "كرات التمر", en: "Date Balls", ru: "Финиковые шарики" },
  dateBallsDesc: {
    ar: "كرات تمر صحّية مغلّفة بالسمسم والمكسّرات",
    en: "Healthy date balls coated with sesame and nuts",
    ru: "Полезные финиковые шарики в кунжуте и орехах",
  },
  coconutBalls: { ar: "كرات جوز الهند", en: "Coconut Balls", ru: "Кокосовые шарики" },
  coconutBallsDesc: {
    ar: "كرات جوز هند ناعمة ولذيذة",
    en: "Soft and delicious coconut balls",
    ru: "Мягкие и вкусные кокосовые шарики",
  },
  stuffedDates: { ar: "تمر محشي بالمكسّرات", en: "Dates Stuffed with Nuts", ru: "Финики с орехами" },
  stuffedDatesDesc: {
    ar: "تمر فاخر محشي بأجود أنواع المكسّرات",
    en: "Premium dates stuffed with the finest nuts",
    ru: "Отборные финики с лучшими орехами",
  },
  nutBars: { ar: "بارات المكسّرات", en: "Nut Bars", ru: "Ореховые батончики" },
  nutBarsDesc: {
    ar: "بارات مكسّرات صحّية مغلّفة بجوز الهند المبشور",
    en: "Healthy nut bars coated with shredded coconut",
    ru: "Полезные ореховые батончики с кокосовой стружкой",
  },
  shawarma: { ar: "شاورما سوريّة", en: "Syrian Shawarma", ru: "Сирийская шаурма" },
  shawarmaDesc: {
    ar: "شاورما دجاج سوريّة أصيلة مع مخلّلات وصوص ثوم",
    en: "Authentic Syrian chicken shawarma with pickles and garlic sauce",
    ru: "Настоящая сирийская шаурма с курицей, соленьями и чесночным соусом",
  },
  cocktailsSection: { ar: "الكوكتيلات", en: "Cocktails", ru: "Коктейли" },
  bananaCocktail: { ar: "كوكتيل الموز", en: "Banana Cocktail", ru: "Банановый коктейль" },
  bananaCocktailDesc: {
    ar: "كوكتيل موز كريمي طازج ولذيذ",
    en: "Fresh and delicious creamy banana cocktail",
    ru: "Свежий и вкусный банановый коктейль",
  },
  avocadoCocktail: { ar: "كوكتيل الأفوكادو بالمكسّرات", en: "Avocado & Nuts Cocktail", ru: "Коктейль из авокадо с орехами" },
  avocadoCocktailDesc: {
    ar: "كوكتيل أفوكادو كريمي مع مكسّرات مقرمشة",
    en: "Creamy avocado cocktail topped with crunchy nuts",
    ru: "Кремовый коктейль из авокадо с хрустящими орехами",
  },
  juicesSection: { ar: "العصائر الصحّية", en: "Healthy Juices", ru: "Полезные соки" },
  orangeJuice: { ar: "عصير البرتقال الصحّي", en: "Healthy Orange Juice", ru: "Полезный апельсиновый сок" },
  orangeJuiceDesc: {
    ar: "عصير برتقال طبيعي طازج بدون سكّر مُضاف",
    en: "Fresh natural orange juice with no added sugar",
    ru: "Свежевыжатый апельсиновый сок без сахара",
  },
  carrotLemonJuice: { ar: "عصير الجزر والليمون", en: "Carrot & Lemon Juice", ru: "Морковно-лимонный сок" },
  carrotLemonJuiceDesc: {
    ar: "عصير جزر طازج مع لمسة ليمون منعشة",
    en: "Fresh carrot juice with a refreshing lemon twist",
    ru: "Свежий морковный сок с освежающим лимоном",
  },
  addToOrder: { ar: "أضف للطلب", en: "Add to Order", ru: "Добавить в заказ" },
  removeFromOrder: { ar: "إزالة", en: "Remove", ru: "Удалить" },
  myOrder: { ar: "طلبي", en: "My Order", ru: "Мой заказ" },
  orderVia: { ar: "اطلب عبر تلغرام", en: "Order via Telegram", ru: "Заказать через Telegram" },
  emptyCart: { ar: "السلّة فارغة", en: "Your cart is empty", ru: "Корзина пуста" },
  total: { ar: "المجموع", en: "Total", ru: "Итого" },
  currency: { ar: "د.ع", en: "IQD", ru: "IQD" },
  orderOnTelegram: { ar: "أكمل الطلب عبر تلغرام", en: "Complete order on Telegram", ru: "Завершить заказ в Telegram" },
  items: { ar: "عنصر", en: "items", ru: "шт." },
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
