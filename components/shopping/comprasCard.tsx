import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "../../context/cardContext";
import { CartItem } from "../../interface/types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mi carrito</h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          {cartItems.map((item: CartItem) => (
            <div key={item.id} className="flex items-center mb-4">
              <Image
                src={item.image || "/placeholder-image.png"}
                alt={item.name}
                width={50}
                height={50}
                className="mr-4"
                priority
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>S/ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-semibold">Subtotal: S/ {subtotal.toFixed(2)}</p>
            <p className="font-bold text-lg">Total: S/ {subtotal.toFixed(2)}</p>
          </div>
          <div className="mt-4 space-y-2">
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded">
              Ir a mi carrito
            </button>
            <button className="w-full bg-yellow-500 text-white py-2 rounded">
              <a href="/productos"> Comprar ahora</a>
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
