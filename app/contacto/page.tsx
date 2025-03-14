"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "informacion",
    mensaje: "",
    aceptaPrivacidad: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, asunto: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, aceptaPrivacidad: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    if (!formData.aceptaPrivacidad) {
      toast({
        title: "Política de privacidad",
        description: "Debes aceptar la política de privacidad para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te responderemos lo antes posible.",
      })
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionContainer className="bg-green-50/50">
      <PageHeader title="Contacto" description="Ponte en contacto con nosotros para cualquier consulta o sugerencia." />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {!isSuccess ? (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Formulario de Contacto</CardTitle>
                <CardDescription>Rellena el formulario y te responderemos lo antes posible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">
                      Nombre completo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre y apellidos"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Correo electrónico <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Tu número de teléfono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Asunto <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup value={formData.asunto} onValueChange={handleRadioChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="informacion" id="informacion" />
                        <Label htmlFor="informacion">Información general</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reservas" id="reservas" />
                        <Label htmlFor="reservas">Consulta sobre reservas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="incidencia" id="incidencia" />
                        <Label htmlFor="incidencia">Reportar incidencia</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sugerencia" id="sugerencia" />
                        <Label htmlFor="sugerencia">Sugerencia</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">
                      Mensaje <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacidad"
                      checked={formData.aceptaPrivacidad}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label htmlFor="privacidad" className="text-sm text-gray-600 leading-tight cursor-pointer">
                      He leído y acepto la{" "}
                      <a href="#" className="text-green-700 hover:underline">
                        política de privacidad
                      </a>{" "}
                      y el tratamiento de mis datos personales.
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Enviar mensaje
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-green-100 p-6 rounded-lg inline-flex mx-auto">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-800">¡Mensaje enviado con éxito!</h2>
                  <p className="text-gray-600">
                    Gracias por contactar con nosotros. Hemos recibido tu mensaje y te responderemos lo antes posible.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({
                        nombre: "",
                        email: "",
                        telefono: "",
                        asunto: "informacion",
                        mensaje: "",
                        aceptaPrivacidad: false,
                      })
                    }}
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Puedes contactarnos por estos medios o visitarnos en persona.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Dirección</h3>
                  <p className="text-gray-600">Plaza España, 14, 12591 La Llosa, Castellón</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Teléfono</h3>
                  <p className="text-gray-600">96 261 05 42</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Correo electrónico</h3>
                  <p className="text-gray-600">info@lalosa.es</p>
                  <p className="text-gray-600">deportes@lalosa.es</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Horario de atención</h3>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 14:00</p>
                  <p className="text-gray-600">Sábados y Domingos: Cerrado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="h-[300px] w-full bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.5554123875224!2d-0.2204138!3d39.7700499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd60193d18a5c0c9%3A0x421c316d86ab9c06!2sAyuntamiento%20de%20La%20Llosa!5e0!3m2!1ses!2ses!4v1710414000000!5m2!1ses!2ses"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación del Ayuntamiento de La Llosa"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionContainer>
  )
}

