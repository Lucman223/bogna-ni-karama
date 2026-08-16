# Bogna Ni Karama — Plataforma de mototaxis (demo)

Plataforma para **Bogna Ni Karama**, servicio de mototaxi de Bamako (Malí).
Todo en francés, que es la lengua de trabajo del cliente.

## Publicada en

**https://lucman223.github.io/bogna-ni-karama/**

Ese es el enlace que le mandas al cliente. Gratis, con candado https y sin
caducidad. El repositorio es `Lucman223/bogna-ni-karama` en GitHub.

Para actualizarla después de un cambio, dime **"actualiza la web publicada"**:
lo subo yo y la URL no cambia.

## Cómo verla en tu ordenador

Abre `index.html` haciendo doble clic. No necesita internet ni instalar nada.

## El simulador (lo más potente para la reunión)

**[.../simulateur.html](https://lucman223.github.io/bogna-ni-karama/simulateur.html)**

Tres paneles en una pantalla — la clienta, el conductor y tú — que se responden
en directo. El cliente ve el ciclo entero: pide moto → al conductor le llega →
acepta → va de camino → sube → termina → ella le puntúa. Y en paralelo: se
inscribe un conductor sin respaldo → taller → validado.

Dos formas de usarlo en la reunión:
- **"Jouer le scénario complet"**: los 9 pasos solos, con pausa entre cada uno.
  Úsalo mientras hablas.
- **A mano**: que lo toquen ellos. Es lo que más engancha.

Todo ocurre en la página; no hay servidor. En producción cada actor estaría en
su propio móvil y todo pasaría por la base de datos — eso es exactamente lo que
compran con la formule Plateforme.

## Para la presentación al cliente

| Enlace | Qué es |
|---|---|
| [.../presentation.html](https://lucman223.github.io/bogna-ni-karama/presentation.html) | 13 diapositivas navegables (flechas, clic o dedo). Para presentar en directo |
| [.../offres.html](https://lucman223.github.io/bogna-ni-karama/offres.html) | Los tres planes con precios, costes reales y opción de app |
| `presentation-Bogna-Ni-Karama.pdf` | La presentación en PDF, para mandar por WhatsApp |

Los precios están en **un solo archivo**: `assets/offres.js`. Cambias ahí y se
actualizan la página de planes y las diapositivas a la vez.

### Cuál de los PDF mandas

**`presentation-diapositives.pdf`** — las 18 diapositivas en apaisado, con sus
colores. Es la presentación tal cual, para compartir por WhatsApp o proyectar
sin conexión. Se regenera abriendo `presentation.html` e imprimiendo a
297×167 mm con fondos activados; dime **"regenera las diapositivas"** y lo hago.

### Y cuál de los otros tres

**`dossier-Bogna-Ni-Karama.pdf` — este es el bueno.** 14 páginas diseñadas con
los colores de la marca: portada con la foto a sangre, sumario, antes/después,
los dos recorridos, capturas reales de la plataforma, tarjetas de precios y
tablas. Es el que dejas encima de la mesa.

Se genera de otra forma que los otros: es un HTML (`dossier.html`) que Chrome
imprime. Dime **"regenera el dossier"** y lo hago. Para cambiar textos se edita
`dossier.html`; los precios salen solos de `assets/offres.js`.

Los otros dos son versiones antiguas, más sobrias, generadas desde markdown:
`presentation-Bogna-Ni-Karama.pdf` (larga) y `proposition-Bogna-Ni-Karama.pdf`
(corta, sin precios). Sirven si algún día quieres algo minimalista, pero para
presentar usa el dossier.

### Si hay que regenerar los PDF antiguos (markdown)

Las fotos van dentro del PDF, pero el generador **no resuelve rutas relativas**:
si se le pasa el markdown tal cual, salen iconos de imagen rota. Por eso hay un
paso previo (`hacer-pdf.py`) que mete las fotos dentro de una copia temporal.

Dime **"regenera el PDF"** y lo hago yo. Es este orden:
1. `python hacer-pdf.py presentation-client.md <temporal>.md`
2. Generar el PDF desde ese temporal

El markdown que editas tú se queda limpio y legible.

## Las pantallas

| Archivo | Qué es | Para quién |
|---|---|---|
| `index.html` | Portada: presentación, servicios, zonas, teléfonos | Clientes |
| `chauffeurs.html` | Directorio con buscador y filtro por barrio | Clientes |
| `inscription.html` | Formulario de alta de conductor | Conductores |
| `admin.html` | Panel de gestión de la flota | El jefe |

**Entrar al panel:** usuario `admin`, contraseña `bogna2026`.

## El argumento de venta: el respaldo de separación

Las motos llevan un respaldo instalado detrás del conductor. El pasajero se apoya
en él en vez de agarrarse a la persona: el trayecto se hace **sin contacto
físico**. En Malí eso es lo que permite que muchas mujeres usen el servicio.

**Todas las motos lo llevan.** No es una opción entre varias: es una garantía de
la empresa. Por eso no hay filtro — no haría falta filtrar nada.

- La portada abre con "Voyagez à distance respectueuse" y un 100% como cifra clave
- El directorio muestra la garantía: "Toutes nos motos sont équipées"
- Cada ficha lleva su distintivo
- El conductor lo declara al registrarse y el admin lo verifica antes de validar

Se dice sin nombrar la religión: se habla de respeto, intimidad y tranquilidad.
Así nadie queda fuera y el mensaje se entiende igual.

### El conductor sin respaldo no se rechaza: se equipa

Si alguien se registra con una moto sin respaldo, la plataforma no le da un no.
Le pone en contacto con el taller que lo instala, y su ficha queda en estado
**"En équipement"**. Cuando la moto está lista, el admin pulsa "Moto équipée" y
la ficha pasa a validación normal.

Para el negocio esto significa dos cosas: no se pierde ni un conductor, y cada
instalación es una moto más equipada circulando por Bamako con su nombre.

⚠️ **El teléfono del taller es provisional** — ahora aparece el de la empresa
(71 02 91 58). Pide al cliente los datos reales del taller y cámbialos en
`assets/data.js`, en el bloque `ATELIER`.

## La regla que hace funcionar esto

Un conductor que se registra queda **en attente** (pendiente). No aparece en la
web pública hasta que el administrador pulsa **Valider**. Así el cliente controla
quién representa a su marca. Está probado y funciona.

Estados posibles: pendiente → validado / rechazado, y validado → suspendido.

## Qué puede hacer el administrador

- Ver de un vistazo cuántos conductores hay, cuántos esperan validación y la nota media
- Validar, rechazar, suspender, reactivar y borrar fichas
- Buscar por nombre, barrio, moto o matrícula
- Descargar toda la flota en Excel (botón *Exporter CSV*)
- Reiniciar la demo a su estado inicial

## Importante: esto es una demostración

Los datos se guardan **en el navegador de quien la abre** (localStorage). Eso
significa que:

- Si el conductor se apunta desde su móvil, el jefe **no lo verá** en su ordenador.
- Al borrar el historial del navegador, se pierden los registros.
- Sirve para enseñar y vender, no para operar de verdad.

La contraseña del panel está escrita en el código. En una demo da igual (no hay
datos reales), pero **no vale para producción**.

## Para que funcione de verdad

Hay que conectar una base de datos. Todo está preparado: en
`assets/data.js` hay 6 funciones marcadas como API (listar, ver, inscribir,
cambiar estado, borrar, estadísticas). Se sustituyen por llamadas a Supabase y el
resto de la plataforma no se toca.

Con eso se consigue:
- Los registros llegan de verdad al panel del jefe, desde cualquier móvil
- Contraseña segura y cuentas de administrador reales
- Las fotos se guardan en la nube

Es el paso 2, y se cobra aparte (ver `propuesta.md`).

## Datos reales vs inventados

**Reales** (del cartel oficial): el nombre Bogna Ni Karama, el partenariado con
Sunna TV Savana, la fecha de lanzamiento 08/08/2026 y los tres teléfonos
(71 02 91 58 · 71 87 27 74 · 71 74 98 13).

**Las dos fotos son reales y son del negocio**, en `assets/photos/`:
- `dossier-en-usage.jpg` — el respaldo en uso durante un trayecto. Es la prueba
  visual del servicio, y va en la portada y en la diapositiva 3
- `flotte-equipee.jpg` — su flota con todas las motos equipadas. Respalda el
  "100%", y va en la portada y en la diapositiva 5

La primera también es la vista previa al compartir el enlace por WhatsApp.

⚠️ **Confírmale al cliente que puedes usarlas.** En la primera se ve el rostro
parcial de una pasajera, y ahora están públicas en internet.

**Inventados** para poder enseñar la plataforma: los 11 conductores, sus motos,
matrículas, notas y número de carreras. Los barrios de Bamako son reales, pero
la cobertura hay que confirmarla con el cliente.

Por eso todas las páginas llevan arriba un aviso de demostración. **Quítalo solo
cuando los datos sean reales**: se borra el bloque `<div class="bandeau-demo">`
de cada archivo HTML.

## Archivos

```
index.html          Portada
chauffeurs.html     Directorio
inscription.html    Alta de conductor
admin.html          Panel de gestión
assets/
  estilos.css       Diseño (colores del cartel: verde, oro, rojo)
  data.js           Datos y las 6 funciones a sustituir
  app.js            Menú, animaciones y tarjetas
```

Sin librerías externas ni dependencias: carga rápido incluso con conexión lenta,
que es lo normal en Bamako.
