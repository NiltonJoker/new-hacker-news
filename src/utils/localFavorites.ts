import { PostItem } from "../types/post";


const toggleFavorite = (post: PostItem): PostItem[] => {

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as PostItem[];

  const isFavorited = favorites.some(favorite => favorite?.objectID === post.objectID)

  if(isFavorited) {
    const newFavorites = favorites.filter(favorite => favorite.objectID !== post.objectID)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))

    return newFavorites
  }

  const newFavorites = [...favorites, post]

  localStorage.setItem('favorites', JSON.stringify(newFavorites))
  
  return newFavorites
}

const getFavorites = (): PostItem[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]') as PostItem[]
}

export {
  toggleFavorite,
  getFavorites
}