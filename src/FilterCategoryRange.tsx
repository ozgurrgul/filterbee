import {  useState } from "react";
import { RangeProps } from "./FilterCategoryRenderer";
import { Input } from "./components/primitives/Input";

// TODO: debounce
export const FilterCategoryRange: RangeProps = ({
  category,
  appliedFilters,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(
    appliedFilters ? appliedFilters[0] : "" || ""
  );
  const [maxValue, setMaxValue] = useState(
    appliedFilters ? appliedFilters[1] : "" || ""
  );

  const updateMinValue = (minValue: string) => {
    setMinValue(minValue);
    onChange({
      value: [minValue, maxValue],
    });
  };

  const updateMaxValue = (maxValue: string) => {
    setMaxValue(maxValue);
    onChange({
      value: [minValue, maxValue],
    });
  };

  return (
    <div className="p-4 pt-0 mb-4 flex space-x-4">
      <Input
        value={minValue}
        onChange={(e) => updateMinValue(e.target.value)}
        type="number"
        placeholder={category.options.min.title}
      />
      <Input
        value={maxValue}
        onChange={(e) => updateMaxValue(e.target.value)}
        type="number"
        placeholder={category.options.max.title}
      />
    </div>
  );
};
