import ShoppingCart from "../../components/shopping/detalleCompra";
import IdentificationCart from "../../components/shopping/identificationUser";
import PayCart from "../../components/shopping/payCompra";
import { CartProvider } from "../../context/cardContext";
import "../../styles/global.css";
export default function DetallePage() {
  return (
    <CartProvider>
      <ShoppingCart />
    </CartProvider>
  );
}
