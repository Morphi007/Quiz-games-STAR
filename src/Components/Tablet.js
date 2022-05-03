import React, { useEffect, useState } from "react";

import Preguntas from "./Preguntas";

const Tablet = () => {
  const [preguntAtual, setPreguntaAtual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);

  const handleAsweSubmit = (isCorrect, e) => {
    //añadir puntuacion
    if (isCorrect) setPuntuacion(puntuacion + 1);
    //añadir estilos de preguntas
    e.target.classList.add(isCorrect ? "bg-green-600" : "bg-red-600");
    //cambiar siguiente Preguntas
    setTimeout(() => {
      if (preguntAtual === Preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaAtual(preguntAtual + 1);
      }
    }, 500);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="container flex flex-row min-h-screen justify-center items-center">
        <div className="flex bg-amber-300 broder shadow-xl rounded-xl	p-1 text-white font-bold">
          <span>
            obtuviste: {puntuacion} de {Preguntas.length}{" "}
          </span>
          <button
            className="font-bold border-pink-900 "
            onClick={() => (window.location.href = "/")}
          >
            _Volver a jugar
          </button>
        </div>
      </main>
    );

  return (
    <main className="container flex flex-row min-h-screen justify-center items-center">
      <div className="flex bg-amber-300 broder shadow-xl rounded-xl	p-1 text-white font-semibold">
        <div className="flex flex-col gap-9 m-10 justify-center">
          <div className="numer-pregunta text">
            <span>Pregunta: {preguntAtual + 1} de </span> {Preguntas.length}
          </div>

          <div className="flex">{Preguntas[preguntAtual].question} </div>
        </div>
        <div>
          {!areDisabled ? (
            <span className="flex text-white">
              Tiempo restante:{tiempoRestante}
            </span>
          ) : (
            <button
              className=""
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                setPreguntaAtual(preguntAtual + 1);
              }}
            >
              Continuar
            </button>
          )}
        </div>
        <div className="grid justify-end gap-3 m-8 ">
          {Preguntas[preguntAtual].answesList.map((el, index) => (
            <button
              disabled={areDisabled}
              key={index}
              className="rounded-md border-red-900 border-2  font-semibold p-2 w-48"
              onClick={(e) => handleAsweSubmit(el.isCorrect, e)}
            >
              {el.answer}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tablet;
