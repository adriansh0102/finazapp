import axiosApi from "@/lib/axios"


export const login = async (email: string, password: string):Promise<any> => {
    const response = await axiosApi.post("/auth/login", { email, password });
    return response;
};

