import { inject, Injectable } from '@angular/core';

import { Annotation } from '../../models/annotation';
// import { Video } from '../models/video';
import { CommunicationService } from '../communication/communication-service';
import { LocalStorageConstants } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  /**
   * Write a value to localStorage under the given key.
   * Serializes objects to JSON; preserves primitive strings as-is.
   */
  setItem(key: string, value: any): void {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  /**
   * Read a value from localStorage. Attempts to parse JSON; returns string if not JSON.
   * Returns null if key not present or on read error.
   */
  getItem(key: string): string | null {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item);
  }

  // TODO - modify to work with videos]
  /**
   * Will add a new item to an existing list in local storage. If the list does not yet exist,
   * it will create it and initialize it with the passed in item.
   */
  addListItem(item: Annotation) {
    const items = this.getListItems(LocalStorageConstants.ANNOTATIONS) || [];
    items.push(item);
    this.setItem(LocalStorageConstants.ANNOTATIONS, items);
    return items;
  }

  getListItems(key: string): any[] {
    const items = localStorage.getItem(key);
    if (items === null) return [];
    return JSON.parse(items);
  }

  updateListItem(key: string, updatedItem: any): any {
    const items = this.getListItems(key) || [];
    const index = items.findIndex((index: any) => index.id === updatedItem.id);
    if (index !== -1) {
      console.log('FOUND INDEX', index);
      items[index] = updatedItem;
    }
    this.setItem(key, items);
    console.log('NEW ITEMS in update list item ', items);
    return items;
  }

  /**
   * Removes a specified item from the local storage list 'key'
   *
   * @param key
   * @param id
   * @returns The updated list with the specified item 'id' removed
   */
  removeListItemById(key: string, id: string): any[] {
    const items = this.getListItems(key);
    const filteredItems = items.filter((item) => item.id !== id);
    this.setItem(key, filteredItems);
    return filteredItems;
  }
}
