import { useState } from "react";
import { InputProps } from "./FilterCategoryRenderer";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./components/Input";

// TODO: debounce
export const FilterCategoryInput: InputProps = ({
  category,
  appliedFilters,
  onChange,
}) => {
  const [value, setValue] = useState(String(appliedFilters));

  const updateValue = (value: string) => {
    setValue(value);
    onChange({
      value,
    });
  };

  return (
    <div className="p-4 pt-0 mb-4 flex space-x-2 items-center">
      {category.ui?.label && (
        <Label className="flex-1">{category.ui?.label}</Label>
      )}
      <Input
        className="flex-1"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
        type={category.ui?.inputType}
      />
    </div>
  );
};
