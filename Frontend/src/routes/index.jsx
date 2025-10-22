import App from "@/App";
import ExploreSSM from "@/pages/ExploreSSM";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"",
        element: <Home />
      },
      {
        path:"explore-smmcolege",
        element:<ExploreSSM />
      }
    ]
  },
]);

export { router };
