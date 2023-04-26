export { Storage };

class Storage {
  constructor(storageType = 'localStorage', keyValue = 'value') {
    this.keyValue = keyValue;

    if (storageType === 'localStorage') {
      this.storageType = localStorage;
    } else if (storageType === 'sessionStorage') {
      this.storageType = sessionStorage;
    } else return console.error('Invalid parameter');
  }

  get() {
    return JSON.parse(this.storageType.getItem(this.keyValue));
  }

  set(value) {
    this.storageType.setItem(this.keyValue, JSON.stringify(value));
  }

  clear() {
    this.storageType.removeItem(this.keyValue);
  }

  isEmpty() {
    return !this.storageType.getItem(this.keyValue);
  }
}
