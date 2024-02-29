const setSessionsStorage = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export default setSessionsStorage;