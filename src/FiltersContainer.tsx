"use client";

import { useContext } from "react";
import { FilterCategoryRenderer } from "./FilterCategoryRenderer";
import {
  SingleAppliedFilterIdValue,
  AppliedFiltersType,
  FilterCategoryOptionType,
  FilterCategoryType,
  MultipleAppliedFilterIdValue,
  FilterValue,
  FilterTypes,
} from "./types";
import { FilterLayoutContext } from "./FilterLayoutContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/Accordion";

type FiltersContainerProps<T extends string> = {
  categories: { [key in T]: FilterCategoryType };
  applyFiltersButton?: JSX.Element;
  onChange?: (newFilters: Partial<AppliedFiltersType<T>>) => void;
};

type OnFilterValueChange<T> = {
  filterId: T;
  optionId?: FilterCategoryOptionType["optionId"];
  value: FilterValue;
};

export const FiltersContainer = <T extends string>({
  categories,
  applyFiltersButton,
  onChange,
}: FiltersContainerProps<T>) => {
  const { temporarilyAppliedFilters, setTemporarilyAppliedFilters } =
    useContext(FilterLayoutContext);

  const onFilterValueChange = ({
    filterId,
    optionId,
    value,
  }: OnFilterValueChange<T>) => {
    const category = (categories[filterId] as FilterCategoryType).type;
    if (!category) {
      throw new Error(`filter category with ${filterId} is not found`);
    }

    let newTempAppliedFilters: Partial<AppliedFiltersType<any>> = {};

    const onChangePerCategoryMap: { [key in FilterTypes]: () => void } = {
      "multi-select": () => {
        const appliedFilterIds =
          (temporarilyAppliedFilters[
            filterId
          ] as MultipleAppliedFilterIdValue) || [];
        let newAppliedFilterIds: MultipleAppliedFilterIdValue = [];
        if (appliedFilterIds.includes(String(optionId))) {
          newAppliedFilterIds = appliedFilterIds.filter(
            (_optionId) => _optionId !== optionId
          );
        } else {
          newAppliedFilterIds = [
            ...appliedFilterIds,
            optionId as SingleAppliedFilterIdValue,
          ];
        }
        newTempAppliedFilters = {
          ...temporarilyAppliedFilters,
          [filterId]: newAppliedFilterIds,
        };
      },
      radio: () => {
        newTempAppliedFilters = {
          ...temporarilyAppliedFilters,
          [filterId]: value,
        };
      },
      range: () => {
        newTempAppliedFilters = {
          ...temporarilyAppliedFilters,
          [filterId]: value,
        };
      },
      input: () => {
        newTempAppliedFilters = {
          ...temporarilyAppliedFilters,
          [filterId]: value,
        };
      },
      rating: () => {
        newTempAppliedFilters = {
          ...temporarilyAppliedFilters,
          [filterId]: value,
        };
      },
    };

    onChangePerCategoryMap[category]();
    setTemporarilyAppliedFilters(newTempAppliedFilters);

    if (onChange) {
      onChange(newTempAppliedFilters);
    }
  };

  return (
    <div className="filterbee-filters-container">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={Object.keys(categories)}
      >
        {Object.keys(categories).map((filterId, i) => (
          <AccordionItem value={filterId} key={filterId}>
            <AccordionTrigger>
              <div className="p-4 pb-0 pt-0">
                <div className="text-md lg:text-lg font-semibold text-left">
                  {categories[filterId as T].title}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
              <FilterCategoryRenderer
                category={categories[filterId as T]}
                onChange={({ optionId, value }) =>
                  onFilterValueChange({
                    filterId: filterId as T,
                    optionId,
                    value,
                  })
                }
                appliedFilters={temporarilyAppliedFilters[filterId as T]}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {applyFiltersButton}
    </div>
  );
};
