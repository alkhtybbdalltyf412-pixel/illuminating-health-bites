import { useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import FoodCard, { FoodItem } from "@/components/FoodCard";
import CartDrawer from "@/components/CartDrawer";
import Testimonials from "@/components/Testimonials";

import grilledChicken from "@/assets/grilled-chicken.jpg";
import riceChicken from "@/assets/rice-chicken.jpg";
import fajita from "@/assets/fajita.jpg";
import stuffedDates from "@/assets/stuffed-dates.jpg";
import nuts from "@/assets/nuts.jpg";
import healthyChocolate from "@/assets/healthy-chocolate.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const meals: FoodItem[] = [
  { id: "grilled-chicken", nameKey: "grilledChicken", descKey: "grilledChickenDesc", image: grilledChicken, price: 0 },
  { id: "rice-chicken", nameKey: "riceChicken", descKey: "riceChickenDesc", image: riceChicken, price: 0 },
  { id: "fajita", nameKey: "fajita", descKey: "fajitaDesc", image: fajita, price: 0 },
];

const snacks: FoodItem[] = [
  { id: "stuffed-dates", nameKey: "stuffedDates", descKey: "stuffedDatesDesc", image: stuffedDates, price: 0 },
  { id: "mixed-nuts", nameKey: "mixedNuts", descKey: "mixedNutsDesc", image: nuts, price: 0 },
  { id: "healthy-chocolate", nameKey: "healthyChocolate", descKey: "healthyChocolateDesc", image: healthyChocolate, price: 0 },
];

const allItems = [...meals, ...snacks];

const Index = () => {
  const { t } = useI18n();
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

      {/* Meals */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("mealsSection")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((item) => (
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

      {/* Snacks */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t("snacksSection")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snacks.map((item) => (
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

      {/* Floating cart button on mobile */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg font-bold text-lg md:hidden"
        >
          {t("myOrder")} ({cartCount} {t("items")})
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
