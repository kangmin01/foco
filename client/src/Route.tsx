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
    link: '/:country',
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
    path: '/account/profile',
    link: '/account/profile',
    element: Profile,
  },
  SECURITY: {
    path: '/account/security',
    link: '/account/security',
    element: Security,
  },
  DEACTIVATE: {
    path: '/account/deactivate',
    link: '/account/deactivate',
    element: Deactivate,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: Review,
  },
  BOOKMARK: {
    path: '/bookmark',
    link: '/bookmark',
    element: BookMark,
  },
  POSTFORMMODAL: {
    path: '/postform',
    link: '/postform',
    element: PostFormModal,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
