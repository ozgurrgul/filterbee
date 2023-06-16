import { FilterCategoryInput } from "./FilterCategoryInput";
import { FilterCategoryMultiSelect } from "./FilterCategoryMultiSelect";
import { FilterCategoryRadio } from "./FilterCategoryRadio";
import { FilterCategoryRange } from "./FilterCategoryRange";
import {
  SingleAppliedFilterIdValue,
  FilterCategoryType,
  FilterOptionIdType,
  FilterTypes,
  MultipleAppliedFilterIdValue,
  RadioFilterCategoryType,
  MultiSelectFilterCategoryType,
  RangeFilterCategoryType,
  RangeAppliedFilterIdValue,
  FilterValue,
  InputFilterCategoryType,
} from "./types";

export type FilterCategoryRendererProps = {
  category: FilterCategoryType;
  onChange: (params: { optionId?: FilterOptionIdType; value: any }) => void;
  appliedFilters?: FilterValue;
};

export type FilterCategoryComponentRendererProps<
  T extends any,
  F extends any
> = {
  category: T;
  onChange: (params: { optionId?: FilterOptionIdType; value: any }) => void;
  appliedFilters: F;
};

export type RadioProps = React.FC<
  FilterCategoryComponentRendererProps<
    RadioFilterCategoryType,
    SingleAppliedFilterIdValue
  >
>;

export type MultiSelectProps = React.FC<
  FilterCategoryComponentRendererProps<
    MultiSelectFilterCategoryType,
    MultipleAppliedFilterIdValue
  >
>;

export type RangeProps = React.FC<
  FilterCategoryComponentRendererProps<
    RangeFilterCategoryType,
    RangeAppliedFilterIdValue
  >
>;

export type InputProps = React.FC<
  FilterCategoryComponentRendererProps<
    InputFilterCategoryType,
    SingleAppliedFilterIdValue
  >
>;

const CATEGORY_RENDERER_MAP: {
  [key in FilterTypes]:
    | RadioProps
    | MultiSelectProps
    | RangeProps
    | InputProps
    | undefined;
} = {
  radio: FilterCategoryRadio,
  "multi-select": FilterCategoryMultiSelect,
  range: FilterCategoryRange,
  input: FilterCategoryInput,
};

export const FilterCategoryRenderer: React.FC<FilterCategoryRendererProps> = ({
  category,
  onChange,
  appliedFilters,
}) => {
  const Category = CATEGORY_RENDERER_MAP[category.type];
  return (
    <>
      {Category ? (
        <Category
          // @ts-ignore
          category={category}
          // @ts-ignore
          appliedFilters={appliedFilters}
          onChange={onChange}
        />
      ) : null}
    </>
  );
};
