import React, { useState } from "react";
import { Eye, EyeOff, User, X } from "lucide-react";
import axios from "axios"; // Importar Axios

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://ecommercespring-a9fthwekhac7f6b6.mexicocentral-01.azurewebsites.net/users/login/user",
        {
          username: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        onClose();
      } else {
        setErrorMessage(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2">
              <User className="mt-2 ml-1 mb-1" size={20} />
            </div>
            <h2 className="text-xl font-semibold">Iniciar sesión</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          className={`w-full p-2 rounded mb-4 ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleLogin}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
        <div className="mb-4">
          <p className="text-center text-gray-500 mb-2">
            Otras opciones para ingresar
          </p>
          <button className="w-full border border-gray-300 p-2 rounded mb-2 flex items-center justify-center">
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6 mr-2" />
            Ingresa con Facebook
          </button>
          <button className="w-full border border-gray-300 p-2 rounded mb-2 flex items-center justify-center">
            <img src="/google.jpg" alt="Google" className="w-6 h-6 mr-2" />
            Ingresa con Google
          </button>
          <button className="w-full border border-gray-300 p-2 rounded flex items-center justify-center">
            <img src="/correo.jpg" alt="Apple" className="w-6 h-6 mr-2" />
            Ingresa con Correo
          </button>
        </div>
        <a
          href="/register"
          className="text-blue-500 flex items-center justify-center hover:underline"
        >
          Registrarse
        </a>
      </div>
    </div>
  );
};

export default LoginModal;
