
const getSessionStorage = <T>(key: string)  => {
  if(typeof window !== 'undefined'){
    const item = window.sessionStorage.getItem(key);
    const data: T = item ? JSON.parse(item) : null;
    return item ? data : null;
  }
  return null;
}

export default getSessionStorage;