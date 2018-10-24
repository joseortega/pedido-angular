import {Product} from '../model/product';

export class PurchaseItem{
    id: number;
    request_quantity: number;
    dispatch_quantity: number;
    product: Product;
}

