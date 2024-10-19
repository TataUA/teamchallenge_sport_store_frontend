const cleanAllLocalStorageData = () => {
  ['accessToken', 'basketId', 'persist:cart'].forEach((property) => localStorage.removeItem(property))
}

export default cleanAllLocalStorageData
