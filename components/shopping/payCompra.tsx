import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useCart } from "../../context/cardContext";
import router from "next/router";
import { CartItem } from "../../interface/types";

const PayCart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [formData, setFormData] = useState({
    giftcard: "",
    cardNumber: "",
    installments: "",
    cardholderName: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    department: "",
    province: "",
    district: "",
    street: "",
    number: "",
    apartment: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayPalSelect = () => {
    setPaymentMethod("paypal");
    window.location.href = "https://www.paypal.com/checkout";
  };

  const handleCardSelect = () => {
    setPaymentMethod("card");
  };

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handlePaymentCompletion = () => {
    router.push("/compras");
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
            <span className="bg-gray-500 text-white rounded-full px-3 py-1">
              Carrito
            </span>
            <span className="bg-gray-500 text-white rounded-full px-3 py-1">
              Identificación
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
              Pago
            </span>
            <span className="text-gray-500">Confirmación</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  3
                </span>
                Pago
              </h2>

              <div className="mb-4 bg-gray-700 text-white p-3 rounded flex justify-between items-center">
                <span>Tarjeta Crédito y Débito</span>
                <div className="flex space-x-2">
                  <Image
                    src="/visa.png"
                    alt="Visa"
                    width={20}
                    height={10}
                    onClick={() => setPaymentMethod("card")}
                  />
                  <Image
                    src="/mastercard.png"
                    alt="Mastercard"
                    width={20}
                    height={10}
                    onClick={() => setPaymentMethod("card")}
                  />
                  <Image
                    src="/diners.png"
                    alt="Diners Club"
                    width={20}
                    height={10}
                    onClick={() => setPaymentMethod("card")}
                  />
                  <Image
                    src="/american.png"
                    alt="American Express"
                    width={20}
                    height={10}
                    onClick={() => setPaymentMethod("card")}
                  />
                  <Image
                    src="/Paypal.png"
                    alt="PayPal"
                    width={20}
                    height={10}
                    onClick={() => setPaymentMethod("paypal")} // Seleccionar PayPal
                  />
                </div>
              </div>
              {paymentMethod === "card" ? (
                <form>
                  <div className="mb-4">
                    <label className="block mb-2">Número</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Cuotas disponibles:</label>
                    <select
                      name="installments"
                      value={formData.installments}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">¿En cuántas cuotas deseas pagar?</option>
                      <option value="1">1 cuota</option>
                      <option value="3">3 cuotas</option>
                      <option value="6">6 cuotas</option>
                      <option value="12">12 cuotas</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">
                      Nombre y Apellido como figura en la tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                      <label className="block mb-2">Fecha de Vencimiento</label>
                      <div className="flex space-x-2">
                        <select
                          name="expirationMonth"
                          value={formData.expirationMonth}
                          onChange={handleInputChange}
                          className="w-1/2 p-2 border border-gray-300 rounded"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month.toString().padStart(2, "0")}
                              </option>
                            )
                          )}
                        </select>
                        <select
                          name="expirationYear"
                          value={formData.expirationYear}
                          onChange={handleInputChange}
                          className="w-1/2 p-2 border border-gray-300 rounded"
                        >
                          <option value="">AA</option>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() + i
                          ).map((year) => (
                            <option
                              key={year}
                              value={year.toString().slice(-2)}
                            >
                              {year.toString().slice(-2)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block mb-2">
                        Código de Seguridad (CVV)
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">
                    Dirección de facturación
                  </h3>

                  <div className="mb-4">
                    <label className="block mb-2">Departamento *</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">Seleccione un departamento</option>
                      {/* Add department options here */}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Provincia *</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">Seleccione una provincia</option>
                      {/* Add province options here */}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Distrito *</label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">Seleccione un distrito</option>
                      {/* Add district options here */}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Calle *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Número *</label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">
                      Piso o Departamento (ej: 2A)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Opcional"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded">
                  <p className="text-xl font-bold mb-4">Pagar con PayPal</p>
                  <Image
                    src="/paypal.png"
                    alt="PayPal"
                    width={100}
                    height={50}
                  />

                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handlePaymentCompletion}
                  >
                    Completar Pago
                  </button>
                </div>
              )}
            </div>
            <div className="md:w-2/7">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Resumen de la compra</h2>
                  <a href="/principal" className="text-blue-500 text-sm">
                    Volver a carrito
                  </a>
                </div>
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center mb-4">
                    <Image
                      src={item.image || "/placeholder-image.png"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover"
                      priority
                    />
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="font-semibold">
                        {" "}
                        s/ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
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
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
              </div>
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

export default PayCart;
