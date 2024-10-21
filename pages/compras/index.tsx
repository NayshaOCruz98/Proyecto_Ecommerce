import ConfirmacionCompra from "../../components/shopping/confirmacionCompra";
import { CartProvider } from "../../context/cardContext";
import "../../styles/global.css";
export default function DetallePage() {
  return (
    <CartProvider>
      <ConfirmacionCompra />
    </CartProvider>
  );
}
