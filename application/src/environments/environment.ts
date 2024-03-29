// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'localhost',
  root: 'http://localhost:4200',
  apiServer: 'dev-api.petitgouter.org', // Our localhost application will use our dev backend
  apiEndpoint: 'https://dev-api.petitgouter.org',
  app: {
    version: 'APP_VERSION',
    name: 'Petitgouter (local)'
  },
  debugStore: true,
  auth: {
    auth0: {
      domain: 'dev-petitgouter.eu.auth0.com',
      clientId: '0PYHybjvttG59KuSO9JiWI6zqJ3sKFTJ'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
