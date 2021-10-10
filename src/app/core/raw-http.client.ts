import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})

/**
 * http client to use when headers, base url and other application based
 * configurations should be skipped.
 * */
export class RawHttpClient extends HttpClient {

	constructor(handler: HttpBackend) {
		super(handler);
	}

}
