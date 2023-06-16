import { HTMLInputTypeAttribute } from "react";

export type FilterOptionIdType = string;

export type FilterCategoryOptionType = {
  optionId: FilterOptionIdType;
  title: string;
};

export type FilterTypes =
  | "radio"
  | "multi-select"
  | "range"
  | "input"
  | "rating";

type BaseFilterCategoryType = {
  title: string;
};

export type RadioFilterCategoryType = BaseFilterCategoryType & {
  type: "radio";
  options: FilterCategoryOptionType[];
  ui?: {
    loading?: boolean;
  };
};

export type MultiSelectFilterCategoryType = BaseFilterCategoryType & {
  type: "multi-select";
  options: FilterCategoryOptionType[];
  ui?: {
    loading?: boolean;
    filterable?: boolean;
    columns?: number;
    showAll?: {
      threshold: number;
      showAlltext: string;
      hideText: string;
    };
  };
  renderItem?: (
    optionId: FilterOptionIdType,
    isChecked: boolean
  ) => React.ReactNode;
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
  ui?: {
    loading?: boolean;
  };
};

export type InputFilterCategoryType = BaseFilterCategoryType & {
  type: "input";
  ui?: {
    loading?: boolean;
    label: string;
    inputType: HTMLInputTypeAttribute;
  };
};

export type RatingFilterCategoryType = BaseFilterCategoryType & {
  type: "rating";
  ui: {
    loading?: boolean;
    amountOfStars: number;
  };
};

export type FilterCategoryType =
  | MultiSelectFilterCategoryType
  | RadioFilterCategoryType
  | RangeFilterCategoryType
  | InputFilterCategoryType
  | RatingFilterCategoryType;

export type SingleAppliedFilterIdValue = string | boolean | number | undefined;
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
