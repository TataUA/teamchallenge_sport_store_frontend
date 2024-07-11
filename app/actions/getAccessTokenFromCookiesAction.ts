'use server';

import { cookies } from 'next/headers';

const getAccessTokenFromCookiesAction = () => cookies().get('accessToken');

export default getAccessTokenFromCookiesAction;
