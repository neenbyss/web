"use client"

import { createContext, useContext } from "react"

/**
 * Indica si la cortina de transición ya terminó de revelar y las animaciones
 * de entrada pueden dispararse. Por defecto `true`, de modo que cualquier
 * componente usado SIN el provider anima con normalidad.
 */
export const TransitionReadyContext = createContext(true)

export const useTransitionReady = () => useContext(TransitionReadyContext)
