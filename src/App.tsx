import Home from "@/pages/home";
import PriceVariationPage from "@/pages/priceVariation";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/price-variation/:sku",
    element: <PriceVariationPage />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;