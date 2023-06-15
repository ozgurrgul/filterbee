import React from "react";
import { RadioProps } from "./FilterCategoryRenderer";
import { RadioGroup, RadioGroupItem } from "./components/RadioGroup";
import { Label } from "./components/Label";
import { SingleAppliedFilterIdValue } from "./types";

export const FilterCategoryRadio: RadioProps = ({
  category,
  appliedFilters,
  onChange,
}) => {
  const value = appliedFilters as SingleAppliedFilterIdValue;
  return (
    <div className="p-4 pt-0 mb-4">
      <RadioGroup
        value={String(value)}
        onValueChange={(value) =>
          onChange({
            optionId: undefined,
            value: value,
          })
        }
      >
        {category.options.map(({ optionId, title }) => {
          const optionIdString = `${category.title}-${optionId}`;
          return (
            <div key={optionIdString} className="flex items-center space-x-2">
              <RadioGroupItem value={optionId} id={optionIdString} />
              <Label htmlFor={optionIdString} className="w-full">
                {title}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
