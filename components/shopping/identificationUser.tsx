import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Trash2 } from "lucide-react";

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

const IdentificationCart: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "mayshortts5@gmail.com",
    documentType: "DNI",
    documentNumber: "",
    name: "",
    surname: "",
    phone: "",
    wantInvoice: false,
    saveData: true,
    receivePromotions: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
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
          />
          <div className="flex items-center space-x-4 text-sm">
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full">
              Carrito
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
              Identificación
            </span>
            <span className="text-gray-500">Pago</span>
            <span className="text-gray-500">Confirmación</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                1
              </span>
              Identificación
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Solicitamos únicamente la información esencial para la
              finalización de la compra.
            </p>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Correo:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex gap-4 mb-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de documento
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div className="w-2/3">
                  <label className="block text-sm font-medium text-gray-700">
                    Documento
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                  {/*!formData.name && (
                    <p className="text-red-500 text-xs mt-1">
                      Este campo es obligatorio
                    </p>
                  */}
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono / Móvil
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
              >
                Ir para al pago
              </button>
            </form>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Resumen de la compra</h2>
              <a href="#" className="text-blue-500 text-sm">
                Volver a carrito
              </a>
            </div>
            <div className="flex items-center mb-4">
              <Image
                src="/ibuprofeno.png"
                alt="Nordic Children's DHA Xtra Liquido"
                width={50}
                height={50}
                className="mr-4"
              />
              <div>
                <p className="text-sm">ibuprofeno</p>
                <p className="font-semibold">S/ 130.00</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Cupón de descuento</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Código"
                  className="flex-grow border rounded-l-lg px-4 py-2"
                />
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg">
                  Añadir
                </button>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>S/ 130.00</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Gastos del envío</span>
                <span>GRATIS</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>S/ 130.00</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 ProyectoEFRSTV. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default IdentificationCart;
