import { Button } from "./components/Button";
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
        <div className="overflow-auto max-h-[540px] mb-8">
          {filtersContainer}
        </div>
        <Button>clos</Button>
        <SheetFooter>
          <SheetClose asChild>{applyFiltersButton}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>
);
