'use server';

import { cookies } from 'next/headers';

const getRefreshTokenFromCookiesAction = () => cookies().get('refreshToken');

export default getRefreshTokenFromCookiesAction;
