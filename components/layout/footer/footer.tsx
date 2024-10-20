export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Sobre El Proyecto EFRSTV
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Quiénes somos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trabaja con nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicio al cliente</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Métodos de pago</h3>
            {/* Add payment method icons here */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            {/* Add social media icons here */}
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2024 ProyectoEFRSTV. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
