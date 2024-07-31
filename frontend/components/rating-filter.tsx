import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useOptimistic, useTransition } from "react";

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

function Star({ filled, onClick }: StarProps) {
  const searchParams = useSearchParams();
  return (
    <span
      className={`star ${filled ? "text-white" : "text-stone-700"}`}
      onClick={onClick}
    >
      ★
      <style jsx>{`
        .star {
          font-size: 16px;
          cursor: pointer;
          transition: color 0.3s;
        }
      `}</style>
    </span>
  );
}

export function StarRatingFilter() {
  const searchParams = useSearchParams();
  const ratingFromParams = parseInt(searchParams.get("rating") || "0", 10);
  const { replace } = useRouter();
  const pathname = usePathname();

  // Initialize optimistic state with current rating
  const [optimisticRating, setOptimisticRating] =
    useOptimistic(ratingFromParams);
  const [pending, startTransition] = useTransition();

  const handleClick = (index: number) => {
    const newRating = index + 1;

    // Optimistically update the rating
    setOptimisticRating(newRating);

    const params = new URLSearchParams(searchParams);
    params.set("rating", newRating?.toString());

    startTransition(() => {
      replace(`${pathname}?${params?.toString()}`);
    });
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < optimisticRating}
          onClick={() => handleClick(index)}
        />
      ))}
      <style jsx>{`
        .star-rating {
          display: flex;
        }
      `}</style>
    </div>
  );
}

export default StarRatingFilter;
