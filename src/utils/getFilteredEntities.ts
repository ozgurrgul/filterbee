import {
  FilterCategoriesType,
  FilterValue,
  AppliedFiltersType,
  MultipleAppliedFilterIdValue,
  SingleAppliedFilterIdValue,
  RangeAppliedFilterIdValue,
} from "../types";
import { getKeyByValue } from "./filterUtils";

export type FilterCategoryToEntityPropertMap<
  TEntity,
  FFilterType extends string
> = { [key in FFilterType]: keyof TEntity };

export function getFilteredEntities<TEntity, FFilterType extends string>({
  entities,
  filterCategories,
  appliedFilters,
  filterCategoryToEntityPropertMap,
}: {
  entities: TEntity[];
  filterCategories: FilterCategoriesType<FFilterType>;
  appliedFilters: Partial<AppliedFiltersType<FFilterType>>;
  filterCategoryToEntityPropertMap: FilterCategoryToEntityPropertMap<
    TEntity,
    FFilterType
  >;
}): TEntity[] {
  const filterMap = new Map<keyof TEntity, FilterValue>();

  // Initialize the filter map based on applied filters and mapping
  for (const filter in appliedFilters) {
    const property = filterCategoryToEntityPropertMap[filter as FFilterType];
    if (property) {
      filterMap.set(property, appliedFilters[filter as FFilterType]);
    }
  }

  if (filterMap.size === 0) {
    // If no filters are provided, return all entities.
    return entities;
  }

  return entities.filter((entity) => {
    return Array.from(filterMap.entries()).every(
      ([entityKey, filterValues]) => {
        if (!filterValues) {
          return true;
        }

        if (Array.isArray(filterValues) && filterValues.length === 0) {
          return true;
        }

        // Assuming that entityKey in filterMap corresponds to a key in entity.
        const propValue = (entity as any)[entityKey];

        const reverseFilterCategory = getKeyByValue(
          filterCategoryToEntityPropertMap,
          entityKey
        );

        if (!reverseFilterCategory) {
          return true;
        }
        const filterCategory =
          filterCategories[reverseFilterCategory as FFilterType];
        if (!filterCategory) {
          return true;
        }

        if (filterCategory.type === "multi-select") {
          return (filterValues as MultipleAppliedFilterIdValue)?.includes(
            propValue
          );
        } else if (filterCategory.type === "radio") {
          // soft equality to be able to match "1" == 1 when dealing with ids
          return (filterValues as SingleAppliedFilterIdValue) == propValue;
        } else if (filterCategory.type === "input") {
          return String(filterValues as SingleAppliedFilterIdValue).includes(
            propValue
          );
        } else if (filterCategory.type === "range") {
          const range = filterValues as RangeAppliedFilterIdValue;
          if (range) {
            const [min, max] = range;
            const _value = Number(propValue);

            if (min === "" && max === "") return true;
            if (_value >= Number(min) && max === "") return true;
            if (_value <= Number(max) && min === "") return true;
            if (_value >= Number(min) && propValue <= Number(max)) return true;

            return false;
          }
        } else if (filterCategory.type === "rating") {
          const rating = filterValues as SingleAppliedFilterIdValue;
          if (rating) {
            const _value = Number(propValue);
            console.log("_value", _value, rating);
            if (_value >= Number(rating)) {
              return true;
            }

            return false;
          }
        }

        return true;
      }
    );
  });
}
