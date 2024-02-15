import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export function getHeaders(): HttpHeaders {
  const jwtToken = localStorage.getItem('token');
  const tokenWithoutQuotes =
    jwtToken && jwtToken.startsWith('"') && jwtToken.endsWith('"')
      ? jwtToken.slice(1, -1)
      : jwtToken;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutQuotes}`,
  });
  return headers;
}

@Injectable()
export class JWTTokenService {
  jwtToken: string | undefined;
  decodedToken: { [key: string]: string } | undefined;

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwtDecode(this.jwtToken || '');
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['displayname'] : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime(): number {
    this.decodeToken();
    return this.decodedToken ? Number(this.decodedToken['exp']) : 0;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
