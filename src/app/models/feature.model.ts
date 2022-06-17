import { Control } from "./control.model";

export interface Feature {
  name: string;
  styles: Control[];
  activeStyle: Control | undefined;
}