"use client";

import { useState, useEffect } from "react";
import { Truck, Package, ShoppingBag, CheckCircle } from "lucide-react";
import styles from "./ConfirmacionCompraAnimada.module.css";
import { useRouter } from "next/router";

export default function ConfirmacionPedidoAnimadaLenta() {
  const [stage, setStage] = useState<
    "initial" | "approaching" | "loading" | "loaded" | "moving" | "completed"
  >("initial");
  const router = useRouter();
  useEffect(() => {
    const timer1 = setTimeout(() => setStage("approaching"), 1000);
    const timer2 = setTimeout(() => setStage("loading"), 3000);
    const timer3 = setTimeout(() => setStage("loaded"), 5000);
    const timer4 = setTimeout(() => setStage("moving"), 7000);
    const timer5 = setTimeout(() => setStage("completed"), 11000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);
  const handleContinueShopping = () => {
    router.push("/principal");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-yellow-500 to-green-600 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-32">
        <div
          className={`absolute transition-all duration-[4000ms] ease-in-out flex items-center
            ${
              stage === "approaching"
                ? "left-0"
                : stage === "moving"
                ? "left-[100vw]"
                : "left-[-20vw]"
            }`}
        >
          <Truck size={128} className="text-white" />

          <div
            className={`absolute left-16 bottom-8 transition-all duration-2000 ease-in-out
            ${
              stage === "loading"
                ? "translate-y-[-32px] translate-x-[-16px]"
                : stage === "loaded" || stage === "moving"
                ? "translate-y-[-32px] translate-x-[-32px] opacity-0"
                : "translate-y-0 translate-x-0"
            }`}
          >
            <ShoppingBag size={32} className="text-yellow-300" />
          </div>
        </div>
      </div>

      <div
        className={`absolute left-1/2 bottom-1/4 transition-all duration-1000 ease-in-out
        ${stage === "approaching" ? "opacity-100" : "opacity-0"}`}
      >
        <ShoppingBag size={32} className="text-yellow-300" />
      </div>

      {stage === "completed" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CheckCircle
            size={64}
            className="text-green-500 mb-4 animate-bounce"
          />
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-300 to-pink-300 animate-fade-in-slow">
            ¡Pedido creado con éxito! Gracias por preferir nuestra tienda
          </p>
          <button
            onClick={handleContinueShopping}
            className="mt-6 px-4 py-2 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            ¿Desea seguir comprando?
          </button>
        </div>
      )}
    </div>
  );
}
