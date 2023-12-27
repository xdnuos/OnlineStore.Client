import { HttpHeaders } from '@angular/common/http';

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
