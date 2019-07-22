import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  connectedUser: any;

  constructor(private http: HttpClient) { 
    this.connectedUser = this.getDecodedToken();
  }

  register(body) {
    return this.http.post('http://localhost:3000/users/register', body);
  }

  login(body) {
    console.log(body)
    return this.http.post('http://localhost:3000/users/login', body);
  }

  postAddSujet(body: any) {
    return this.http.post(`http://localhost:3000/sujets/addSujet`, body);
  }

  postDeleteSujet(id: any) {
    return this.http.post(`http://localhost:3000/sujets/DeleteSujet/${id}`, null);
  }

  getAllSujet() {
    return this.http.get(`http://localhost:3000/sujets/allSujet`);
  }

  getmySujet(id: any) {
    return this.http.get(`http://localhost:3000/sujets/mySujet/${id}, null`);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getDecodedToken() {
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token'));
      return decoded;
    } else {
      return null;
    }
  }
}
  