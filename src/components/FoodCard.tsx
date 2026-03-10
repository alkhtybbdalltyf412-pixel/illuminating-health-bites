import { useI18n } from "@/lib/i18n";
import { Plus, Minus } from "lucide-react";

export interface FoodItem {
  id: string;
  nameKey: string;
  descKey: string;
  image: string;
  price: number;
  size?: string;
}

interface FoodCardProps {
  item: FoodItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const FoodCard = ({ item, quantity, onAdd, onRemove }: FoodCardProps) => {
  const { t } = useI18n();

  return (
    <div className="bg-card rounded-xl overflow-hidden card-elevated">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={t(item.nameKey as any)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-foreground">{t(item.nameKey as any)}</h3>
          {item.size && (
            <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{item.size}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3">{t(item.descKey as any)}</p>
        <div className="flex items-center justify-end">
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              {t("addToOrder")}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onRemove}
                className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-foreground w-6 text-center">{quantity}</span>
              <button
                onClick={onAdd}
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
