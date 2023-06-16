import { useState } from "react";
import { RatingProps } from "./FilterCategoryRenderer";
import { Stars } from "./components/Stars";

export const FilterCategoryRating: RatingProps = ({
  category,
  appliedFilters,
  onChange,
}) => {
  const [value, setValue] = useState(Number(appliedFilters || 0));

  const updateValue = (value: number) => {
    setValue(value);
    onChange({
      value,
    });
  };

  return (
    <div className="p-4 pt-0 mb-4 flex flex-col">
      <Stars
        amountOfStars={category.ui.amountOfStars}
        chosenRating={value}
        onClick={updateValue}
        type="multi"
        extraText="& Up"
      />
    </div>
  );
};
