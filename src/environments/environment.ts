// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBaaN3TsDH2fqTYQap5aY-f8ymYyd5VN8U",
    authDomain: "myformidableapp.firebaseapp.com",
    databaseURL: "https://myformidableapp.firebaseio.com",
    projectId: "myformidableapp",
    storageBucket: "myformidableapp.appspot.com",
    messagingSenderId: "1096829862965"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
