import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

axiosApi.interceptors.request.use(
  async function (config) {
    try {
      // const session = await getSession();
      // if (session?.user) config.headers['Authorization'] = `Bearer ${session.user.access}`;
    } catch { 
      // signOut()
     }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
axiosApi.interceptors.response.use(
  (response) => {
    // Manejar la respuesta exitosa
    return response;
  },
  (error) => {
    // Manejar errores de respuesta
    return Promise.reject(error);
  }
);

export default axiosApi;