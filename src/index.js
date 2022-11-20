import { React, lazy, Suspense} from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { createRoot } from 'react-dom/client';
import MoviesContextProvider from "./contexts/moviesContext";

const AddMovieReviewPage = lazy(() => import('./pages/addMovieReviewPage'));
const PersonDetailsPage = lazy(() => import('./pages/personDetailsPage'));
const TrendingPeoplePage = lazy(() => import('./pages/trendingPeoplePage'));
const PopularPeoplePage = lazy(() => import('./pages/popularPeoplePage'));
const NowPlayingPageMoviesPage = lazy(() => import("./pages/nowPlayingMoviesPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const TrendingMoviesPage = lazy(() => import("./pages/trendingMoviesPage"));
const UpcomingMoviesPage = lazy(() => import("./pages/upcomingMoviesPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const TopRatedMoviesPage = lazy(() => import("./pages/topRatedMoviesPage"));
const ResetPage = lazy(() => import("./pages/resetPage"));
const RegisterPage = lazy(() => import("./pages/registerPage"));
const LoginPage = lazy(() => import("./pages/loginPage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const HomePage = lazy(() => import("./pages/homePage"))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <SiteHeader />
    <MoviesContextProvider>
    <Suspense fallback={<h1>Loading page</h1>}>
      <Routes>
        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/now-playing" element={<NowPlayingPageMoviesPage />} />
        <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
        <Route path="/movies/trending" element={<TrendingMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/home" element={<HomePage />} />
        <Route path="/people" element={<PopularPeoplePage />} />
        <Route path="/people/trending" element={<TrendingPeoplePage />} />
        <Route path="/people/:id" element={<PersonDetailsPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/reset" element={<ResetPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={ <Navigate to="/login" /> } />
      </Routes>
    </Suspense>
    </MoviesContextProvider>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};

const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);