import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  TOKEN = environment.AUTH0_TOKEN;

  constructor() { }

  async getAllUser(): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.TOKEN}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://dev-0dw7km0b5mi1uoc6.us.auth0.com/api/v2/users", requestOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async getUserById(userId: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.TOKEN}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        `https://dev-0dw7km0b5mi1uoc6.us.auth0.com/api/v2/users/${userId}`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async getUsersOfRole(role: string): Promise<any> {
    
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.TOKEN}`);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`https://dev-0dw7km0b5mi1uoc6.us.auth0.com/api/v2/roles/${role}/users`, requestOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }



}
