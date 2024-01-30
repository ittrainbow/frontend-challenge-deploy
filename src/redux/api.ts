import axios from 'axios'
import { TCat } from '../typescript/types'

const API_KEY = 'live_gjHQJrNuz87rFSovcLCc2fcvATGUuTlEzhHHAn45cKASJNTRV6jEULdm0WdYCdy7'

export const getCats = async (limit: number = 10, search?: string) => {
  const searchRequest = search ? `&breed_ids=${search}` : ''
  const URL = `https://api.thecatapi.com/v1/images/search?limit=${limit}${searchRequest}&api_key=${API_KEY}`
  const cats: Promise<TCat[]> = await axios.get(URL).then((response) => response.data)

  return cats
}

export const getFav = async (fav: string) => {
  const URL = `https://api.thecatapi.com/v1/images/${fav}`
  const cat: Promise<TCat[]> = await axios.get(URL).then((response) => response.data)

  return cat
}
