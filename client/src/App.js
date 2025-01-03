import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AddProductPage } from "./pages/AddProductPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="newProduct" element={<AddProductPage />} />
        <Route path="/:id" element={<ProductDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
