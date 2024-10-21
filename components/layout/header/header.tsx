import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, User2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "../../../context/cardContext";
import CartSidebar from "../../shopping/comprasCard";
import LoginModal from "../../login/login";
import { signOut, User } from "firebase/auth";
import { Product } from "../../../interface/types";
import { auth } from "../../firebase/firebase";

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
  const [userName, setUserName] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
    }

    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://ecommercespring-a9fthwekhac7f6b6.mexicocentral-01.azurewebsites.net/product/list//"
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        console.error("Error al obtener los productos:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredProducts([]);
      setShowSuggestions(false);
    }
  };

  const handleProductClick = (productName: string) => {
    setSearchTerm(productName);
    setShowSuggestions(false);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
        alert("Sesión cerrada.");
      })
      .catch((error: any) => {
        console.error("Error al cerrar sesión:", error);
      });
  };
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
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
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleProductClick(product.name)}
                  >
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-semibold">
                          S/ {product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No se encontraron productos
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hola,{user.email}</span>
              <button className="text-sm text-gray-600" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="flex items-center text-sm text-gray-600"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <User2 className="mr-1" size={18} />
              Inicio sesión
            </button>
          )}
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
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}
