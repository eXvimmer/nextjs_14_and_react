import React from "react";
import ReactDOM from "react-dom/client";
import Posts from "./routes/Posts.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewPost from "./routes/NewPost/index.tsx";
import RootLayout from "./routes/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        children: [
          {
            path: "/new",
            element: <NewPost createPost={() => {}} />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
