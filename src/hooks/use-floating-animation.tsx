'use client';
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1); // Devuelve 1 o -1 aleatoriamente

export const useFloatingAnimation = (
  yRange: [number, number] = [30, 60],  // Rango de movimiento para el eje Y
  xRange: [number, number] = [10, 20],  // Rango de movimiento para el eje X (más suave)
  yDurationRange: [number, number] = [8, 12],  // Rango de duración para el movimiento en Y
  xDurationRange: [number, number] = [15, 20], // Rango de duración para el movimiento en X (más suave)
) => {
  const controls = useAnimation();

  useEffect(() => {
    const yDistance = getRandomValue(yRange[0], yRange[1]) * getRandomDirection(); // Movimiento aleatorio arriba/abajo
    const xDistance = getRandomValue(xRange[0], xRange[1]) * getRandomDirection(); // Movimiento aleatorio izquierda/derecha
    const yDuration = getRandomValue(yDurationRange[0], yDurationRange[1]);
    const xDuration = getRandomValue(xDurationRange[0], xDurationRange[1]);

    // Animación simultánea para ambos ejes, con direcciones aleatorias
    controls.start({
      y: [0, yDistance, 0], // Movimiento hacia arriba y abajo, con dirección aleatoria
      x: [0, xDistance * 5, 0], // Movimiento hacia los lados (izquierda/derecha), con dirección aleatoria
      transition: {
        y: {
          duration: yDuration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror', // Va y vuelve
        },
        x: {
          duration: xDuration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        },
      },
    });
  }, [controls, yRange, xRange, yDurationRange, xDurationRange]);

  return controls;
};