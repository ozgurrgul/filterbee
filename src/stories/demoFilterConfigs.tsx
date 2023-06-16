import { FilterCategoryType } from "../types";
import { cn } from "../utils/cn";

export const deskBrandFilter: FilterCategoryType = {
  title: "Brand",
  type: "multi-select",
  options: [
    {
      title: "Vasagle",
      optionId: "vasagle",
    },
    {
      title: "Flash Furniture",
      optionId: "flash_furniture",
    },
    {
      title: "Costway",
      optionId: "costway",
    },
    {
      title: "Ikea",
      optionId: "ikea",
    },
    {
      title: "S-tables",
      optionId: "s_tables",
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
      showAlltext: "Show more",
      hideText: "Hide",
      threshold: 3,
    },
  },
  options: [
    {
      title: "Country Rustic",
      optionId: "country_rustic",
    },
    {
      title: "Industrial",
      optionId: "industrial",
    },
    {
      title: "Mid-Century Modern",
      optionId: "Mid-Century_modern",
    },
    {
      title: "Baroque",
      optionId: "baroque",
    },
    {
      title: "Retro",
      optionId: "retro",
    },
    {
      title: "Minimalist",
      optionId: "minimalist",
    },
    {
      title: "Hollywood legacy",
      optionId: "hollywood_legacy",
    },
    {
      title: "Lodge",
      optionId: "lodge",
    },
    {
      title: "Shaker",
      optionId: "shaker",
    },
    {
      title: "Victorian",
      optionId: "victorian",
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
