// components/industrial/modals/types.ts

export interface SolutionContent {
  title: string;
  version?: string; // NUEVO
  certImage?: string; // NUEVO
  targetType?: string;
  chips: string[];
  description: string[];
  mainIndustries: string[];
  intendedUse: string[];
  principle: string[];
  limitations: string[];
  techSpecs: {
    targets: string;
    performance: string;
    matrices: string;
    time: string;
    technology: string;
    chemistry: string;
    channels: string;
    thermocyclers: string;
    storage: string;
    shelfLife: string;
    certifications: string;
  };
  advantages: string[];
  pcrKits: { cat: string; name: string; size: string; format: string; desc: string }[];
  supplies?: { cat: string; name: string; size: string; format: string; desc: string }[];
}
