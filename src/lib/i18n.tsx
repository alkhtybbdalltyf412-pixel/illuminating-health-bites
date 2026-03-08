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
  grilledChicken: { ar: "دجاج مشوي على الفرن", en: "Oven-Roasted Chicken", ru: "Курица, запечённая в духовке" },
  grilledChickenDesc: {
    ar: "دجاج مشوي طري ومتبّل بتوابل خاصّة",
    en: "Tender roasted chicken seasoned with special spices",
    ru: "Нежная запечённая курица с особыми специями",
  },
  riceChicken: { ar: "رز مع دجاج صويا", en: "Rice with Soy Chicken", ru: "Рис с соевой курицей" },
  riceChickenDesc: {
    ar: "أرز مطهوّ على البخار مع دجاج صويا لذيذ",
    en: "Steamed rice with delicious soy-marinated chicken",
    ru: "Рис на пару с вкусной курицей в соевом соусе",
  },
  fajita: { ar: "فاهيتا", en: "Fajita", ru: "Фахитас" },
  fajitaDesc: {
    ar: "فاهيتا دجاج مع خضروات مشوية طازجة",
    en: "Chicken fajita with fresh grilled vegetables",
    ru: "Фахитас с курицей и свежими овощами на гриле",
  },
  stuffedDates: { ar: "تمر محشي بالمكسّرات", en: "Dates Stuffed with Nuts", ru: "Финики с орехами" },
  stuffedDatesDesc: {
    ar: "تمر فاخر محشي بأجود أنواع المكسّرات",
    en: "Premium dates stuffed with the finest nuts",
    ru: "Отборные финики с лучшими орехами",
  },
  mixedNuts: { ar: "مكسّرات صحّية", en: "Healthy Mixed Nuts", ru: "Полезный микс орехов" },
  mixedNutsDesc: {
    ar: "تشكيلة من أجود أنواع المكسّرات الصحّية",
    en: "An assortment of the finest healthy nuts",
    ru: "Ассортимент лучших полезных орехов",
  },
  healthyChocolate: { ar: "شوكولاتة صحّية", en: "Healthy Chocolate", ru: "Полезный шоколад" },
  healthyChocolateDesc: {
    ar: "شوكولاتة داكنة صحّية بدون سكّر مُضاف",
    en: "Healthy dark chocolate with no added sugar",
    ru: "Полезный тёмный шоколад без добавленного сахара",
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
