---
name: spec-definer
description: Define especificaciones a partir de historias de usuario. Usa esta skill cuando el usuario te dé una historia de usuario y quiera que rellenes los espacios en blanco de una spec. Muestra asunciones, pregunta por las que no gusten y confirma listo para crear la especificación.
---

# Spec Definer

Define especificaciones técnicas a partir de una historia de usuario, rellenando espacios en blanco y confirmando asunciones con el usuario.

## Workflow

1. **Recibe la historia de usuario** del usuario y analiza qué información falta para definir la spec completa.

2. **Rellena los espacios en blanco** con tus mejores asunciones. Muestra la spec completa al usuario.

3. **Muestra un listado numerado** de todas las asunciones que hiciste (solo no-técnicas y no-funcionales). Ejemplo:
   ```
   Asunciones realizadas:
   1. La app se usará en producción desde el día 1
   2. El equipo de desarrollo tiene 3 personas
   3. Se usará PostgreSQL como base de datos
   ...
   ```

4. **Pide al usuario** que te diga qué números de asunciones no le gustan.

5. **Por cada asunción que no guste**, pregunta al usuario una por una:
   - Muestra una **barra de progreso** con el formato: `[■□□□□] 1/5` (preguntas respondidas / total de asunciones)
   - Muestra **4 asunciones alternativas** numeradas (1-4)
   - Muestra una **5ta opción que dice "otra"**
   - Si el usuario elige "otra", pídele que especifique su respuesta

6. **Repite el paso 5** hasta haber cubierto todas las asunciones.

7. **Confirma al usuario** que ya estás listo para crear la especificación final.

## Formato de pregunta

```
Pregunta X de Y: [tema de la asunción]

[■□□□□] X/Y

1. Asunción alternativa A
2. Asunción alternativa B
3. Asunción alternativa C
4. Asunción alternativa D
5. Otra

¿Cuál prefieres?
```

## Reglas

- **Solo muestra asunciones no-técnicas y no-funcionales** (ej: plazos, equipo, presupuesto, mercado, competencia, estrategia)
- **Las asunciones técnicas y funcionales se completan automáticamente** sin preguntar
- **Pregunta una por una** — nunca muestres múltiples preguntas a la vez
- **La barra de progreso debe actualizarse** con cada pregunta nueva
- **Las 4 asunciones alternativas deben ser variadas** y razonables para el contexto
- Al final, **confirma explícitamente** que estás listo para crear la spec
