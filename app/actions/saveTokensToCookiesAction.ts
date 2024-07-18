'use server';

import { cookies } from 'next/headers';

export const saveTokensToCookiesAction = ({accessToken, refreshToken}: {accessToken: string, refreshToken: string}) => {
  const fortyDays = 40 * 24 * 60 * 60 * 1000
  cookies().set('accessToken', accessToken, { maxAge: 100 * 60 * 1000 });
  cookies().set('refreshToken', refreshToken, { maxAge: fortyDays });
};

export default saveTokensToCookiesAction;
