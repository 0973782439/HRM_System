import { IBenefits } from "./Benefits";

export interface IGrade {
  id: number;
  name: string;
  code: string;
  company_id: number;
  type: number;
  value: string;
  benefits: IBenefits;
}
