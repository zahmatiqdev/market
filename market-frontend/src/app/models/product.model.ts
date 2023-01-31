import { Category } from './category.model';
import { Unit } from './unit.model';

export class Product {
  public id: number;
  public category: Category[];
  public unit: Unit;
  public name: string;
  public price: number;
  public short_desc: string;
  public long_desc: string;
  public image: string;

  constructor(
    id: number, 
    category: Category[], 
    unit: Unit, 
    name: string, 
    price: number, 
    short_desc: string, 
    long_desc: string, 
    image: string) {
      this.id = id;
      this.category = category,
      this.unit = unit;
      this.name = name;
      this.price = price;
      this.short_desc = short_desc;
      this.long_desc = long_desc;
      this.image = image;
  }
}
