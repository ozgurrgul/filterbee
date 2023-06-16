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
  title: "FilterLayout/Basic",
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

const categories: FilterCategoriesType<MyFilters> = {
  "desk-brand": deskBrandFilter,
  "desk-price": deskPriceFilter,
  "desk-style": deskStyleFilter,
  "desk-condition": deskConditionFilter,
  "desk-color": deskColorFilter,
  "custom-search": customSearchFilter,
};

const Template: Story = (args) => {
  const [appliedFilters, setAppliedFilters] = useState<
    Partial<AppliedFiltersType<MyFilters>>
  >({
    "desk-brand": ["Vasagle"],
    "desk-condition": "All",
  });

  const handleFilterChange = (
    newFilters: Partial<AppliedFiltersType<MyFilters>>
  ) => {
    console.log("handleFilterChange, ", newFilters);
    setAppliedFilters(newFilters);
  };

  return (
    <FilterLayoutContextProvider appliedFilters={appliedFilters}>
      <FilterLayout<MyFilters>
        {...args}
        onChange={handleFilterChange}
        categories={categories}
      >
        <pre className="p-4">{JSON.stringify(appliedFilters, null, 4)}</pre>
      </FilterLayout>
    </FilterLayoutContextProvider>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
