import { Observable } from 'rxjs';

export class Order {

  constructor(){}

  address:number|undefined;
  delivery:string|undefined;
  note: string|undefined;
  price:number|undefined;
  products: []|undefined;
}
