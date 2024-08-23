import {TProducts} from "./products"

export type TOrderItem = {
  id: number;
  
  items: TProducts[];
  subtotal: number;
}