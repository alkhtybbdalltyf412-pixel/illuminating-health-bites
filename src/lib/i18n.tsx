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
  riceChicken: { ar: "رز مع دجاج صويا", en: "Rice with Soy Chicken", ru: "Рис с соевой курицей" },
  riceChickenDesc: {
    ar: "أرز مطهوّ على البخار مع دجاج صويا لذيذ",
    en: "Steamed rice with delicious soy-marinated chicken",
    ru: "Рис на пару с вкусной курицей в соевом соусе",
  },
  grilledWings: { ar: "أجنحة مشوية", en: "Grilled Chicken Wings", ru: "Куриные крылышки на гриле" },
  grilledWingsDesc: {
    ar: "أجنحة دجاج مشوية ومتبّلة بتوابل خاصّة",
    en: "Grilled chicken wings seasoned with special spices",
    ru: "Куриные крылышки на гриле с особыми специями",
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
  rasAlAbd: { ar: "راس العبد", en: "Ras Al-Abd", ru: "Рас аль-Абд" },
  rasAlAbdDesc: {
    ar: "حلوى المارشميلو المغلّفة بالشوكولاتة على قاعدة بسكويت",
    en: "Chocolate-coated marshmallow on a biscuit base",
    ru: "Маршмеллоу в шоколаде на бисквитной основе",
  },
  nutDisc: { ar: "قرص المكسّرات", en: "Nut Disc", ru: "Ореховый диск" },
  nutDiscDesc: {
    ar: "قرص مخبوز مع تشكيلة من أجود المكسّرات",
    en: "Baked disc topped with the finest mixed nuts",
    ru: "Запечённый диск с лучшими орехами",
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
