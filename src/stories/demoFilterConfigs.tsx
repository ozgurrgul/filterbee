import { FilterCategoryType } from "../types";

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
  ],
};

export const deskConditionFilter: FilterCategoryType = {
  title: "Desk condition",
  type: "radio",
  options: [
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
    return (
      <span
        className="rounded-full w-5 h-5 inline-block border cursor-pointer"
        style={{
          backgroundColor: optionId,
          borderColor: isChecked ? "black" : "transparent",
          borderWidth: 2,
        }}
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
