import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import store from "./store"
import { Provider } from "react-redux"
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import QueryExecScreen from "./screens/QueryExecScreen.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/query" element={<QueryExecScreen />} />
      </Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
