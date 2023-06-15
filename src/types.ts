import { HTMLInputTypeAttribute } from "react";

export type FilterTypes = "radio" | "multi-select" | "range" | "input";
export type FilterOptionIdType = string;

type BaseFilterCategoryType = {
  title: string;
};

export type RadioFilterCategoryType = BaseFilterCategoryType & {
  type: "radio";
  options: FilterCategoryOptionType[];
};

export type MultiSelectFilterCategoryType = BaseFilterCategoryType & {
  type: "multi-select";
  options: FilterCategoryOptionType[];
  ui?: {
    filterable?: boolean;
    columns?: 1 | 2 | 3;
  };
};

export type RangeFilterCategoryType = BaseFilterCategoryType & {
  type: "range";
  options: {
    min: {
      title: string;
    };
    max: {
      title: string;
    };
  };
};

export type InputFilterCategoryType = BaseFilterCategoryType & {
  type: "input";
  // options: FilterCategoryOptionType[];
  ui?: {
    label: string;
    inputType: HTMLInputTypeAttribute;
  };
};

export type FilterCategoryType =
  | MultiSelectFilterCategoryType
  | RadioFilterCategoryType
  | RangeFilterCategoryType
  | InputFilterCategoryType;

export type FilterCategoryOptionType = {
  optionId: FilterOptionIdType;
  title: string;
};

export type SingleAppliedFilterIdValue = string | boolean | undefined;
export type MultipleAppliedFilterIdValue =
  | SingleAppliedFilterIdValue[]
  | undefined;
export type RangeAppliedFilterIdValue = [string, string] | undefined;

export type FilterValue =
  | SingleAppliedFilterIdValue
  | MultipleAppliedFilterIdValue
  | RangeAppliedFilterIdValue;

export type AppliedFiltersType<T extends string> = {
  [key in T]: FilterValue | undefined;
};

export type FilterCategoriesType<T extends string> = {
  [key in T]: FilterCategoryType;
};
