import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white/10">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="La Llosa Logo"
                  width={48}
                  height={48}
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ayuntamiento de La Llosa</h3>
                <p className="text-green-200 text-sm">Servicios Deportivos Municipales</p>
              </div>
            </div>
            <p className="text-green-100 mb-4 text-sm">
              Ofrecemos instalaciones deportivas de calidad para todos los vecinos y visitantes de La Llosa.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white hover:text-green-200 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-green-200 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-green-200 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Enlaces Rápidos</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-green-100 hover:text-white transition-colors py-1">
                Inicio
              </Link>
              <Link href="/reservas-deportivas" className="text-green-100 hover:text-white transition-colors py-1">
                Deportes
              </Link>
              <Link href="/reservas-gimnasio" className="text-green-100 hover:text-white transition-colors py-1">
                Gimnasio
              </Link>
              <Link href="/reservas-piscina" className="text-green-100 hover:text-white transition-colors py-1">
                Piscina
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors py-1">
                Contacto
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors py-1">
                Ayuntamiento
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors py-1">
                Noticias
              </Link>
              <Link href="#" className="text-green-100 hover:text-white transition-colors py-1">
                Eventos
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-green-100">Plaza España, 14, 12591 La Llosa, Castellón</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-300 flex-shrink-0" />
                <p className="text-green-100">96 261 05 42</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-300 flex-shrink-0" />
                <p className="text-green-100">info@lalosa.es</p>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-green-200 mb-1">Horario de Atención</h4>
                <p className="text-green-100 text-sm">Lunes a Viernes: 9:00 - 14:00</p>
                <p className="text-green-100 text-sm">Sábados y Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-green-200 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Ayuntamiento de La Llosa. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-green-200 hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-green-200 hover:text-white transition-colors">
              Aviso Legal
            </Link>
            <Link href="#" className="text-green-200 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

