const getLocalStorage = (dataType: string) => {
  const getLocalStorageData = localStorage.getItem(dataType);
  return getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
};

export const LocalStorage = () => ({
  getPost: () => getLocalStorage('posts'),
  getUsers: () => getLocalStorage('userData'),
  getCurrentUser: () => getLocalStorage('currentUser')
});

export default { LocalStorage }
