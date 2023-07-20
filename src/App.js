import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
const Form = lazy(() => import("./components/Form"));

const AppLayout = () => {
    return(
        <div className="w-full">
            <Outlet />
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<h1>Loading...</h1>}><Form /></Suspense>
            },
        ]
    }

])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);