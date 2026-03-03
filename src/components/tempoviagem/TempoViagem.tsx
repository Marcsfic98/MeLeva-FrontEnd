// src/components/tempoviagem/TempoViagem.tsx
import { useState } from "react";
import { calcularTempoViagem } from "../../utils/CalcularTempoViagem";

export function TempoViagem() {
  const [distancia, setDistancia] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [resultado, setResultado] = useState("");
  const [erro, setErro] = useState("");

  function handleCalcular(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setResultado("");

    // Troca vírgula por ponto pra aceitar "80,5"
    const distanciaNum = Number(distancia.replace(",", "."));
    const velocidadeNum = Number(velocidade.replace(",", "."));

    if (isNaN(distanciaNum) || isNaN(velocidadeNum)) {
      setErro("Preencha distância e velocidade com números válidos.");
      return;
    }

    try {
      const { horas, minutos } = calcularTempoViagem(
        distanciaNum,
        velocidadeNum,
      );

      const partes: string[] = [];
      if (horas > 0) partes.push(`${horas}h`);
      if (minutos > 0) partes.push(`${minutos}min`);
      if (partes.length === 0) partes.push("menos de 1 minuto");

      setResultado(`Tempo estimado de viagem: ${partes.join(" e ")}`);
    } catch (error) {
      setErro((error as Error).message);
    }
  }

  return (
    <div className="mt-10 bg-white shadow-md rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-cyan-900 mb-4">
        Calcule aqui o tempo da sua viagem!
      </h2>

      <form
        onSubmit={handleCalcular}
        className="flex flex-col md:flex-row gap-4 items-stretch"
      >
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm text-cyan-900">Distância (km)</label>
          <input
            type="text"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            placeholder="Ex.: 250"
            className="border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm text-cyan-900">Velocidade média (km/h)</label>
          <input
            type="text"
            value={velocidade}
            onChange={(e) => setVelocidade(e.target.value)}
            placeholder="Ex.: 80"
            className="border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          className="md:self-end w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-3xl mt-2 md:mt-0"
        >
          Calcular
        </button>
      </form>

      {erro && <p className="mt-3 text-red-600 text-sm">{erro}</p>}

      {resultado && (
        <p className="mt-3 text-cyan-900 font-medium">{resultado}</p>
      )}
    </div>
  );
}