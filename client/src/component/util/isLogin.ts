import { Cookies } from 'react-cookie';

const cookies = new Cookies();
export const isLogin = () => !!cookies.get('token');
