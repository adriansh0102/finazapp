import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
}

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`)
}

export const deleteUser = async (id: string) => {
  return await axios.delete(`${API_URL}/users/${id}`)
}

export const updateUser = async (id: string, data: any) => {
  return await axios.put(`${API_URL}/users/${id}`, data)
}

export const createUser = async (data: any) => {
  return await axios.post(`${API_URL}/users`, data)
}






