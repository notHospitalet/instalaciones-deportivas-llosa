"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { BackButton } from "@/components/ui/back-button"
import { SectionContainer } from "@/components/ui/section-container"
import { PriceCard } from "@/components/ui/price-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

export default function ReservasGimnasio() {
  const [userType, setUserType] = useState<string>("local")
  const [userCategory, setUserCategory] = useState<string>("regular")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReservation = async () => {
    if (!selectedOption) return

    setIsSubmitting(true)

    try {
      // Simulación de envío a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Solicitud procesada con éxito",
        description: "Tu solicitud ha sido registrada. Recibirás un correo con las instrucciones de pago.",
      })

      // Resetear selección
      setSelectedOption(null)
    } catch (error) {
      toast({
        title: "Error al procesar la solicitud",
        description: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionContainer className="bg-green-50/50">
      <BackButton href="/" />

      <PageHeader
        title="Gimnasio Municipal"
        description="Accede a nuestro gimnasio con las mejores tarifas para residentes."
      />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Tipo de Usuario</CardTitle>
              <CardDescription>Selecciona tu categoría</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Residencia</Label>
                <RadioGroup value={userType} onValueChange={setUserType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="user-local" />
                    <Label htmlFor="user-local">Residente de La Llosa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-local" id="user-no-local" />
                    <Label htmlFor="user-no-local">No residente</Label>
                  </div>
                </RadioGroup>
              </div>

              {userType === "local" && (
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <RadioGroup value={userCategory} onValueChange={setUserCategory}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jubilado" id="jubilado" />
                      <Label htmlFor="jubilado">Jubilado/Pensionista</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular">Usuario regular</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Gimnasio Municipal"
                  width={300}
                  height={200}
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Información importante:</span> Para acceder a las tarifas de
                    residentes, deberás presentar un documento que acredite tu residencia en La Llosa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Tarifas del Gimnasio</CardTitle>
              <CardDescription>Selecciona la opción que mejor se adapte a tus necesidades</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diaria" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="diaria">Entrada Diaria</TabsTrigger>
                  <TabsTrigger value="mensual">Bono Mensual</TabsTrigger>
                  <TabsTrigger value="trimestral">Bono Trimestral</TabsTrigger>
                </TabsList>

                <TabsContent value="diaria" className="space-y-4">
                  {userType === "local" && userCategory === "jubilado" && (
                    <PriceCard
                      title="Entrada Diaria - Jubilados/Pensionistas"
                      description="Lunes a Viernes"
                      price="1,00 €"
                      isSelected={selectedOption === "diaria-jubilado-local"}
                      onClick={() => setSelectedOption("diaria-jubilado-local")}
                    />
                  )}

                  {userType === "local" && userCategory === "regular" && (
                    <PriceCard
                      title="Entrada Diaria - Usuarios Locales"
                      description="Lunes a Viernes"
                      price="2,00 €"
                      isSelected={selectedOption === "diaria-regular-local"}
                      onClick={() => setSelectedOption("diaria-regular-local")}
                    />
                  )}

                  {userType === "no-local" && (
                    <PriceCard
                      title="Entrada Diaria - No Residentes"
                      description="Lunes a Viernes"
                      price="2,50 €"
                      isSelected={selectedOption === "diaria-no-local"}
                      onClick={() => setSelectedOption("diaria-no-local")}
                    />
                  )}
                </TabsContent>

                <TabsContent value="mensual" className="space-y-4">
                  {userType === "local" && userCategory === "jubilado" && (
                    <PriceCard
                      title="Bono Mensual - Jubilados/Pensionistas"
                      description="Acceso ilimitado durante un mes"
                      price="6,00 €"
                      isSelected={selectedOption === "mensual-jubilado-local"}
                      onClick={() => setSelectedOption("mensual-jubilado-local")}
                    />
                  )}

                  {userType === "local" && userCategory === "regular" && (
                    <PriceCard
                      title="Bono Mensual - Usuarios Locales"
                      description="Acceso ilimitado durante un mes"
                      price="9,00 €"
                      isSelected={selectedOption === "mensual-regular-local"}
                      onClick={() => setSelectedOption("mensual-regular-local")}
                    />
                  )}

                  {userType === "no-local" && (
                    <PriceCard
                      title="Bono Mensual - No Residentes"
                      description="Acceso ilimitado durante un mes"
                      price="12,00 €"
                      isSelected={selectedOption === "mensual-no-local"}
                      onClick={() => setSelectedOption("mensual-no-local")}
                    />
                  )}
                </TabsContent>

                <TabsContent value="trimestral" className="space-y-4">
                  {userType === "local" && userCategory === "jubilado" && (
                    <PriceCard
                      title="Bono Trimestral - Jubilados/Pensionistas"
                      description="Acceso ilimitado durante tres meses"
                      price="15,00 €"
                      isSelected={selectedOption === "trimestral-jubilado-local"}
                      onClick={() => setSelectedOption("trimestral-jubilado-local")}
                    />
                  )}

                  {userType === "local" && userCategory === "regular" && (
                    <PriceCard
                      title="Bono Trimestral - Usuarios Locales"
                      description="Acceso ilimitado durante tres meses"
                      price="30,00 €"
                      isSelected={selectedOption === "trimestral-regular-local"}
                      onClick={() => setSelectedOption("trimestral-regular-local")}
                    />
                  )}

                  {userType === "no-local" && (
                    <PriceCard
                      title="Bono Trimestral - No Residentes"
                      description="Acceso ilimitado durante tres meses"
                      price="55,00 €"
                      isSelected={selectedOption === "trimestral-no-local"}
                      onClick={() => setSelectedOption("trimestral-no-local")}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleReservation}
                disabled={!selectedOption || isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Procesando..." : "Solicitar Pago"}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Horario del Gimnasio</h3>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-medium">Lunes a Viernes:</span> 9:00 - 21:00
                      </li>
                      <li>
                        <span className="font-medium">Sábados:</span> 10:00 - 14:00
                      </li>
                      <li>
                        <span className="font-medium">Domingos y Festivos:</span> Cerrado
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Normas de Uso</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Uso obligatorio de toalla</li>
                      <li>Calzado deportivo limpio</li>
                      <li>Prohibido acceder con comida</li>
                      <li>Respetar el material y a los demás usuarios</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

