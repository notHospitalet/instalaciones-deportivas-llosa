import { NextResponse } from "next/server"

// Simulación de una base de datos
const reservas: any[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validar datos
    if (!data.tipo || !data.fecha || !data.usuario) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 })
    }

    // Crear ID único
    const id = Date.now().toString()

    // Crear nueva reserva
    const nuevaReserva = {
      id,
      ...data,
      fechaCreacion: new Date().toISOString(),
      estado: "pendiente",
    }

    // Guardar en la "base de datos"
    reservas.push(nuevaReserva)

    return NextResponse.json({ mensaje: "Reserva creada con éxito", id, reserva: nuevaReserva }, { status: 201 })
  } catch (error) {
    console.error("Error al procesar la reserva:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  // Obtener parámetros de consulta
  const { searchParams } = new URL(request.url)
  const tipo = searchParams.get("tipo")
  const fecha = searchParams.get("fecha")

  // Filtrar reservas según parámetros
  let resultados = [...reservas]

  if (tipo) {
    resultados = resultados.filter((r) => r.tipo === tipo)
  }

  if (fecha) {
    resultados = resultados.filter((r) => r.fecha.startsWith(fecha))
  }

  return NextResponse.json({ reservas: resultados })
}

