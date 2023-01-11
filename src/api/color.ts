import axios from './index'

const URLS = {
  colors: '/colors',
}

export const fetchColors = <T>() => axios.get<T>(URLS.colors).then((response) => response.data)
