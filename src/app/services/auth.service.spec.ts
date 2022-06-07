import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/uth.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('Authorization', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        TokenService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for login', () => {
    it('should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: '123'
      };
      const email = 'hola@gmail.com';
      const password = '123;';
      service.login(email, password).subscribe(r => {
        expect(r).toEqual(mockData);
        doneFn();
      });
       // http config
       const request = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
       request.flush(mockData);
       const params = request.request.params;
    });

    it('should return a token and save it', (doneFn) => {
      const mockData: Auth = {
        access_token: '123;'
      };
      const email = 'hola@gmail.com';
      const password = '123;';
      spyOn(tokenService, 'saveToken').and.callThrough();
      service.login(email, password).subscribe(r => {
        expect(r).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('123;');
        doneFn();
      });
       // http config
       const request = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
       request.flush(mockData);
       const params = request.request.params;
    });
  })
})
