"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { BackButton } from "@/components/ui/back-button"
import { SectionContainer } from "@/components/ui/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Info, CheckCircle2, CreditCard, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReservasDeportivas() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")
  const [duration, setDuration] = useState<string>("1")
  const [sport, setSport] = useState<string>("")
  const [isLocal, setIsLocal] = useState<string>("local")
  const [needsLight, setNeedsLight] = useState<string>("no")
  const [price, setPrice] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmationStep, setConfirmationStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [reservationComplete, setReservationComplete] = useState(false)
  const [reservationCode, setReservationCode] = useState<string>("")
  const [priceBreakdown, setPriceBreakdown] = useState<{
    basePrice: number
    hours: number
    total: number
    isGratis: boolean
  }>({
    basePrice: 0,
    hours: 1,
    total: 0,
    isGratis: false,
  })

  // Calcular precio cada vez que cambian las selecciones relevantes
  useEffect(() => {
    calculatePrice()
  }, [sport, isLocal, needsLight, duration])

  const calculatePrice = () => {
    if (!sport || !isLocal || !needsLight || !duration) {
      setPrice(null)
      setPriceBreakdown({
        basePrice: 0,
        hours: Number.parseInt(duration || "1"),
        total: 0,
        isGratis: false,
      })
      return
    }

    const hours = Number.parseInt(duration)
    let basePrice = 0
    let isGratis = false

    if (isLocal === "local") {
      if (needsLight === "no") {
        // Locales sin luz: gratis
        basePrice = 0
        isGratis = true
      } else {
        // Locales con luz
        if (sport === "futbol") {
          basePrice = 10 // Fútbol: 10€/hora
        } else {
          basePrice = 4 // Pádel, frontón, fútbol sala: 4€/hora
        }
      }
    } else {
      // No locales
      if (needsLight === "no") {
        if (sport === "futbol") {
          basePrice = 15 // Fútbol: 15€/hora
        } else {
          basePrice = 4 // Pádel, frontón, fútbol sala: 4€/hora
        }
      } else {
        if (sport === "futbol") {
          basePrice = 30 // Fútbol: 30€/hora
        } else {
          basePrice = 8 // Pádel, frontón, fútbol sala: 8€/hora
        }
      }
    }

    const totalPrice = basePrice * hours

    setPrice(totalPrice)
    setPriceBreakdown({
      basePrice,
      hours,
      total: totalPrice,
      isGratis,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time || !sport) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    // Mostrar diálogo de confirmación
    setShowConfirmDialog(true)
    setConfirmationStep(1)
  }

  const getSportName = (sportCode: string) => {
    const sportNames: Record<string, string> = {
      padel: "Pádel",
      futbol: "Fútbol",
      "futbol-sala": "Fútbol Sala",
      fronton: "Frontón",
    }
    return sportNames[sportCode] || sportCode
  }

  const handleConfirmReservation = async () => {
    setConfirmationStep(2)
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Método de pago requerido",
        description: "Por favor, selecciona un método de pago para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulación de procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generar código de reserva aleatorio
      const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase()
      setReservationCode(randomCode)

      setConfirmationStep(3)
      setReservationComplete(true)

      toast({
        title: "Reserva confirmada",
        description: `Tu reserva ha sido confirmada con el código ${randomCode}.`,
      })
    } catch (error) {
      toast({
        title: "Error en el proceso de pago",
        description: "Ha ocurrido un error al procesar el pago. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeDialog = () => {
    if (reservationComplete) {
      // Resetear formulario si la reserva se completó
      setDate(undefined)
      setTime("")
      setDuration("1")
      setSport("")
      setPrice(null)
      setReservationComplete(false)
    }

    setShowConfirmDialog(false)
    setConfirmationStep(1)
    setPaymentMethod(null)
  }

  const renderPriceTable = () => {
    return (
      <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="font-semibold text-green-800 mb-3">Tabla de Precios</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Instalación
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Sin Luz
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Con Luz
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap" rowSpan={2}>
                  Residentes
                </td>
                <td className="px-4 py-2 whitespace-nowrap">Pádel, Frontón, Fútbol Sala</td>
                <td className="px-4 py-2 whitespace-nowrap font-medium text-green-600">Gratis</td>
                <td className="px-4 py-2 whitespace-nowrap">4€/hora</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">Fútbol</td>
                <td className="px-4 py-2 whitespace-nowrap font-medium text-green-600">Gratis</td>
                <td className="px-4 py-2 whitespace-nowrap">10€/hora</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap" rowSpan={2}>
                  No Residentes
                </td>
                <td className="px-4 py-2 whitespace-nowrap">Pádel, Frontón, Fútbol Sala</td>
                <td className="px-4 py-2 whitespace-nowrap">4€/hora</td>
                <td className="px-4 py-2 whitespace-nowrap">8€/hora</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">Fútbol</td>
                <td className="px-4 py-2 whitespace-nowrap">15€/hora</td>
                <td className="px-4 py-2 whitespace-nowrap">30€/hora</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <SectionContainer className="bg-green-50/50">
      <BackButton href="/" />

      <PageHeader
        title="Reservas Deportivas"
        description="Reserva nuestras instalaciones deportivas de forma rápida y sencilla."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Formulario de Reserva</CardTitle>
              <CardDescription>Completa todos los campos para realizar tu reserva</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="sport">Deporte</Label>
                  <Select value={sport} onValueChange={setSport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un deporte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="padel">Pádel</SelectItem>
                      <SelectItem value="futbol">Fútbol</SelectItem>
                      <SelectItem value="futbol-sala">Fútbol Sala</SelectItem>
                      <SelectItem value="fronton">Frontón</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>¿Eres residente de La Llosa?</Label>
                  <RadioGroup value={isLocal} onValueChange={setIsLocal}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local">Sí, soy residente</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-local" id="no-local" />
                      <Label htmlFor="no-local">No soy residente</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>¿Necesitas iluminación?</Label>
                  <RadioGroup value={needsLight} onValueChange={setNeedsLight}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="light-yes" />
                      <Label htmlFor="light-yes">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="light-no" />
                      <Label htmlFor="light-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Fecha de reserva</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={es}
                        className="rounded-md border"
                        disabled={(date) => {
                          // Deshabilitar fechas pasadas
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return date < today
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora de inicio</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="13:00">13:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                      <SelectItem value="18:00">18:00</SelectItem>
                      <SelectItem value="19:00">19:00</SelectItem>
                      <SelectItem value="20:00">20:00</SelectItem>
                      <SelectItem value="21:00">21:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (horas)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hora</SelectItem>
                      <SelectItem value="2">2 horas</SelectItem>
                      <SelectItem value="3">3 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {price !== null && (
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-green-800">Resumen de Precio</h3>
                      {priceBreakdown.isGratis && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Gratis para residentes
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Precio base:</span>
                        <span>
                          {priceBreakdown.isGratis ? "Gratis" : `${priceBreakdown.basePrice.toFixed(2)} €/hora`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duración:</span>
                        <span>
                          {priceBreakdown.hours} {priceBreakdown.hours === 1 ? "hora" : "horas"}
                        </span>
                      </div>
                      {!priceBreakdown.isGratis && (
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>
                            {priceBreakdown.basePrice.toFixed(2)} € × {priceBreakdown.hours} ={" "}
                            {priceBreakdown.total.toFixed(2)} €
                          </span>
                        </div>
                      )}
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span className="text-green-700">
                          {priceBreakdown.isGratis ? "GRATIS" : `${priceBreakdown.total.toFixed(2)} €`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!date || !time || !sport || isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {renderPriceTable()}
        </div>

        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Información de Precios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-800 border-b pb-2">Residentes de La Llosa</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center py-1 border-b border-dashed border-gray-100">
                      <span>Sin iluminación:</span>
                      <span className="font-medium text-green-600">Gratis</span>
                    </li>
                    <li className="flex justify-between items-center py-1 border-b border-dashed border-gray-100">
                      <span>Con iluminación (Pádel, Frontón, Fútbol Sala):</span>
                      <span className="font-medium">4€/hora</span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span>Con iluminación (Fútbol):</span>
                      <span className="font-medium">10€/hora</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-green-800 border-b pb-2">No Residentes</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center py-1 border-b border-dashed border-gray-100">
                      <span>Sin iluminación (Pádel, Frontón, Fútbol Sala):</span>
                      <span className="font-medium">4€/hora</span>
                    </li>
                    <li className="flex justify-between items-center py-1 border-b border-dashed border-gray-100">
                      <span>Sin iluminación (Fútbol):</span>
                      <span className="font-medium">15€/hora</span>
                    </li>
                    <li className="flex justify-between items-center py-1 border-b border-dashed border-gray-100">
                      <span>Con iluminación (Pádel, Frontón, Fútbol Sala):</span>
                      <span className="font-medium">8€/hora</span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span>Con iluminación (Fútbol):</span>
                      <span className="font-medium">30€/hora</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Instalaciones deportivas"
              width={500}
              height={300}
              className="w-full h-auto"
            />
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Normas de Uso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="inline-flex h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    1
                  </span>
                  <span>Las reservas deben realizarse con al menos 24 horas de antelación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    2
                  </span>
                  <span>En caso de cancelación, se debe avisar con 12 horas de antelación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    3
                  </span>
                  <span>Es obligatorio el uso de calzado deportivo adecuado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    4
                  </span>
                  <span>El tiempo máximo de reserva es de 3 horas consecutivas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    5
                  </span>
                  <span>Se ruega puntualidad para no afectar a otras reservas.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {confirmationStep === 1 && "Confirmar Reserva"}
              {confirmationStep === 2 && "Método de Pago"}
              {confirmationStep === 3 && "Reserva Completada"}
            </DialogTitle>
            <DialogDescription>
              {confirmationStep === 1 && "Revisa los detalles de tu reserva antes de continuar."}
              {confirmationStep === 2 && "Selecciona un método de pago para completar tu reserva."}
              {confirmationStep === 3 && "¡Tu reserva ha sido confirmada con éxito!"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 mb-4">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(confirmationStep / 3) * 100}%` }}
              ></div>
            </div>

            {confirmationStep === 1 && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Detalles de la Reserva</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Instalación:</span>
                      <span className="font-medium">{getSportName(sport)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">{date ? format(date, "PPP", { locale: es }) : ""}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-medium">{time}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium">
                        {duration} {Number.parseInt(duration) === 1 ? "hora" : "horas"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Iluminación:</span>
                      <span className="font-medium">{needsLight === "si" ? "Sí" : "No"}</span>
                    </li>
                    <Separator className="my-2" />
                    <li className="flex justify-between font-medium">
                      <span>Precio Total:</span>
                      <span className="text-green-700">
                        {priceBreakdown.isGratis ? "GRATIS" : `${priceBreakdown.total.toFixed(2)} €`}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Al confirmar, aceptas las normas de uso de las instalaciones deportivas municipales.
                  </p>
                </div>
              </div>
            )}

            {confirmationStep === 2 && (
              <div className="space-y-4">
                <div className="bg-green-50 p-3 rounded-md flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">Reserva confirmada. Selecciona un método de pago.</p>
                </div>

                {!priceBreakdown.isGratis ? (
                  <div className="space-y-3">
                    <h3 className="font-medium">Método de pago</h3>
                    <RadioGroup value={paymentMethod || ""} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="tarjeta" id="tarjeta" />
                        <Label htmlFor="tarjeta" className="flex items-center gap-2 cursor-pointer w-full">
                          <CreditCard className="h-5 w-5 text-gray-600" />
                          <span>Tarjeta de crédito/débito</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="transferencia" id="transferencia" />
                        <Label htmlFor="transferencia" className="flex items-center gap-2 cursor-pointer w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                          >
                            <path d="M16 4H9a3 3 0 0 0-2.83 4"></path>
                            <path d="M8 20h7a3 3 0 0 0 2.83-4"></path>
                            <circle cx="4" cy="8" r="2"></circle>
                            <circle cx="20" cy="16" r="2"></circle>
                            <path d="m4 10 8 6 8-6"></path>
                          </svg>
                          <span>Transferencia bancaria</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="efectivo" id="efectivo" />
                        <Label htmlFor="efectivo" className="flex items-center gap-2 cursor-pointer w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                          >
                            <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                            <circle cx="12" cy="12" r="2"></circle>
                            <path d="M6 12h.01M18 12h.01"></path>
                          </svg>
                          <span>Pago en efectivo</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "tarjeta" && (
                      <div className="mt-4 space-y-3 p-3 border rounded-md">
                        <div className="space-y-1">
                          <Label htmlFor="card-number">Número de tarjeta</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="expiry">Fecha de caducidad</Label>
                            <Input id="expiry" placeholder="MM/AA" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="name">Nombre del titular</Label>
                          <Input id="name" placeholder="Nombre completo" />
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox id="save-card" />
                          <label htmlFor="save-card" className="text-sm text-gray-600 cursor-pointer">
                            Guardar tarjeta para futuras reservas
                          </label>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "transferencia" && (
                      <div className="mt-4 p-3 border rounded-md space-y-2">
                        <p className="text-sm font-medium">Datos bancarios:</p>
                        <p className="text-sm">IBAN: ES12 3456 7890 1234 5678 9012</p>
                        <p className="text-sm">Beneficiario: Ayuntamiento de La Llosa</p>
                        <p className="text-sm">
                          Concepto: Reserva {getSportName(sport)} -{" "}
                          {date ? format(date, "dd/MM/yyyy", { locale: es }) : ""}
                        </p>
                        <div className="flex items-start gap-2 mt-2 bg-amber-50 p-2 rounded-md">
                          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-amber-800">
                            Deberás enviar el justificante de pago a deportes@lalosa.es en las próximas 24 horas para
                            confirmar tu reserva.
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "efectivo" && (
                      <div className="mt-4 p-3 border rounded-md space-y-2">
                        <p className="text-sm">Podrás realizar el pago en efectivo en las oficinas municipales:</p>
                        <p className="text-sm font-medium">Ayuntamiento de La Llosa</p>
                        <p className="text-sm">Plaza España, 14, 12591 La Llosa, Castellón</p>
                        <p className="text-sm">Horario: Lunes a Viernes de 9:00 a 14:00</p>
                        <div className="flex items-start gap-2 mt-2 bg-amber-50 p-2 rounded-md">
                          <Clock className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-amber-800">
                            El pago debe realizarse al menos 24 horas antes de la fecha de reserva.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-100 p-4 rounded-md text-center">
                    <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-green-800 text-lg">¡Reserva gratuita!</h3>
                    <p className="text-green-700 mt-1">
                      Tu reserva es gratuita por ser residente sin uso de iluminación.
                    </p>
                    <p className="text-sm text-green-600 mt-3">Pulsa "Completar Reserva" para confirmar.</p>
                  </div>
                )}
              </div>
            )}

            {confirmationStep === 3 && (
              <div className="text-center space-y-4">
                <div className="bg-green-100 p-6 rounded-lg">
                  <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 text-xl mb-2">¡Reserva Confirmada!</h3>
                  <p className="text-green-700">Tu reserva ha sido procesada correctamente.</p>

                  <div className="mt-4 p-3 bg-white rounded-md">
                    <p className="text-sm text-gray-500 mb-1">Código de reserva:</p>
                    <p className="text-lg font-mono font-bold tracking-wider">{reservationCode}</p>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <h4 className="font-medium">Detalles de la reserva:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Instalación:</span>
                      <span className="font-medium">{getSportName(sport)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">{date ? format(date, "PPP", { locale: es }) : ""}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-medium">{time}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium">
                        {duration} {Number.parseInt(duration) === 1 ? "hora" : "horas"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md text-left">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800">
                      Se ha enviado un correo electrónico con los detalles de tu reserva.
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      Recuerda presentar tu código de reserva el día de la actividad.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row sm:justify-between">
            {confirmationStep === 1 && (
              <>
                <Button variant="outline" onClick={closeDialog}>
                  Cancelar
                </Button>
                <Button onClick={handleConfirmReservation} className="bg-green-600 hover:bg-green-700">
                  Continuar
                </Button>
              </>
            )}

            {confirmationStep === 2 && (
              <>
                <Button variant="outline" onClick={() => setConfirmationStep(1)}>
                  Volver
                </Button>
                <Button
                  onClick={handlePayment}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!priceBreakdown.isGratis && !paymentMethod}
                >
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
                      Procesando...
                    </span>
                  ) : priceBreakdown.isGratis ? (
                    "Completar Reserva"
                  ) : (
                    "Realizar Pago"
                  )}
                </Button>
              </>
            )}

            {confirmationStep === 3 && (
              <Button onClick={closeDialog} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                Finalizar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SectionContainer>
  )
}

