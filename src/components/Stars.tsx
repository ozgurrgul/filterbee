import React from "react";
import { StarIcon, StarHalfIcon } from "lucide-react";

type StarIconProps = {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

export const StarIconFilled: React.FC<StarIconProps> = () => (
  <StarIcon fill="orange" stroke="#ffbf00" strokeWidth={1} />
);

export const StarIconEmpty: React.FC<StarIconProps> = () => (
  <StarIcon stroke="orange" />
);

type StarsProps = {
  amountOfStars: number;
  onClick?: (star: number) => void;
  chosenRating?: number;
  type: "single" | "multi";
  extraText?: string;
};

type StarType = "filled" | "empty";

const renderStarIcon = (type: StarType) => {
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
    extraText?: string,
    key?: string
  ) => {
    const stars = [];
    for (let i = 0; i < filledCount; i++) {
      stars.push(<span key={`filled_${i}`}>{renderStarIcon("filled")}</span>);
    }
    for (let i = 0; i < emptyCount; i++) {
      stars.push(<span key={`empty_${i}`}>{renderStarIcon("empty")}</span>);
    }
    return (
      <div
        key={key}
        className="flex flex-row cursor-pointer items-center"
        onClick={() => onClick && onClick(filledCount)}
      >
        {stars}
        {extraText && (
          <span
            className={`ml-2 ${
              chosenRating === filledCount ? "font-bold" : ""
            }`}
          >
            {extraText}
          </span>
        )}
      </div>
    );
  };

  const rows = [];
  if (type === "multi") {
    for (let i = amountOfStars, j = 0; i > 0; i--, j++) {
      const filledCount = i;
      const emptyCount = amountOfStars - i + 1;
      rows.push(renderRow(filledCount, emptyCount, extraText, `row_${j}`));
    }
  } else if (type === "single") {
    rows.push(renderRow(amountOfStars, 0, undefined, "row_0"));
  }

  return <div>{rows}</div>;
};
