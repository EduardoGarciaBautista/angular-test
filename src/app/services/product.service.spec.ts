import { ProductsService } from './product.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment';
import { generateManyProducts, generateProduct } from './product.mock';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('Product service', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });
  it('should create service', function () {
    expect(service).toBeTruthy();
  });

  describe('Test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('123');
      // Act
      service.getAllSimple().subscribe(data => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toBe(mockData);
        doneFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      const headers = request.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      request.flush(mockData);
    });
  });

  describe('Test for getAll', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      // Act
      service.getAll().subscribe(data => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      request.flush(mockData);
    });

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateProduct(),
          price: 200, // 100 * .19 = 38
        },
        {
          ...generateProduct(),
          price: 0, // 100 * .19 = 38
        },
        {
          ...generateProduct(),
          price: -100, // 100 * .19 = 38
        }
      ];

      service.getAll().subscribe(data => {
        // Assert
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      request.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      const limit = 10;
      const offset = 3;
      // Act
      service.getAll(limit, offset).subscribe(data => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
      request.flush(mockData);
      const params = request.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
    });
  });

  describe('Test for create', () => {
    it('should return a new product', (dondeFn) => {
      // Arrange
      const mockData = generateProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'description',
        categoryId: 12
      };
      // Act
      service.create({ ...dto }).subscribe(r => {
        // Assert

        expect(r).toEqual(mockData);
        dondeFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
      request.flush(mockData);
      expect(request.request.body).toEqual(dto);
      expect(request.request.method).toEqual('POST');
    });
  });

  describe('Test for update', () => {
    it('should update a product', (dondeFn) => {
      // Arrange
      const mockData = generateProduct();
      const productId = '1';
      const dto: UpdateProductDTO = {
        title: 'New product'
      }
      // Act
      service.update(productId, { ...dto }).subscribe(r => {
        // Assert
        expect(r).toEqual(mockData);
        dondeFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      request.flush(mockData);
      expect(request.request.body).toEqual(dto);
      expect(request.request.method).toEqual('PUT');
    });
  });

  describe('Test for delete', () => {
    it('should delete a product', (dondeFn) => {
      // Arrange
      const mockData = true;
      const productId = '1';
      // Act
      service.delete(productId).subscribe(r => {
        // Assert
        expect(r).toEqual(mockData);
        dondeFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      request.flush(mockData);
      expect(request.request.method).toEqual('DELETE');
    });
  });


  describe('Test for getOne', () => {
    it('should return a product', (dondeFn) => {
      // Arrange
      const mockData = generateProduct();
      const productId = '1';
      // Act
      service.getOne(productId).subscribe(r => {
        // Assert
        expect(r).toEqual(mockData);
        dondeFn();
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      request.flush(mockData);
      expect(request.request.method).toEqual('GET');
    });

    it('should return rigth msg when status code is 404', (dondeFn) => {
      // Arrange
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }
      // Act
      service.getOne(productId).subscribe({
        error: (e) => {
          // Assert
          expect(e).toEqual('El producto no existe');
          dondeFn();
        }
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(msgError, mockError);
    });

    it('should return rigth msg when status code is 409', (dondeFn) => {
      // Arrange
      const productId = '1';
      const msgError = '409 mesage';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError
      }
      // Act
      service.getOne(productId).subscribe({
        error: (e) => {
          expect(e).toEqual('Algo esta fallando en el server');
          dondeFn();
        }
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(msgError, mockError);
    });

    it('should return rigth msg when status code is 401', (dondeFn) => {
      // Arrange
      const productId = '1';
      const msgError = '401 mesage';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError
      }
      // Act
      service.getOne(productId).subscribe({
        error: (e) => {
          expect(e).toEqual('No estas permitido');
          dondeFn();
        }
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(msgError, mockError);
    });

    it('should return "Ups algo salio mal" on error', (dondeFn) => {
      // Arrange
      const productId = '1';
      const msgError = 'error mesage';
      const mockError = {
        status: HttpStatusCode.BadGateway,
        statusText: msgError
      }
      // Act
      service.getOne(productId).subscribe({
        error: (e) => {
          expect(e).toEqual('Ups algo salio mal');
          dondeFn();
        }
      });

      // http config
      const request = httpController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(msgError, mockError);
    });
  });
});
