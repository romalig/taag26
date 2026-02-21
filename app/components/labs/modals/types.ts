// components/industrial/modals/types.ts

export interface SolutionContent {
  title: string;
  chips: string[];
  description: string[];
  mainIndustries: string[];
  intendedUse: string[];
  principle: string[];
  limitations: string[];
  techSpecs: {
    targets: string;
    lod: string;
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