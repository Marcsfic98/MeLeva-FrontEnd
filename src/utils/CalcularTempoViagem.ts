// src/utils/calcularTempoViagem.ts

export function calcularTempoViagem(
  distanciaKm: number,
  velocidadeKmH: number,
) {
  if (distanciaKm <= 0 || velocidadeKmH <= 0) {
    throw new Error("Distância e velocidade devem ser maiores que zero.");
  }

  const totalHoras = distanciaKm / velocidadeKmH; // ex: 250 km / 80 km/h = 3.125 h

  const horas = Math.floor(totalHoras);
  let minutos = Math.round((totalHoras - horas) * 60);

  // Ajuste caso arredonde para 60 min
  let horasAjustadas = horas;
  if (minutos === 60) {
    horasAjustadas += 1;
    minutos = 0;
  }

  return {
    horas: horasAjustadas,
    minutos,
    totalHoras, // se quiser mostrar com decimal (ex: 3.1 h)
  };
}