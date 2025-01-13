import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import Router from "./router.tsx";

import { store } from "@/lib/store.ts";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router()} />
    </Provider>
  );
}
