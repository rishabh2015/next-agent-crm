const Keys = {
  TOKEN: 'token'
}

class DataStore {
  static getToken = () => localStorage.getItem(Keys.TOKEN)
  static setToken = (value: string) => localStorage.setItem(Keys.TOKEN, value)

  static clear = () => localStorage.clear();
}

export default DataStore;
