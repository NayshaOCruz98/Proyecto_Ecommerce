import Carousel from "../../components/layout/carrousel/carrousel";
import Footer from "../../components/layout/footer/footer";
import Header from "../../components/layout/header/header";
import ProductCards from "../../components/productos/productosCard";
import { CartProvider } from "../../context/cardContext";
import "../../styles/global.css";

export default function HeaderPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4">
          <Carousel />
          <ProductCards />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
