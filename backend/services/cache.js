module.exports = class Cache {
  constructor(timeoutInSeconds = 30) {
    this.timeout = timeoutInSeconds * 1000;
    this.cache = new Map();
  }

  get(key) {
    const entry = this.cache.get(key);
    return (entry && entry.expiration > Date.now()) ? entry.value : null;
  }

  set(key, value) {
    this.cache.set(key, { expiration: Date.now() + this.timeout, value });
  }

  delete(key) {
    this.cache.delete(key);
  }
};