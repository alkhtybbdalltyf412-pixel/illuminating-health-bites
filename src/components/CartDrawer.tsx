import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { X, Send, Minus, Plus } from "lucide-react";
import { FoodItem } from "./FoodCard";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  items: FoodItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const TELEGRAM_URL = "https://t.me/Illuminatingpoison";

const CartDrawer = ({ open, onClose, cart, items, onAdd, onRemove }: CartDrawerProps) => {
  const { t, dir } = useI18n();

  const cartItems = items.filter((item) => cart[item.id] > 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);

  const handleOrder = async () => {
    const orderText = cartItems
      .map((item) => `${t(item.nameKey as any)} x${cart[item.id]}`)
      .join("\n");
    const msg = `🛒 طلب جديد:\n\n${orderText}`;
    try {
      await navigator.clipboard.writeText(msg);
      toast.success(dir === "rtl" ? "تم نسخ الطلب! الصقه في المحادثة 📋" : "Order copied! Paste it in the chat 📋");
    } catch {
      toast.info(msg);
    }
    window.open("https://t.me/Illuminatingpoison", "_blank");
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 ${dir === "rtl" ? "left-0" : "right-0"} h-full w-full max-w-sm bg-background z-50 shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : dir === "rtl"
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">{t("myOrder")}</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t("emptyCart")}</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-card rounded-lg p-3">
                  <img
                    src={item.image}
                    alt={t(item.nameKey as any)}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{t(item.nameKey as any)}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{cart[item.id]}</span>
                    <button
                      onClick={() => onAdd(item.id)}
                      className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t border-border space-y-3">
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
                {t("orderOnTelegram")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
