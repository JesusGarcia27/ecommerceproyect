import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedAuth from "./components/auth/ProtectedAuth";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Purchase from "./pages/Purchase";
import Cart from "./components/cart/Cart";
import { useEffect, useState } from "react";

function App() {

  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    if(isDark){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <section className="grid grid-rows-[auto_1fr] min-h-screen dark:bg-black/90 dark:text-white ">
      <Header setIsDark={setIsDark} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedAuth />}>
          <Route path="/purchase" element={<Purchase />} />
        </Route>

        <Route path="/products/:id" element={<Product />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Cart />
    </section>
  );
}

export default App;
