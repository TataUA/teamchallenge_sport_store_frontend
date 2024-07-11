'use server';

import { cookies } from 'next/headers';

export const getApiTokenFromCookiesAction = () => cookies().get('api_token');

export default getApiTokenFromCookiesAction;
