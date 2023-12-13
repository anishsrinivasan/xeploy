// EnvironmentContext.tsx

import { Environments } from "@/types/entity";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface EnvironmentContextType {
  environment: Partial<Environments> | null;
  isEditEnvironmentOpen: boolean;
  isDeleteEnvironmentOpen: boolean;

  openEditEnvironment: (environment: Partial<Environments>) => void;
  openDeleteEnvironment: (environment: Partial<Environments>) => void;
  closeEditEnvironment: () => void;
  closeDeleteEnvironment: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const useEnvironment = (): EnvironmentContextType => {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error("useEnvironment must be used within a EnvironmentProvider");
  }
  return context;
};

interface EnvironmentProviderProps {
  children: ReactNode;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({
  children,
}) => {
  const [isEditEnvironmentOpen, setIsEditEnvironmentOpen] = useState(false);
  const [isDeleteEnvironmentOpen, setIsDeleteEnvironmentOpen] = useState(false);

  const [environment, setEnvironment] = useState<Partial<Environments> | null>(null);

  const openEditEnvironment = (environment: Partial<Environments>) => {
    setIsEditEnvironmentOpen(true);
    setEnvironment(environment);
  };

  const closeEditEnvironment = () => {
    setIsEditEnvironmentOpen(false);
    setEnvironment(null);
  };

  const openDeleteEnvironment = (environment: Partial<Environments>) => {
    setIsDeleteEnvironmentOpen(true);
    setEnvironment(environment);
  };

  const closeDeleteEnvironment = () => {
    setIsDeleteEnvironmentOpen(false);
    setEnvironment(null);
  };

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        isEditEnvironmentOpen,
        openEditEnvironment,
        closeEditEnvironment,
        isDeleteEnvironmentOpen,
        openDeleteEnvironment,
        closeDeleteEnvironment,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};
