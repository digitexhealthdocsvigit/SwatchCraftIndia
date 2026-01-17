
export interface Product {
  id: number;
  title: string;
  description: string;
  moq: string;
  imageAlt: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  icon: string;
  description: string;
}

export interface ExportRegion {
  title: string;
  flags: string[];
  description: string;
  linkText: string;
}
