import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'assets/info.json';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  // getData() {
	// 	return new Promise((resolve, reject) => {
		
	// 		this.http.get(apiUrl)
	// 			.subscribe(res => {
	// 				resolve(res);
	// 			}, (err) => {
	// 				console.log(err);
					
	// 			});
	// 	});

	// }
  getData() {
    return this.http.get(apiUrl);
}
}
