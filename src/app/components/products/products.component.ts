import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  constructor(private product: ProductsService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.product.getAllSimple().subscribe(products => {
      this.products = products;
    });
  }

}
