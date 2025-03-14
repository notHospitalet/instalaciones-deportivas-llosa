import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionContainer } from "@/components/ui/section-container"
import { ChevronRight, ArrowRight, Calendar, Dumbbell, PocketIcon as Pool, Trophy, Users, Clock } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=600&width=1600"
          alt="Instalaciones deportivas"
          width={1600}
          height={600}
          className="w-full h-[600px] object-cover"
          priority
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col items-start justify-center h-[600px] max-w-2xl">
            <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full mb-4 animate-fade-in">
              Ayuntamiento de La Llosa
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-slide-up">
              Servicios Deportivos Municipales
            </h1>
            <p className="text-lg text-white/90 mb-8 animate-slide-up-delay">
              Disfruta de nuestras instalaciones deportivas, gimnasio y piscina municipal con un sistema de reservas
              fácil y rápido.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up-delay-2">
              <Link href="/reservas-deportivas">
                <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all">
                  Reservar Ahora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#instalaciones">
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                >
                  Ver Instalaciones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <SectionContainer className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Servicios Destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia variedad de servicios deportivos para todos los vecinos y visitantes de La Llosa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-xl p-6 transition-transform hover:scale-105 duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-800">Reservas Online</h3>
            <p className="text-gray-600 mb-4">
              Sistema de reservas fácil y rápido para todas nuestras instalaciones deportivas.
            </p>
            <Link
              href="/reservas-deportivas"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
            >
              Reservar ahora
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-green-50 rounded-xl p-6 transition-transform hover:scale-105 duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Dumbbell className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-800">Gimnasio Municipal</h3>
            <p className="text-gray-600 mb-4">Equipamiento moderno para mantenerte en forma durante todo el año.</p>
            <Link
              href="/reservas-gimnasio"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
            >
              Ver tarifas
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-green-50 rounded-xl p-6 transition-transform hover:scale-105 duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Pool className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-800">Piscina Municipal</h3>
            <p className="text-gray-600 mb-4">Refréscate en nuestra piscina con cursos para todas las edades.</p>
            <Link
              href="/reservas-piscina"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
            >
              Ver horarios
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* Installations Section */}
      <SectionContainer id="instalaciones" className="bg-gray-50">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-2">
            Nuestras Instalaciones
          </span>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Espacios Deportivos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Disfruta de nuestras modernas instalaciones deportivas diseñadas para todos los niveles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
            <div className="relative overflow-hidden h-48">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Pista de Pádel"
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Pista de Pádel</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-green-800">Pista de Pádel</h3>
              <p className="text-gray-600 mb-4">Disfruta de nuestras modernas pistas de pádel con iluminación.</p>
              <Link href="/reservas-deportivas">
                <Button className="w-full bg-green-600 hover:bg-green-700">Reservar</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
            <div className="relative overflow-hidden h-48">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Campo de Fútbol"
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Campo de Fútbol</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-green-800">Campo de Fútbol</h3>
              <p className="text-gray-600 mb-4">Campo de fútbol con césped artificial e iluminación nocturna.</p>
              <Link href="/reservas-deportivas">
                <Button className="w-full bg-green-600 hover:bg-green-700">Reservar</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
            <div className="relative overflow-hidden h-48">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Gimnasio Municipal"
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Gimnasio Municipal</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-green-800">Gimnasio Municipal</h3>
              <p className="text-gray-600 mb-4">Equipamiento moderno para mantenerte en forma todo el año.</p>
              <Link href="/reservas-gimnasio">
                <Button className="w-full bg-green-600 hover:bg-green-700">Acceder</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
            <div className="relative overflow-hidden h-48">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Piscina Municipal"
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Piscina Municipal</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-green-800">Piscina Municipal</h3>
              <p className="text-gray-600 mb-4">Refréscate en nuestra piscina con cursos para todas las edades.</p>
              <Link href="/reservas-piscina">
                <Button className="w-full bg-green-600 hover:bg-green-700">Acceder</Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-2">
              Ventajas
            </span>
            <h2 className="text-3xl font-bold text-green-800 mb-6">¿Por qué elegir nuestras instalaciones?</h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Trophy className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-green-800">Calidad Garantizada</h3>
                  <p className="text-gray-600">
                    Nuestras instalaciones cumplen con los más altos estándares de calidad y mantenimiento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-green-800">Precios Accesibles</h3>
                  <p className="text-gray-600">
                    Tarifas especiales para residentes y diferentes opciones para todos los presupuestos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-green-800">Horarios Flexibles</h3>
                  <p className="text-gray-600">
                    Amplios horarios de apertura para que puedas practicar deporte cuando mejor te convenga.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/reservas-deportivas">
                <Button className="bg-green-600 hover:bg-green-700">
                  Reservar Ahora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-lg z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-lg z-0"></div>
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Instalaciones deportivas"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer className="bg-green-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar a disfrutar de nuestras instalaciones?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Reserva ahora y disfruta de todas nuestras instalaciones deportivas con los mejores precios para residentes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/reservas-deportivas">
              <Button className="bg-white text-green-700 hover:bg-green-50">Reservar Instalaciones</Button>
            </Link>
            <Link href="/reservas-gimnasio">
              <Button variant="outline" className="border-white text-white hover:bg-green-600">
                Ver Tarifas
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

