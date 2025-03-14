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

export default function ReservasPiscina() {
  const [userType, setUserType] = useState<string>("local")
  const [userCategory, setUserCategory] = useState<string>("adulto")
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
        title="Piscina Municipal"
        description="Disfruta de nuestra piscina municipal con las mejores tarifas y cursos de natación."
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

              <div className="space-y-2">
                <Label>Categoría</Label>
                <RadioGroup value={userCategory} onValueChange={setUserCategory}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="infantil-0-3" id="infantil-0-3" />
                    <Label htmlFor="infantil-0-3">Niños (0-3 años)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="infantil-3-12" id="infantil-3-12" />
                    <Label htmlFor="infantil-3-12">Niños (3-12 años)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adulto" id="adulto" />
                    <Label htmlFor="adulto">Adulto ({">"}12 años)</Label>
                  </div>
                  {userType === "local" && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jubilado" id="jubilado" />
                      <Label htmlFor="jubilado">Jubilado/Pensionista</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>

              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Piscina Municipal"
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
              <CardTitle>Tarifas de la Piscina</CardTitle>
              <CardDescription>Selecciona la opción que mejor se adapte a tus necesidades</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="entrada" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="entrada">Entrada Individual</TabsTrigger>
                  <TabsTrigger value="bonos">Bonos</TabsTrigger>
                  <TabsTrigger value="cursos">Cursos de Natación</TabsTrigger>
                </TabsList>

                <TabsContent value="entrada" className="space-y-4">
                  {userCategory === "infantil-0-3" && (
                    <PriceCard
                      title="Entrada Individual - Niños (0-3 años)"
                      description="Acceso diario a la piscina"
                      price="Gratis"
                      isSelected={selectedOption === "entrada-infantil-0-3"}
                      onClick={() => setSelectedOption("entrada-infantil-0-3")}
                    />
                  )}

                  {userCategory === "infantil-3-12" || userCategory === "adulto" || userCategory === "jubilado" ? (
                    <PriceCard
                      title={`Entrada Individual - ${userCategory === "infantil-3-12" ? "Niños (>3 años)" : userCategory === "adulto" ? "Adultos" : "Jubilados"}`}
                      description="Acceso diario a la piscina"
                      price={userType === "local" ? "1,50 €" : "3,00 €"}
                      isSelected={selectedOption === "entrada-individual"}
                      onClick={() => setSelectedOption("entrada-individual")}
                    />
                  ) : null}
                </TabsContent>

                <TabsContent value="bonos" className="space-y-4">
                  <PriceCard
                    title="Bono Mensual"
                    description="Acceso ilimitado durante un mes"
                    price={userType === "local" ? "25,00 €" : "50,00 €"}
                    isSelected={selectedOption === "bono-mensual"}
                    onClick={() => setSelectedOption("bono-mensual")}
                  />

                  {userType === "local" && (
                    <PriceCard
                      title="Bono Familiar (mín. 3 personas)"
                      description="Acceso ilimitado para toda la familia durante un mes"
                      price="75,00 €"
                      isSelected={selectedOption === "bono-familiar"}
                      onClick={() => setSelectedOption("bono-familiar")}
                    />
                  )}

                  <PriceCard
                    title="Bono Temporada"
                    description="Acceso ilimitado durante toda la temporada de verano"
                    price={userType === "local" ? "60,00 €" : "100,00 €"}
                    isSelected={selectedOption === "bono-temporada"}
                    onClick={() => setSelectedOption("bono-temporada")}
                  />

                  <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Información importante:</span> Todos los bonos son personales e
                        intransferibles. La expedición de cada bono tiene un coste adicional de 2€.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cursos" className="space-y-4">
                  {userCategory === "jubilado" && userType === "local" && (
                    <PriceCard
                      title="Curso Natación Salud (Jubilados Locales)"
                      description="Curso mensual de natación terapéutica"
                      price="Gratis"
                      isSelected={selectedOption === "curso-natacion-jubilados"}
                      onClick={() => setSelectedOption("curso-natacion-jubilados")}
                    />
                  )}

                  {(userCategory === "adulto" || (userCategory === "jubilado" && userType === "no-local")) && (
                    <PriceCard
                      title="Curso Natación Salud"
                      description="Curso mensual de natación terapéutica"
                      price="40,00 €"
                      isSelected={selectedOption === "curso-natacion-adultos"}
                      onClick={() => setSelectedOption("curso-natacion-adultos")}
                    />
                  )}

                  {userCategory === "infantil-3-12" && (
                    <PriceCard
                      title="Curso Natación Infantil (3-12 años)"
                      description="Curso mensual de iniciación a la natación"
                      price="40,00 €"
                      isSelected={selectedOption === "curso-natacion-infantil"}
                      onClick={() => setSelectedOption("curso-natacion-infantil")}
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
                    <h3 className="font-semibold mb-2">Horario de la Piscina</h3>
                    <ul className="space-y-1">
                      <li>
                        <span className="font-medium">Lunes a Domingo:</span> 11:00 - 20:00
                      </li>
                      <li>
                        <span className="font-medium">Temporada:</span> Del 15 de junio al 15 de septiembre
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Normas de Uso</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Uso obligatorio de gorro de baño</li>
                      <li>Ducharse antes de entrar a la piscina</li>
                      <li>Los niños menores de 12 años deben estar acompañados por un adulto</li>
                      <li>Prohibido comer en la zona de baño</li>
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

