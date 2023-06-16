import { useEffect, useState } from "react";
import type { Meta, Story } from "@storybook/react";
import { FilterLayout } from "../FilterLayout";
import "../../dist/style.css";
import { AppliedFiltersType, FilterCategoriesType } from "../types";
import React from "react";
import { FilterLayoutContextProvider } from "../FilterLayoutContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/Card";
import { getUniqValuesForFilter } from "../utils/filterUtils";
import {
  FilterCategoryToEntityPropertMap,
  getFilteredEntities,
} from "../utils/getFilteredEntities";
import { Stars } from "../components/Stars";

const meta: Meta = {
  title: "FilterLayout/Basic",
  component: FilterLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type MyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type MyProductFilters =
  | "product-category"
  | "product-brand"
  | "product-price"
  | "product-rating"
  | "product-id-test";

const Template: Story = (args) => {
  const [appliedFilters, setAppliedFilters] = useState<
    Partial<AppliedFiltersType<MyProductFilters>>
  >({
    "product-rating": 4,
  });

  const [products, setProducts] = useState<MyProduct[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json.products));
  }, []);

  const uniqProductCategories = getUniqValuesForFilter(products, "category");
  const uniqProductBrands = getUniqValuesForFilter(products, "brand");

  const handleFilterChange = (
    newFilters: Partial<AppliedFiltersType<MyProductFilters>>
  ) => {
    console.log("handleFilterChange, ", newFilters);
    setAppliedFilters(newFilters);
  };

  const categories: FilterCategoriesType<MyProductFilters> = {
    "product-category": {
      type: "multi-select",
      options: uniqProductCategories.map((productCategory) => ({
        optionId: productCategory,
        title: productCategory,
      })),
      title: "Categories",
      ui: {
        filterable: true,
        loading: true,
      },
    },
    "product-brand": {
      type: "multi-select",
      options: uniqProductBrands.map((productBrand) => ({
        optionId: productBrand,
        title: productBrand,
      })),
      title: "Brand",
      ui: {
        filterable: true,
        showAll: {
          showAlltext: "Show more",
          hideText: "Hide",
          threshold: 5,
        },
      },
    },
    "product-price": {
      type: "range",
      options: {
        min: {
          title: "Min price",
        },
        max: {
          title: "Max price",
        },
      },
      title: "Price",
    },
    "product-id-test": {
      type: "radio",
      options: [
        { optionId: "1", title: "1" },
        { optionId: "2", title: "2" },
      ],
      title: "Brand",
    },
    "product-rating": {
      type: "rating",
      title: "Rating",
      ui: {
        amountOfStars: 5,
      },
    },
  };

  const filterCategoryToEntityPropertMap: FilterCategoryToEntityPropertMap<
    MyProduct,
    MyProductFilters
  > = {
    "product-category": "category",
    "product-brand": "brand",
    "product-price": "price",
    "product-id-test": "id",
    "product-rating": "rating",
  };

  const filteredEntities = getFilteredEntities<MyProduct, MyProductFilters>({
    entities: products,
    filterCategories: categories,
    appliedFilters,
    filterCategoryToEntityPropertMap,
  });

  return (
    <FilterLayoutContextProvider appliedFilters={appliedFilters}>
      <FilterLayout<MyProductFilters>
        {...args}
        onChange={handleFilterChange}
        categories={categories}
      >
        <div className="p-6">
          <pre>{JSON.stringify(appliedFilters, null, 4)}</pre>
          <ProductsRenderer products={filteredEntities} />
        </div>
      </FilterLayout>
    </FilterLayoutContextProvider>
  );
};

const ProductsRenderer: React.FC<{ products: MyProduct[] }> = ({
  products,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <img
              src={product.thumbnail}
              className="w-full h-48 rounded-md overflow-hidden shadow-lg"
            />
            <div className="text-slate-500 mt-4">{product.description}</div>
            <div className="flex">
              <Stars amountOfStars={5} type="single" />
            </div>
          </CardContent>
          <CardFooter>
            <span>${product.price}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const Advanced = Template.bind({});

Advanced.args = {};
