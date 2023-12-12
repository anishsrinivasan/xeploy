import { create } from "zustand";
import { Feature } from "@/types/entity";

type FeatureStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  features: Feature[];
  setFeatures: (features: Feature[]) => void;
};

const useFeatureStore = create<FeatureStore>((set) => ({
  loading: false,
  setLoading: (loading) => set((_) => ({ loading })),
  features: [],
  setFeatures: (features) => {
    set((_) => ({ features }));
  },
}));

export { useFeatureStore };
