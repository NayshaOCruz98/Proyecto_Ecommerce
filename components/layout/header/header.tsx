import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "../../../context/cardContext";
import CartSidebar from "../../shopping/comprasCard";
import LoginModal from "../../login/login";

const suggestedProducts = [
  {
    id: 1,
    name: "Ibuprofeno 800 mg",
    package: "CAJA 100 UN",
    price: 20.0,
    isGeneric: true,
    image: "/ibuprofeno.png",
  },
  {
    id: 2,
    name: "Metronidazol",
    package: "CAJA 100 UN",
    price: 10.0,
    isGeneric: true,
    image: "/Metronidazol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    package: "FRASCO 120 ML",
    price: 4.5,
    isGeneric: true,
    image: "/paracetamol.jpg",
  },
  {
    id: 4,
    name: "Ibuprofeno 400mg Tableta recubierta",
    package: "CAJA 100 UN",
    price: 12.0,
    isGeneric: true,
    image: "/ibuprofeno.png",
  },
];

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleProductClick = (productName: string) => {
    setSearchTerm(productName);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Image
            src="/cibertec-logo.png"
            alt="cibertec"
            width={60}
            height={40}
            priority
          />
        </div>
        <div className="flex-1 mx-4 relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Busca una marca o producto"
              className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Productos sugeridos
                </h3>
                {suggestedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleProductClick(product.name)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.package}</p>
                      <div className="flex items-center mt-1">
                        {product.isGeneric && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2 py-0.5 rounded">
                            Genérico
                          </span>
                        )}
                        <span className="text-sm font-semibold">
                          S/ {product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-purple-600 mt-2 hover:underline">
                  Mostrar todos los resultados
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center text-sm text-gray-600"
            onClick={() => setIsLoginModalOpen(true)}
          >
            <User className="mr-1" size={18} />
            Inicio sesión
          </button>
          <button
            className="flex items-center text-sm text-gray-600"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="mr-1" size={18} />
            <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}
