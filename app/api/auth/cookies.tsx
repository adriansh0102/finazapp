
'use server'
import { cookies } from 'next/headers';

export const saveCookies = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set('token', token)
}

export const getCookies = async (value: string): Promise<string> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(value);
    if (token) return token.value;
    return '';
}


