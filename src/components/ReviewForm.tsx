import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { Star, Send } from "lucide-react";

const TELEGRAM_REVIEW = "https://t.me/ALKHATIB543";

const ReviewForm = () => {
  const { t, dir } = useI18n();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(t("ratingRequired"));
      return;
    }

    const stars = "⭐".repeat(rating);
    const msg = `📝 تقييم جديد:\n\n${stars} (${rating}/5)\n👤 ${name || "مجهول"}\n💬 ${review}`;

    try {
      await navigator.clipboard.writeText(msg);
      toast.success(t("reviewSent"));
    } catch {
      toast.info(msg);
    }

    window.open(TELEGRAM_REVIEW, "_blank");
    setName("");
    setReview("");
    setRating(0);
  };

  return (
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
        {t("reviewSection")}
      </h2>
      <div className="max-w-md mx-auto bg-card rounded-xl p-6 card-elevated space-y-4">
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "fill-secondary text-secondary"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("yourName")}
          maxLength={50}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder={t("yourReview")}
          maxLength={500}
          rows={3}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={!review.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {t("sendReview")}
        </button>
      </div>
    </section>
  );
};

export default ReviewForm;
