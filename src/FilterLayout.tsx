import { FiltersContainer } from "./FiltersContainer";
import { AppliedFiltersType, FilterCategoriesType } from "./types";
import {
  ApplyFiltersButtonDesktop,
  ApplyFiltersButtonMobile,
} from "./ApplyFiltersButton";
import { useContext } from "react";
import { FilterLayoutContext } from "./FilterLayoutContext";
import React from "react";
import { FilterLayoutMobile } from "./FilterLayoutMobile";
import { ChevronDown } from "lucide-react";
import { Button } from "./components/Button";
import { cn } from "./utils/cn";

type FilterLayoutProps<T extends string> = {
  categories: FilterCategoriesType<T>;
  onChange?: (newFilters: Partial<AppliedFiltersType<T>>) => void;
  children: any;
  header?: {
    mobile?: JSX.Element;
  };
};

export const FilterLayout = <T extends string>({
  categories,
  onChange,
  children,
  header,
}: FilterLayoutProps<T>) => {
  const { temporarilyAppliedFilters } = useContext(FilterLayoutContext);
  const [showSheet, setShowSheet] = React.useState(false);

  return (
    <div>
      <div
        className={`filter-layout-container flex flex-col lg:grid bg-zinc-50`}
        style={{
          height: "100vh",
          overflowY: "hidden",
          gridTemplateColumns: `400px 1fr`,
        }}
      >
        {/* Mobile only header */}
        <div className="p-4 bg-white border-b space-x-2 flex lg:hidden flex-row items-center">
          <div className="w-full flex flex-row flex-wrap">{header?.mobile}</div>
          <Button onClick={() => setShowSheet(true)} size="sm">
            Filters <ChevronDown size={18} className="ml-1" />
          </Button>
        </div>

        {showSheet && (
          <FilterLayoutMobile
            filtersContainer={<FiltersContainer<T> categories={categories} />}
            applyFiltersButton={
              <ApplyFiltersButtonMobile
                onClick={() => {
                  if (onChange) {
                    onChange(temporarilyAppliedFilters);
                  }
                }}
              />
            }
            onOpenChange={() => setShowSheet(false)}
          />
        )}

        {/* Tablet and over filter menu on left */}
        <div
          className={cn(
            "filters-container relative border-r border-b-0 hidden lg:flex align-items bg-white pb-16 "
          )}
          style={{
            overflowY: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              overflowY: "auto",
            }}
            className="w-full"
          >
            <FiltersContainer<T>
              categories={categories}
              applyFiltersButton={
                <ApplyFiltersButtonDesktop
                  onClick={() => {
                    if (onChange) {
                      onChange(temporarilyAppliedFilters);
                    }
                  }}
                />
              }
            />
          </div>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
};
