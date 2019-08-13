// Layout Types
import { DefaultLayout, ContentLayout } from "./layouts";

// Route Views
import MainPage from "./views/MainPage";
import ApplicationPage from './views/ApplicationPage';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: MainPage,
    title: 'Главная',
  },
  {
    path: "/app",
    layout: DefaultLayout,
    component: ApplicationPage,
    title: 'App',
  },
];
