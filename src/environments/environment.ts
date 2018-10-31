// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:8080/api',
  urlLogin: 'http://localhost:8080/api/login',
  urlUser: 'http://localhost:8080/api/v1/user',
  urlOffice: 'http://localhost:8080/api/v1/office',
  urlPurchase: 'http://localhost:8080/api/v1/purchase',
  urlProduct: 'http://localhost:8080/api/v1/product',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
