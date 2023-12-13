// FeatureContext.tsx

import { Feature } from "@/types/entity";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FeatureContextType {
  feature: Partial<Feature> | null;
  isEditFeatureOpen: boolean;
  isDeleteFeatureOpen: boolean;

  openEditFeature: (feature: Partial<Feature>) => void;
  openDeleteFeature: (feature: Partial<Feature>) => void;
  closeEditFeature: () => void;
  closeDeleteFeature: () => void;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const useFeature = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error("useFeature must be used within a FeatureProvider");
  }
  return context;
};

interface FeatureProviderProps {
  children: ReactNode;
}

export const FeatureProvider: React.FC<FeatureProviderProps> = ({
  children,
}) => {
  const [isEditFeatureOpen, setIsEditFeatureOpen] = useState(false);
  const [isDeleteFeatureOpen, setIsDeleteFeatureOpen] = useState(false);

  const [feature, setFeature] = useState<Partial<Feature> | null>(null);

  const openEditFeature = (feature: Partial<Feature>) => {
    setIsEditFeatureOpen(true);
    setFeature(feature);
  };

  const closeEditFeature = () => {
    setIsEditFeatureOpen(false);
    setFeature(null);
  };

  const openDeleteFeature = (feature: Partial<Feature>) => {
    setIsDeleteFeatureOpen(true);
    setFeature(feature);
  };

  const closeDeleteFeature = () => {
    setIsDeleteFeatureOpen(false);
    setFeature(null);
  };

  return (
    <FeatureContext.Provider
      value={{
        feature,
        isEditFeatureOpen,
        openEditFeature,
        closeEditFeature,
        isDeleteFeatureOpen,
        openDeleteFeature,
        closeDeleteFeature,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};
