import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App"
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/dashboard/details/ActivityDetailPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../features/account/RegisterForm";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                element: <RequireAuth></RequireAuth>, children: [
                    { path: 'activities', element: <ActivityDashboard></ActivityDashboard> },
                    { path: 'createActivity', element: <ActivityForm key='create'></ActivityForm> },
                    { path: 'activities/:id', element: <ActivityDetailPage></ActivityDetailPage> },
                    { path: 'manage/:id', element: <ActivityForm></ActivityForm> },
                ]
            },
            { path: '', element: <HomePage /> },

            { path: 'counter', element: <Counter></Counter> },
            { path: 'errors', element: <TestErrors></TestErrors> },
            { path: 'not-found', element: <NotFound></NotFound> },
            { path: 'server-error', element: <ServerError></ServerError> },
            { path: 'login', element: <LoginForm></LoginForm> },
            { path: 'register', element: <RegisterForm></RegisterForm> },
            { path: '*', element: <Navigate replace to='/not-found' /> },

        ]
    }
])