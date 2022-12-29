import MainMap from './component/MainMap/MainMap';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import Profile from './component/Account/Profile';
import Security from './component/Account/Security';
import Deactivate from './component/Account/Deactivate';
import Review from './component/Post/Post';
import BookMark from './component/BookMark/BookMark';
import Country from './component/Country/Country';
import PostFormModal from './component/PostFormMoal/PostFormModal';

export const ROUTE = {
  HOME: {
    path: '/',
    link: '/',
    element: MainMap,
  },
  COUNTRY: {
    path: '/:country',
    link: '/country',
    element: Country,
  },
  REGISTER: {
    path: '/register',
    link: '/register',
    element: Register,
  },
  LOGIN: {
    path: '/login',
    link: '/login',
    element: Login,
  },
  FORGOTPASSWARD: {
    path: '/forgotpassword',
    link: '/forgotpassword',
    element: ForgotPassword,
  },
  PROFILE: {
    path: '/profile',
    link: '/profile',
    element: Profile,
  },
  SECURITY: {
    path: '/security',
    link: '/security',
    element: Security,
  },
  DEACTIVATE: {
    path: '/deactivate',
    link: '/deactivate',
    element: Deactivate,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: Review,
  },
  BOOKMARK: {
    path: '/bookmark', // userNum 확인바람
    link: '/bookmark',
    element: BookMark,
  },
  POSTFORMMODAL: {
    path: '/postform',
    link: '/postform',
    element: PostFormModal,
  },
};

export const PUBLIC_ROUTE = {
  HOME: {
    path: '/',
    link: '/',
    element: MainMap,
  },
  COUNTRY: {
    path: '/:country',
    link: '/country',
    element: Country,
  },
  REGISTER: {
    path: '/register',
    link: '/register',
    element: Register,
  },
  LOGIN: {
    path: '/login',
    link: '/login',
    element: Login,
  },
  FORGOTPASSWARD: {
    path: '/forgotpassword',
    link: '/forgotpassword',
    element: ForgotPassword,
  },
};

export const PRIVATE_ROUTE = {
  PROFILE: {
    path: '/profile',
    link: '/profile',
    element: Profile,
  },
  SECURITY: {
    path: '/security',
    link: '/security',
    element: Security,
  },
  DEACTIVATE: {
    path: '/deactivate',
    link: '/deactivate',
    element: Deactivate,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: Review,
  },
  BOOKMARK: {
    path: '/bookmark', // userNum 확인바람
    link: '/bookmark',
    element: BookMark,
  },
  POSTFORMMODAL: {
    path: '/postform',
    link: '/postform',
    element: PostFormModal,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
