'use server';

import { cookies } from 'next/headers';

export const saveTokenToCookiesAction = (token: string) => {
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set('api_token', token, { maxAge: oneDay });
};

export default saveTokenToCookiesAction;
