import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RegistrationFormService {

  constructor(private http:Http) { }

  getAbout() {
    return this.http.get('http://localhost:8000/about');
  }

  saveDetails(donarDetails: any) {
    return this.http.post('http://localhost:3000/saveDetails', donarDetails);
  }

}
