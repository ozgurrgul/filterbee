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
import { Button } from "./components/primitives/Button";
import { cn } from "./utils/cn";

type FilterLayoutProps<T extends string> = {
  categories: FilterCategoriesType<T>;
  onChange?: (newFilters: Partial<AppliedFiltersType<T>>) => void;
  children: any;
  header?: {
    mobile?: any;
  };
  i18n?: {
    buttons?: {
      apply?: any;
      cancel?: any;
      filters?: any;
    };
  };
};

export const FilterLayout = <T extends string>({
  categories,
  onChange,
  children,
  header,
  i18n,
}: FilterLayoutProps<T>) => {
  const { temporarilyAppliedFilters } = useContext(FilterLayoutContext);
  const [isShowSheet, setShowSheet] = React.useState(false);

  const hideSheet = () => setShowSheet(false);

  return (
    <div>
      <div
        className={`filterbee-filter-layout flex flex-col lg:grid bg-zinc-50`}
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
            {i18n?.buttons?.filters || "Filters"}{" "}
            <ChevronDown size={18} className="ml-1" />
          </Button>
        </div>

        {isShowSheet && (
          <FilterLayoutMobile
            filtersContainer={<FiltersContainer<T> categories={categories} />}
            applyFiltersButton={
              <ApplyFiltersButtonMobile
                applyText={i18n?.buttons?.apply}
                cancelText={i18n?.buttons?.cancel}
                onApplylick={() => {
                  if (onChange) {
                    onChange(temporarilyAppliedFilters);
                    hideSheet();
                  }
                }}
                onCancelClick={hideSheet}
              />
            }
            onOpenChange={hideSheet}
          />
        )}

        {/* Tablet and over filter menu on left */}
        <div className="relative border-r border-b-0 hidden lg:flex align-items bg-white pb-16 overflow-y-hidden">
          <div className="w-full overflow-y-auto h-full">
            <FiltersContainer<T>
              categories={categories}
              applyFiltersButton={
                <ApplyFiltersButtonDesktop
                  applyText={i18n?.buttons?.apply}
                  onApplylick={() => {
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
