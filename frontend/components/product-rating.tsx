import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

export default function StarRating({
  rating,
  color,
}: {
  rating: number;
  color?: string;
}) {
  const totalStars = 5;

  const fullStars = Math.floor(rating);
  const fractionalStar = rating - fullStars;

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: totalStars }).map((_, index) => {
        const isFullStar = index < fullStars;
        const isPartialStar = index === fullStars && fractionalStar > 0;
        const isEmptyStar = index > fullStars;

        return (
          <div
            key={index}
            style={{
              position: "relative",
              width: "20px",
              height: "20px",
              display: "inline-block",
              marginRight: "4px",
            }}
          >
            {/* Partial Star */}
            {isPartialStar && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "20px",
                  height: "20px",
                  overflow: "hidden",
                  color: color || "white",
                }}
              >
                <OutlineStar
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "20px",
                    height: "20px",
                    color: color || "white",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${fractionalStar * 20}px`,
                    height: "20px",
                    overflow: "hidden",
                  }}
                >
                  <SolidStar
                    style={{
                      width: "20px",
                      height: "20px",
                      color: color || "white",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Filled Star */}
            {isFullStar && !isPartialStar && (
              <SolidStar
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "20px",
                  height: "20px",
                  color: color || "white",
                }}
              />
            )}

            {/* Outline Star */}
            {isEmptyStar && !isPartialStar && (
              <OutlineStar
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "20px",
                  height: "20px",
                  color: color || "white",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
