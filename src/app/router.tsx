import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import Layout from "@/components/layouts";
import Home from "@/components/pages/home";
import Item from "@/components/pages/item";

const Router = (): ReturnType<typeof createBrowserRouter> => {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Home />} />
          <Route path=":id" element={<Item />} />
        </Route>
      </>,
    ),
  );
};

export default Router;
