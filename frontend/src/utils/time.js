export const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const waitUntilTrue = (callback, interval = 5000) => new Promise(resolve => {
  const intervalId = setInterval(() => {
    if (callback()) {
      clearInterval(intervalId);
      resolve();
    }
  }, interval);
});