import {
  SheetContent,
  SheetFooter,
  SheetClose,
  Sheet,
} from "./components/Sheet";

type FilterLayoutMobileProps = {
  filtersContainer: JSX.Element;
  applyFiltersButton: JSX.Element;
  onOpenChange: (value: boolean) => void;
};

export const FilterLayoutMobile: React.FC<FilterLayoutMobileProps> = ({
  filtersContainer,
  applyFiltersButton,
  onOpenChange,
}) => (
  <>
    <Sheet open onOpenChange={onOpenChange}>
      <SheetContent position="bottom" size="content" className="p-0">
        <div className="p-4 border border-b text-xl font-bold">Filters</div>
        <div className="overflow-auto mb-16 max-h-[540px]">
          {filtersContainer}
        </div>
        <SheetFooter>
          <SheetClose asChild>{applyFiltersButton}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>
);
