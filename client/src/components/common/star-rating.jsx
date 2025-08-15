import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StatRatingComponent({ rating, handleRatingChange }) {
   
  console.log("the clicked rating is", rating);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          className={`
            relative p-3 rounded-full transition-all duration-300 ease-out transform 
            hover:scale-110 hover:rotate-12 active:scale-95 
            shadow-lg hover:shadow-xl
            ${
              star <= rating
                ? "text-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-300 hover:from-yellow-100 hover:to-amber-200 hover:border-yellow-400 hover:shadow-yellow-200/50"
                : "text-slate-400 bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200 hover:from-slate-100 hover:to-slate-200 hover:border-slate-300 hover:text-slate-600 hover:shadow-slate-200/50"
            }
            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
            ${
              star <= rating
                ? "before:from-yellow-400/20 before:to-amber-400/20"
                : "before:from-slate-300/10 before:to-gray-300/10"
            }
            before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
            group
          `}
          variant="outline"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`
              w-6 h-6 relative z-10 transition-all duration-300 ease-out
              drop-shadow-sm group-hover:drop-shadow-lg
              ${
                star <= rating
                  ? "fill-yellow-400 group-hover:fill-yellow-500"
                  : "fill-transparent group-hover:fill-slate-300/50"
              }
            `}
          />
          {/* Sparkle effect for filled stars */}
          {star <= rating && (
            <>
              <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60" />
              <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-amber-400 rounded-full animate-pulse opacity-40 animation-delay-300" />
            </>
          )}
        </Button>
      ))}
    </div>
  );
}

export default StatRatingComponent;
