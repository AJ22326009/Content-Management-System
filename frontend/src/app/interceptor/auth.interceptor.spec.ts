import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  // Declare it as HttpInterceptorFn type
  let interceptor: HttpInterceptorFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Assign the function directly
    interceptor = AuthInterceptor;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});