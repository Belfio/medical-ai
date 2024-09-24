import { createContext, useState } from "react";

export const SheetContext = createContext<{
  modelSheetOpen: boolean;
  setModelSheetOpen: (open: boolean) => void;
  datasetSheetOpen: boolean;
  setDatasetSheetOpen: (open: boolean) => void;
}>({
  modelSheetOpen: false,
  setModelSheetOpen: () => {},
  datasetSheetOpen: false,
  setDatasetSheetOpen: () => {},
});

export const SheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [modelSheetOpen, setModelSheetOpen] = useState(false);
  const [datasetSheetOpen, setDatasetSheetOpen] = useState(false);

  return (
    <SheetContext.Provider
      value={{
        modelSheetOpen,
        setModelSheetOpen,
        datasetSheetOpen,
        setDatasetSheetOpen,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
};
