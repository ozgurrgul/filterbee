import React from "react";
import { Button } from "./components/Button";

type ApplyFiltersButtonProps = {
  applyText?: any;
  cancelText?: any;
  onApplylick: () => void;
  onCancelClick?: () => void;
};

export const ApplyFiltersButtonDesktop: React.FC<ApplyFiltersButtonProps> = ({
  applyText,
  onApplylick,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t p-4 flex align-items justify-center bg-white">
      <Button className="w-full" onClick={onApplylick}>
        {applyText || "Apply filters"}
      </Button>
    </div>
  );
};

export const ApplyFiltersButtonMobile: React.FC<ApplyFiltersButtonProps> = ({
  applyText,
  cancelText,
  onApplylick,
  onCancelClick,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t p-4 flex align-items justify-center bg-white space-x-4"
      style={{
        zIndex: 100,
      }}
    >
      <Button className="w-full" onClick={onCancelClick} variant="secondary">
        {cancelText || "Cancel"}
      </Button>
      <Button className="w-full" onClick={onApplylick}>
        {applyText || "Apply filters"}
      </Button>
    </div>
  );
};
