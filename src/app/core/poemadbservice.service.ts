import { Injectable } from '@angular/core';
import { IPoema } from './interface';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PoemadbService {
  auxPoema: IPoema;
  auxPoemaList: IPoema[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: IPoema) {
    this.storage.set(reference, {
      id: value.id, autor: value.autor, genre:
        value.genre, date: value.date, poema:
        value.poema
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IPoema> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IPoema[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IPoema) => this.auxPoemaList.push(data)
        );
      });
      return this.auxPoemaList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}
