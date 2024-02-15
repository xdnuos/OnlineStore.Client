import { Injectable } from '@angular/core';
@Injectable()
export class LocalStorageService {
  set(key: any, value: any) {
    let dataJSON = JSON.stringify(value);
    localStorage.setItem(key, dataJSON);
  }
  get(key: any) {
    let dataJSON = localStorage.getItem(key);
    if (!dataJSON) {
      return null;
    } else {
      return JSON.parse(dataJSON);
    }
  }
  remove(key: any) {
    localStorage.removeItem(key);
  }
}
