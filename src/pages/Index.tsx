import { useState, useCallback, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import Header from "@/components/Header";
import FoodCard, { FoodItem } from "@/components/FoodCard";
import CartDrawer from "@/components/CartDrawer";
import Testimonials from "@/components/Testimonials";
import ReviewForm from "@/components/ReviewForm";
import InfoSection from "@/components/InfoSection";
import { Send } from "lucide-react";

import grilledWings from "@/assets/grilled-wings.jpg";
import riceChicken from "@/assets/rice-chicken.jpg";
import fajita from "@/assets/fajita.jpg";
import shawarma from "@/assets/shawarma.jpg";
import dateBalls from "@/assets/date-balls.jpg";
import stuffedDates from "@/assets/stuffed-dates.jpg";
import nutBars from "@/assets/nut-bars.jpg";
import bananaCocktail from "@/assets/banana-cocktail.jpg";
import avocadoCocktail from "@/assets/avocado-cocktail.jpg";
import orangeJuice from "@/assets/orange-juice.jpg";
import carrotJuice from "@/assets/carrot-juice.jpg";
import healthyBread from "@/assets/healthy-bread.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const meals: FoodItem[] = [
  { id: "shawarma", nameKey: "shawarma", descKey: "shawarmaDesc", image: shawarma, price: 200, comingSoon: true },
  { id: "fajita", nameKey: "fajita", descKey: "fajitaDesc", image: fajita, price: 200, comingSoon: true },
  { id: "grilled-wings", nameKey: "grilledWings", descKey: "grilledWingsDesc", image: grilledWings, price: 200 },
  { id: "rice-chicken", nameKey: "riceChicken", descKey: "riceChickenDesc", image: riceChicken, price: 200 },
];

const snacks: FoodItem[] = [
  { id: "stuffed-dates", nameKey: "stuffedDates", descKey: "stuffedDatesDesc", image: stuffedDates, price: 250, comingSoon: true },
  { id: "date-balls", nameKey: "dateBalls", descKey: "dateBallsDesc", image: dateBalls, price: 250 },
  { id: "nut-bars", nameKey: "nutBars", descKey: "nutBarsDesc", image: nutBars, price: 300 },
];

const drinks: FoodItem[] = [
  { id: "avocado-cocktail", nameKey: "avocadoCocktail", descKey: "avocadoCocktailDesc", image: avocadoCocktail, price: 200, size: "250 ml" },
  { id: "banana-cocktail", nameKey: "bananaCocktail", descKey: "bananaCocktailDesc", image: bananaCocktail, price: 150, size: "250 ml" },
  { id: "carrot-juice", nameKey: "carrotJuice", descKey: "carrotJuiceDesc", image: carrotJuice, price: 150, size: "250 ml", comingSoon: true },
  { id: "orange-juice", nameKey: "orangeJuice", descKey: "orangeJuiceDesc", image: orangeJuice, price: 250, size: "250 ml", comingSoon: true },
];

const bakery: FoodItem[] = [
  { id: "healthy-bread", nameKey: "healthyBread", descKey: "healthyBreadDesc", image: healthyBread, price: 100, comingSoon: true },
];

const allItems = [...meals, ...snacks, ...drinks, ...bakery];

const TELEGRAM_ORDER = "https://t.me/ALKHATIB543";

const Index = () => {
  const { t, dir } = useI18n();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const addItem = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  }, []);

  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);
  const cartItems = useMemo(() => allItems.filter((item) => cart[item.id] > 0), [cart]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0),
    [cartItems, cart]
  );

  const sendToTelegram = useCallback(async () => {
    const orderText = cartItems
      .map((item) => `${t(item.nameKey as any)} x${cart[item.id]} — ${item.price * cart[item.id]}₽`)
      .join("\n");
    const msg = `🛒 طلب جديد:\n\n${orderText}\n\n💰 المجموع: ${cartTotal}₽`;

    try {
      await navigator.clipboard.writeText(msg);
      toast.success(dir === "rtl" ? "تم نسخ الطلب! الصقه في المحادثة 📋" : "Order copied! Paste it in the chat 📋");
    } catch {
      toast.info(msg);
    }
    window.open(TELEGRAM_ORDER, "_blank");
  }, [cartItems, cart, t, dir, cartTotal]);

  const Section = ({ titleKey, items }: { titleKey: string; items: FoodItem[] }) => (
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t(titleKey as any)}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            quantity={cart[item.id] || 0}
            onAdd={() => addItem(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <img src={heroBanner} alt="Healthy food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-3 drop-shadow-lg">
              {t("storeName")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 font-medium">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="pt-12" />
      <Section titleKey="mealsSection" items={meals} />
      <Section titleKey="juicesSection" items={drinks} />
      <Section titleKey="snacksSection" items={snacks} />
      <Section titleKey="bakerySection" items={bakery} />

      {/* Info Notes */}
      <InfoSection />

      {/* Testimonials & Review */}
      <Testimonials />
      <ReviewForm />

      {cartCount > 0 && (
        <button
          onClick={sendToTelegram}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg font-bold text-lg"
        >
          <Send className="w-5 h-5" />
          {t("orderOnTelegram")} ({cartCount}) — {cartTotal}₽
        </button>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        items={allItems}
        onAdd={addItem}
        onRemove={removeItem}
      />
    </div>
  );
};

export default Index;
