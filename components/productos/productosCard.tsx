import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useCart } from "../../context/cardContext";
import { Product } from "../../interface/types";
import { useEffect, useState } from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="mx-auto"
          priority
        />
      ) : (
        <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
          <span>Imagen no disponible</span>
        </div>
      )}
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="text-sm text-gray-500">
        Compatibilidad: {product.compatibility}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-orange-500 font-bold">
            S/ {product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        className="w-full bg-yellow-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition duration-300"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default function ProductCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Tus Mejores medicamentos y productos
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
      <a
        href="#"
        className="text-orange-500 hover:underline flex text-align: center;"
      >
        Ver más <ChevronRight size={20} />
      </a>
    </section>
  );
}
