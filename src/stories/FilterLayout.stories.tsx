import { useState } from "react";
import type { Meta, Story } from "@storybook/react";
import { FilterLayout } from "../FilterLayout";
import "../../dist/style.css";
import { AppliedFiltersType, FilterCategoriesType } from "../types";
import React from "react";
import { FilterLayoutContextProvider } from "../FilterLayoutContext";
import {
  deskBrandFilter,
  deskPriceFilter,
  deskStyleFilter,
  deskColorFilter,
  deskConditionFilter,
  customSearchFilter,
} from "./demoFilterConfigs";

const meta: Meta = {
  title: "FilterLayout",
  component: FilterLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type MyFilters =
  | "desk-brand"
  | "desk-price"
  | "desk-style"
  | "desk-condition"
  | "desk-color"
  | "custom-search";

const Template: Story = (args) => {
  const [appliedFilters, setAppliedFilters] = useState<
    Partial<AppliedFiltersType<MyFilters>>
  >({
    "desk-brand": ["Vasagle"],
  });

  const handleFilterChange = (
    newFilters: Partial<AppliedFiltersType<MyFilters>>
  ) => {
    console.log("handleFilterChange, ", newFilters);
    setAppliedFilters(newFilters);
  };

  const categories: FilterCategoriesType<MyFilters> = {
    "desk-brand": deskBrandFilter,
    "desk-price": deskPriceFilter,
    "desk-style": deskStyleFilter,
    "desk-condition": deskConditionFilter,
    "desk-color": deskColorFilter,
    "custom-search": customSearchFilter,
  };

  return (
    <FilterLayoutContextProvider appliedFilters={appliedFilters}>
      <FilterLayout<MyFilters>
        {...args}
        onChange={handleFilterChange}
        categories={categories}
      >
        <div>Child</div>
      </FilterLayout>
    </FilterLayoutContextProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
  appliedFilters: {},
};
