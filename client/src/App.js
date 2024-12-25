import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import { MainPage } from "./pages/MainPage";

import { AddProductPage } from "./pages/AddProductPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="newProduct" element={<AddProductPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
