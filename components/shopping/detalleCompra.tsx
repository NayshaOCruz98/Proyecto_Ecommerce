import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useCart } from "../../context/cardContext";
import { CartItem } from "../../interface/types";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  package: string;
  isGeneric: boolean;
  brand: string;
}

const ShoppingCart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    router.push("/pay");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Image
            src="/cibertec-logo.png"
            alt="Cibertec"
            width={100}
            height={50}
            priority
          />
          <div className="flex items-center space-x-4 text-sm">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
              Carrito
            </span>
            <span className="text-gray-500">Identificación</span>
            <span className="text-gray-500">Entrega</span>

            <span className="text-gray-500">Confirmación</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <a href="/principal" className="flex items-center text-blue-500 mb-4">
            <ChevronLeft size={20} />
            <span>Continuar comprando</span>
          </a>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Producto</h2>
              <h2 className="font-semibold">Precio</h2>
            </div>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex items-center py-4 border-t">
                <div className="flex items-center space-x-4 flex-grow">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500"
                    >
                      +
                    </button>
                    <span className="my-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500"
                    >
                      -
                    </button>
                  </div>
                  <Image
                    src={item.image || "/placeholder-image.png"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover"
                    priority
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.specs}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">
                    s/ {item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">Cupón de descuento</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Código"
                className="flex-grow border rounded-l-lg px-4 py-2"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg">
                Añadir
              </button>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Gastos del envío</span>
                <span>GRATIS</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 ProyectoEFRSTV. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ShoppingCart;
