import React from "react";
import { Button } from "./components/Button";

type ApplyFiltersButtonProps = {
  onClick: () => void;
};

export const ApplyFiltersButtonDesktop: React.FC<ApplyFiltersButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t p-4 flex align-items justify-center bg-white">
      <Button className="w-full" onClick={onClick}>
        Apply filters
      </Button>
    </div>
  );
};

export const ApplyFiltersButtonMobile: React.FC<ApplyFiltersButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t p-4 flex align-items justify-center bg-white"
      style={{
        zIndex: 100,
      }}
    >
      <Button className="w-full" onClick={onClick}>
        Apply filters
      </Button>
    </div>
  );
};
