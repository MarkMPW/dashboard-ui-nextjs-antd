export const getPosts = () => {
  const getLocalStoragePost = localStorage.getItem('posts')
  return getLocalStoragePost ? JSON.parse(getLocalStoragePost) : []
}
