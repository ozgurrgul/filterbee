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
import { Separator } from "./components/Separator";

type FiltersContainerProps<T extends string> = {
  categories: { [key in T]: FilterCategoryType };
  applyFiltersButton?: JSX.Element;
};

type OnFilterValueChange<T> = {
  filterId: T;
  optionId?: FilterCategoryOptionType["optionId"];
  value: FilterValue;
};

export const FiltersContainer = <T extends string>({
  categories,
  applyFiltersButton,
}: FiltersContainerProps<T>) => {
  const { temporarilyAppliedFilters, setTemporarilyAppliedFilters } =
    useContext(FilterLayoutContext);

  console.log("temporarilyAppliedFilters", temporarilyAppliedFilters);

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
    };

    onChangePerCategoryMap[category]();
    setTemporarilyAppliedFilters(newTempAppliedFilters);
    console.log("up");
  };

  const isLastItem = (index: number) =>
    Object.keys(categories).length === index + 1;

  return (
    <>
      {Object.keys(categories).map((filterId, i) => (
        <div key={filterId}>
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
          {!isLastItem(i) && <Separator />}
        </div>
      ))}
      {applyFiltersButton}
    </>
  );
};
