import { createBrowserRouter } from "react-router";
import App from "../layout/App"
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/dashboard/details/ActivityDetailPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {path:'', element:<HomePage/>},
            {path:'activities', element:<ActivityDashboard></ActivityDashboard>},
            {path:'createActivity', element:<ActivityForm  key='create'></ActivityForm>},
            {path:'activities/:id', element:<ActivityDetailPage></ActivityDetailPage>},
            {path:'manage/:id', element:<ActivityForm></ActivityForm>},
        ]
    }
])