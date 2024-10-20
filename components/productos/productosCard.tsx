import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useCart } from "../../context/cardContext";
import { Product } from "../../interface/types";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-orange-500 font-bold">
            S/ {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through">
            Precio regular: S/ {product.regularPrice.toFixed(2)}
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
  const products: Product[] = [
    {
      id: 1,
      name: "Ibuprofeno",
      price: 292.54,
      regularPrice: 365.74,
      image: "/ibuprofeno.png",
      isNew: true,
    },
    {
      id: 2,
      name: "Metronidazol",
      price: 79.9,
      regularPrice: 99.9,
      image: "/Metronidazol.jpg",
      isNew: true,
    },
    {
      id: 3,
      name: "Paracetamol",
      price: 79.9,
      regularPrice: 99.9,
      image: "/paracetamol.jpg",
      isNew: true,
    },
  ];

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Tus Mejores medicamentos y productos
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
