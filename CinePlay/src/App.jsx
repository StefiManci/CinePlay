import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Protected from "./Components/Protected";
import Admin from "./Components/Admin";

// Loading Components with Lazy Load to improve performance
const Navigation = lazy(() => import("./Components/Navigation"));
const Home = lazy(() => import("./Paths/Home"));
const Movie = lazy(() => import("./Paths/Movie"));
const Profile = lazy(() => import("./Paths/Profile"));
const Series = lazy(() => import("./Paths/Series"));
const Search = lazy(() => import("./Paths/Search"));
const Details = lazy(() => import("./Components/Details"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading Navigation...</div>}>
        <Navigation />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/Movies",
        element: (
          <Suspense fallback={<div>Loading Movies...</div>}>
            <Movie />
          </Suspense>
        ),
      },
      {
        path: "/Profile",
        element: (
          <Suspense fallback={<div>Loading Profile...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/Series",
        element: (
          <Suspense fallback={<div>Loading Series...</div>}>
            <Series />
          </Suspense>
        ),
      },
      {
        path: "/Search",
        element: (
          <Suspense fallback={<div>Loading Search...</div>}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/Details",
        element: (
          <Suspense fallback={<div>Loading Details...</div>}>
            <Details />
          </Suspense>
        ),
      },
      {
        path:"/Admin",
        element:(
          <Protected element={<Admin></Admin>}></Protected>
        )
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
