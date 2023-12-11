import { TestBed } from '@angular/core/testing';
import { ProductViewComponent } from './product-view.component';
import { ProductoFinanciero } from '../../models/producto-financiero.model';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {TableComponent} from "../../components/table/table.component";

describe('ProductViewComponent - createProduct', () => {
  let component: ProductViewComponent;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewComponent, TableComponent],
      providers: [ProductService],
      imports: [HttpClientTestingModule],
    });

    const fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create a new ProductoFinanciero instance', () => {
    const mockProductData: string[] = ['id_pr_nbp', 'Logo prueba', 'Nombre prueba', 'Descripción prueba', '2023-12-31', '2023-12-31'];

    const newProduct: ProductoFinanciero = component.createProduct(mockProductData);

    expect(newProduct.id).toEqual('id_pr_nbp');
    expect(newProduct.logo).toEqual('Logo prueba');
    expect(newProduct.name).toEqual('Nombre prueba');
    expect(newProduct.description).toEqual('Descripción prueba');
  });
});

describe('ProductViewComponent - updateProduct', () => {
  let component: ProductViewComponent;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewComponent, TableComponent],
      providers: [ProductService],
      imports: [HttpClientTestingModule],
    });

    const fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should update a ProductoFinanciero instance', (done) => {
    const mockProductData: string[] = ['id_pr_nbp', 'Logo prueba', 'Nombre prueba', 'Descripción prueba', '2023-12-31', '2023-12-31'];
    const updatedProduct: ProductoFinanciero = component.createProduct(mockProductData);

    component.updateProduct(mockProductData);
    productService.getById("id_pr_nbp").subscribe((data) => {
      expect(data).toEqual(updatedProduct);
      done();
    });
  });
});

describe('ProductViewComponent - deleteProduct', () => {
  let component: ProductViewComponent;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewComponent, TableComponent],
      providers: [ProductService],
      imports: [HttpClientTestingModule],
    });

    const fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should delete a ProductoFinanciero instance', () => {
    const mockProductData: string[] = ['id_pr_nbp', 'Logo prueba', 'Nombre prueba', 'Descripción prueba', '2023-12-31', '2023-12-31'];
    const productToDelete: ProductoFinanciero = component.createProduct(mockProductData);

    component.deleteProduct(mockProductData);
    const productData = productService.getById("id_pr_nbp");

    expect(productData).not.toContain(productToDelete);
  });
});
