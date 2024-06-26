export const getPosts = () => {
  const getLocalStoragePost = localStorage.getItem('posts')
  return getLocalStoragePost ? JSON.parse(getLocalStoragePost) : []
}

export const getUsers = () => {
  const getLocalStorageUser = localStorage.getItem('userData')
  return getLocalStorageUser ? JSON.parse(getLocalStorageUser) : []
}
