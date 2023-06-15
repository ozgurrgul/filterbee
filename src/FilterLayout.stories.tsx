import { useState } from "react";
import type { Meta, Story } from "@storybook/react";
import { FilterLayout } from "./FilterLayout";
import "../dist/style.css";
import {
  AppliedFiltersType,
  FilterCategoriesType,
  FilterCategoryType,
} from "./types";
import React from "react";
import { FilterLayoutContextProvider } from "./FilterLayoutContext";

const meta: Meta = {
  title: "FilterLayout",
  component: FilterLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type MyFilters = "visa-category";

const visaCategoryFilter: FilterCategoryType = {
  title: "Visa categories",
  type: "multi-select",
  options: [
    {
      title: "Free",
      optionId: "FREE",
    },
    {
      title: "E-visa",
      optionId: "E_VISA",
    },
    {
      title: "Visa on arrival",
      optionId: "ON_ARRIVAL",
    },
    {
      title: "Required",
      optionId: "REQUIRED",
    },
    {
      title: "UNKNOWN",
      optionId: "Unknown",
    },
  ],
};

const Template: Story = (args) => {
  const [appliedFilters, setAppliedFilters] = useState<
    Partial<AppliedFiltersType<MyFilters>>
  >({});

  const handleFilterChange = (newFilters) => {
    console.log("handleFilterChange, ", newFilters);
    setAppliedFilters(newFilters);
  };

  const categories: FilterCategoriesType<MyFilters> = {
    "visa-category": visaCategoryFilter,
  };

  return (
    <FilterLayoutContextProvider>
      <FilterLayout<MyFilters>
        {...args}
        appliedFilters={appliedFilters}
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
