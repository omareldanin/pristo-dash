import { DotSpinner } from "ldrs/react";

export const LoadingSpinner = () => {
  return (
    <div className="loadingSpinner center">
      <DotSpinner size="40" speed="0.9" color="rgba(249, 165, 26, 1)" />
    </div>
  );
};
