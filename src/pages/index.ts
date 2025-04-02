import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));
const ROIExample = lazy(() => import('@/pages/ROIExample')); 

export { Home, ROIExample };
