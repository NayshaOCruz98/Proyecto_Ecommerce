import PayCart from "../../components/shopping/payCompra";
import { CartProvider } from "../../context/cardContext";
import "../../styles/global.css";
export default function DetallePage() {
  return (
    <CartProvider>
      <PayCart />
    </CartProvider>
  );
}
