import { useState } from "react";
import { MultiSelectProps } from "./FilterCategoryRenderer";
import { Input } from "./components/Input";
import { Checkbox } from "./components/Checkbox";

export const FilterCategoryMultiSelect: MultiSelectProps = ({
  category,
  appliedFilters,
  onChange,
}) => {
  const [filterText, setFilterText] = useState("");

  const isChecked = (optionId: string) => {
    if (!appliedFilters || appliedFilters.length === 0) {
      return false;
    }
    return appliedFilters.includes(optionId);
  };

  const isFilterable = Boolean(category.ui?.filterable);
  const columnCount = category.ui?.columns || 1;

  const getFilteredOptions = () => {
    if (!filterText) {
      return category.options;
    }

    return category.options.filter((option) =>
      option.title?.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <div className="p-4 pt-0">
      {isFilterable && (
        <div className="pb-6">
          <Input
            placeholder="Filter"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      )}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {getFilteredOptions().map(({ optionId, title }) => {
          const optionIdString = `${category.title}-${optionId}`;
          const isOptionChecked = isChecked(optionId);

          if (category.renderItem) {
            return (
              <div
                key={optionIdString}
                className="flex items-center space-x-2 mb-4"
                onClick={() => onChange({ optionId, value: !isOptionChecked })}
              >
                {category.renderItem(optionId, isOptionChecked)}
              </div>
            );
          }

          return (
            <div
              key={optionIdString}
              className="flex items-center space-x-2 mb-4"
            >
              <Checkbox
                id={optionIdString}
                checked={isOptionChecked}
                onCheckedChange={(checked: boolean) =>
                  onChange({ optionId, value: checked })
                }
              />
              <label
                htmlFor={optionIdString}
                className="text-sm leading-none peer-disabled:cursor-not-allowed w-full"
              >
                {title}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
