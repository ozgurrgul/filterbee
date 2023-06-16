import { FilterCategoryType } from "../types";
import { cn } from "../utils/cn";

export const deskBrandFilter: FilterCategoryType = {
  title: "Brand",
  type: "multi-select",
  options: [
    {
      title: "Vasagle",
      optionId: "Vasagle",
    },
    {
      title: "Flash Furniture",
      optionId: "Flash Furniture",
    },
    {
      title: "Costway",
      optionId: "Costway",
    },
    {
      title: "Ikea",
      optionId: "Ikea",
    },
    {
      title: "S-tables",
      optionId: "S-tables",
    },
  ],
};

export const deskPriceFilter: FilterCategoryType = {
  title: "Price range",
  type: "range",
  options: {
    min: {
      title: "Min price",
    },
    max: {
      title: "Max price",
    },
  },
};

export const deskStyleFilter: FilterCategoryType = {
  title: "Desk style",
  type: "multi-select",
  ui: {
    showAll: {
      text: "Show more",
      threshold: 3,
    },
  },
  options: [
    {
      title: "Country Rustic",
      optionId: "Country Rustic",
    },
    {
      title: "Industrial",
      optionId: "Industrial",
    },
    {
      title: "Mid-Century Modern",
      optionId: "Mid-Century Modern",
    },
    {
      title: "Baroque",
      optionId: "Baroque",
    },
    {
      title: "Retro",
      optionId: "Retro",
    },
    {
      title: "Minimalist",
      optionId: "Minimalist",
    },
    {
      title: "Hollywood legacy",
      optionId: "Hollywood legacy",
    },
    {
      title: "Lodge",
      optionId: "Lodge",
    },
    {
      title: "Shaker",
      optionId: "Shaker",
    },
    {
      title: "Victorian",
      optionId: "Victorian",
    },
  ],
};

export const deskConditionFilter: FilterCategoryType = {
  title: "Desk condition",
  type: "radio",
  options: [
    {
      title: "All",
      optionId: "All",
    },
    {
      title: "Used",
      optionId: "Used",
    },
    {
      title: "New",
      optionId: "New",
    },
  ],
};

export const deskColorFilter: FilterCategoryType = {
  title: "Color",
  type: "multi-select",
  renderItem: (optionId, isChecked) => {
    const colorMap: { [optionId: string]: string } = {
      black: "bg-black",
      red: "bg-red-400",
      yellow: "bg-orange-400",
      blue: "bg-blue-400",
      green: "bg-green-400",
    };
    return (
      <span
        className={cn(
          "rounded-full w-5 h-5 inline-block cursor-pointer border-2",
          isChecked && "border-zinc-600",
          !isChecked && "border-transparent",
          colorMap[optionId]
        )}
      >
        &nbsp;
      </span>
    );
  },
  options: [
    {
      optionId: "black",
    },
    {
      optionId: "red",
    },
    {
      optionId: "yellow",
    },
    {
      optionId: "blue",
    },
    {
      optionId: "green",
    },
  ],
  ui: {
    columns: 8,
  },
};

export const customSearchFilter: FilterCategoryType = {
  title: "Custom search",
  type: "input",
  ui: {
    inputType: "text",
    label: "Search",
  },
};
