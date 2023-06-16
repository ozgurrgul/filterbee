import { StarIcon, StarHalfIcon } from "lucide-react";
import { cn } from "../utils/cn";

export const StarIconFilled = () => (
  <StarIcon fill="orange" stroke="#ffbf00" strokeWidth={1} />
);
export const StarIconHalfFilled = () => (
  <StarHalfIcon fill="orange" stroke="#ffbf00" strokeWidth={1} />
);
export const StarIconEmpty = () => <StarIcon stroke="orange" />;

type StarsProps = {
  amountOfStars: number;
  onClick?: (star: number) => void;
  chosenRating?: number;
  type: "single" | "multi";
  extraText?: any;
};

const renderStarIcon = (type: "filled" | "empty") => {
  if (type === "filled") {
    return <StarIconFilled />;
  } else {
    return <StarIconEmpty />;
  }
};

export const Stars: React.FC<StarsProps> = ({
  amountOfStars,
  onClick,
  chosenRating,
  type,
  extraText,
}) => {
  const renderRow = (
    filledCount: number,
    emptyCount: number,
    extraText?: any
  ) => {
    const stars = [];
    for (let i = 0; i < filledCount; i++) {
      stars.push(renderStarIcon("filled"));
    }
    for (let i = 0; i < emptyCount; i++) {
      stars.push(renderStarIcon("empty"));
    }
    return (
      <div
        className="flex flex-row cursor-pointer items-center"
        onClick={() => onClick && onClick(filledCount)}
      >
        {stars}
        {extraText && (
          <span
            className={cn("ml-2", chosenRating === filledCount && "font-bold")}
          >
            {extraText}
          </span>
        )}
      </div>
    );
  };

  const rows = [];
  if (type === "multi") {
    for (let i = amountOfStars; i > 0; i--) {
      const filledCount = i;
      const emptyCount = amountOfStars - i + 1;
      rows.push(renderRow(filledCount, emptyCount, extraText));
    }
  } else if (type === "single") {
    rows.push(renderRow(amountOfStars, 0));
  }

  return <div>{rows}</div>;
};
