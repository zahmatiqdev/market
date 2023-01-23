import { Observable } from 'rxjs';
import { Product } from './product.model';

export class Order {

  constructor(){}

  id: number|undefined;
  address:number|undefined;
  delivery:string|undefined;
  note: string|undefined;
  price:number|undefined;
  products: []|undefined;
}
