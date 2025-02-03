import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToList<T>(key: string, item: T): void {
    const existingList: T[] = this.getItem<T[]>(key) || [];
    existingList.push(item);
    this.setItem(key, existingList)
  }

  removeFromList<T>(key: string, predicate: (item: T) => boolean): void {
    const existingList: T[] = this.getItem<T[]>(key) || [];
    const updatedList = existingList.filter((obj) => !predicate(obj))
    this.setItem(key, updatedList);
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
