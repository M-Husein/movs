import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router-v6";
import Skeleton from '@mui/material/Skeleton';
import { ErrorComponent } from "@refinedev/mui";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SplashScreen } from '@/components/SplashScreen';
import { Layout } from "@/components/layout";

// Pages:
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
// const ForgotPassword = lazy(() => import('@/pages/forgot-password'));
const Home = lazy(() => import('@/pages/home'));
const Movie = lazy(() => import('@/pages/movie'));
const Favorites = lazy(() => import('@/pages/favorites'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            appendCurrentPathToQuery={false}
            loading={<SplashScreen />}
            fallback={<CatchAllNavigate to="/login" />}
          >
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="home" />} />
        <Route path="/home" element={lazyComponent(Home)} />

        <Route path="movie/:id" element={lazyComponent(Movie)} />
        <Route path="favorites" element={lazyComponent(Favorites)} />

        <Route path="*" element={<ErrorComponent />} />
      </Route>

      <Route
        element={
          <Authenticated
            key="authenticated-outer"
            appendCurrentPathToQuery={false}
            loading={<SplashScreen />}
            fallback={<Outlet />}
          >
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={lazyComponent(Login, <SplashScreen />)} />
        <Route path="/register" element={lazyComponent(Register, <SplashScreen />)} />
        {/* <Route path="/forgot-password" element={lazyComponent(ForgotPassword, <SplashScreen />)} /> */}
      </Route>
    </Routes>
  )
}

const lazyComponent = (Element: any, loading?: any) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={loading || <Skeleton />}>
        <Element />
      </Suspense>
    </ErrorBoundary>
  )
}
