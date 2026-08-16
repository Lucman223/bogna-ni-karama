# Propuesta — Plataforma digital Bogna Ni Karama

Bonjour,

Vous lancez **Bogna Ni Karama** le 8 août 2026 avec Sunna TV Savana. Le jour du
lancement, des gens vont chercher votre service sur leur téléphone. Aujourd'hui,
ils ne trouvent rien : ni site, ni liste de chauffeurs, ni moyen de s'inscrire.

Alors je l'ai construite. **Elle est déjà prête, vous pouvez l'essayer maintenant :**

👉 **https://lucman223.github.io/bogna-ni-karama/**

Accès administrateur : `admin` / `bogna2026`
(l'espace d'administration se trouve en bas de page, « Espace administration »)

## Ce que la plateforme fait déjà

**Pour vos clients**
- Ils trouvent un chauffeur près de chez eux en filtrant par quartier
- Ils voient son nom, sa moto, son immatriculation et son expérience avant de monter
- Un bouton pour appeler, un autre pour WhatsApp — ils vous joignent en un geste
- Vos trois numéros officiels sont visibles dès la première seconde

**Pour vos chauffeurs**
- Ils s'inscrivent seuls, depuis leur téléphone, en deux minutes
- Aucune inscription n'apparaît en ligne sans votre accord

**Pour vous**
- Un tableau de bord : combien de chauffeurs, combien attendent votre validation, la note moyenne
- Vous validez, refusez, suspendez ou réactivez chaque fiche d'un clic
- Vous exportez toute votre flotte vers Excel quand vous voulez
- Vous cherchez n'importe quel chauffeur par nom, quartier, moto ou immatriculation

**Le point important :** un chauffeur inscrit reste invisible tant que vous ne
l'avez pas validé. C'est vous qui décidez qui porte le nom de Bogna Ni Karama.

## Ce qu'il reste à faire

La démo fonctionne dans le navigateur : chaque appareil garde ses propres données.
Un chauffeur qui s'inscrit sur son téléphone n'apparaît donc pas encore sur votre
ordinateur.

Pour que les inscriptions vous arrivent réellement, il faut connecter une base de
données. Le travail est déjà préparé pour ça — c'est la phase 2 ci-dessous.

## Ce que je propose

Trois formules : Vitrine, Plateforme (recommandée) et Complète. Voir le
détail des prix dans le tableau plus bas et dans `offres.html`.

## Calendrier

La démo est déjà faite. Si vous validez cette semaine, la plateforme complète est
en ligne **avant le lancement du 8 août**.

Écrivez-moi sur WhatsApp pour que je vous la montre.

**Lucman**
💬 WhatsApp (uniquement) : [+33 7 66 76 80 87](https://wa.me/33766768087)

---

## Notas para ti (no enviar al cliente)

**⚠️ Este archivo NO se envía.** Lo que mandas al cliente es el PDF
`proposition-Bogna-Ni-Karama.pdf`, generado desde `proposition-client.md`, que
no lleva precios ni estas notas.

**Tu argumento más fuerte:** el respaldo de separación. No es un mototaxi más:
es el único donde una mujer puede viajar sin contacto físico con el conductor.
Ellos ya tienen las motos equipadas pero no lo estaban contando en ningún sitio.
Tú les has construido el escaparate de su propia diferencia.

**El segundo:** no les enseñas una idea, les enseñas la plataforma funcionando
con su nombre y sus colores, antes del lanzamiento. Es muy difícil decir que no
a algo que ya existe.

## Los tres planes (ajustados al mercado maliense)

| Plan | Precio | En euros | Capacidad |
|---|---|---|---|
| Vitrine | 649.000 FCFA | 990 € | 20 fichas cargadas por ti |
| **Plateforme** (destacado) | **1.640.000 FCFA** | **2.500 €** | hasta 150 · **con reservas** |
| Complète | 2.099.000 FCFA | 3.200 € | ilimitados · datos y crecimiento |
| **Seguimiento en vivo** | +918.000 FCFA | +1.400 € | solo con Complète · PWA incluida |
| Mantenimiento | 32.000 FCFA/mes | 49 €/mes | opcional |
| App instalable (PWA) | +394.000 FCFA | +600 € | 2 semanas |
| App Play Store | +2.296.000 FCFA | +3.500 € | 2-3 meses |

**El plan Complète con seguimiento = 4.600 €** (3.200 + 1.400). Ese es tu techo
realista en esta venta.

**Ojo con esta proporción:** el seguimiento (1.400 €) cuesta casi la mitad del
plan Complète (3.200 €). Si te lo señalan, la respuesta está en la web: son
cinco frentes de trabajo distintos y 3-4 semanas de desarrollo con pruebas en
la calle. Si aun así les chirría, tienes dos salidas: subir Complète a 3.500 €
o bajar el seguimiento a 1.200 €. Dímelo y lo cambio en un minuto.

**Por qué la reserva bajó a Plateforme:** decisión tuya, y es buena — el plan
recomendado ahora resuelve el problema completo (registro + reservas + panel) y
justifica sus 2.500 €. El Complète pasó a ser el plan de *datos y crecimiento*:
asignación automática, reservas programadas, estadísticas y espacio del
conductor. Cada escalón sigue teniendo una razón clara.

**Sobre el límite de Vitrine:** el "hasta 20" que había antes era inventado por
mí y no se sostenía — en Vitrine las fichas van escritas en el archivo, así que
20 o 200 cuestan lo mismo de servir. Lo reformulé como lo que es de verdad:
**20 fichas cargadas por ti**. Lo que se agota es tu tiempo de carga, no la
tecnología. Si preguntan, es la respuesta honesta y además empuja al plan
Plateforme, donde se registran solos.

**Sobre el seguimiento en vivo:** es lo más difícil de todo el proyecto, y por
eso va aparte. Lo que debes saber antes de venderlo:
- Exige la app instalable (el navegador cerrado deja de enviar posición). Va
  incluida en los 1.400 €, no la cobres dos veces.
- El conductor debe tener la app abierta durante la carrera, y le consume
  batería y datos. **Es el motivo nº1 por el que estos sistemas fracasan.**
  Dilo en la reunión: si lo descubren después, pierdes credibilidad.
- Mapas: OpenStreetMap es gratis y suficiente para ver la moto acercarse.
  Google Maps cuesta ~20.000 FCFA/mes y lo paga el cliente si lo quiere.

Tasa fija: 1 € = 655,957 FCFA. Los precios se editan en un solo sitio:
`assets/offres.js`. Cambias ahí y se actualizan la web y las slides.

**Tu margen real:** los costes de infraestructura que les enseñas
(10.000 FCFA/año en Vitrine y Plateforme) son ciertos y no van a tu bolsillo.
El resto es tu trabajo. En el plan Plateforme cobras 1.640.000 FCFA y el coste
recurrente es 10.000 FCFA/año — enséñaselo sin miedo, genera confianza y
justifica el precio.

**Por qué el plan del medio está destacado:** es el que de verdad les resuelve
el problema (registro + panel) y el que deja mejor margen respecto al trabajo.
El barato parece corto al lado, el caro parece mucho. Si dudan, el del medio
se elige solo.

**Sobre la app:** documenté que la nativa cuesta 6 veces más que la PWA y que
Apple cobra 60.000 FCFA cada año. No les digas "no hagáis app": enséñales los
números y que decidan. Si eligen PWA, ganas 394.000 FCFA por dos semanas de
trabajo. Si algún día quieren la nativa, la base de datos ya está hecha.

**Si regatean el precio:** ofrece empezar por Vitrine (990 €) y subir a
Plateforme después. Cobras dos veces y ellos reparten el gasto.

**Si preguntan por el mantenimiento:** cada cambio (añadir un barrio, cambiar un
teléfono, retocar un texto) te lleva minutos con este kit. Los 49 €/mes son casi
todo margen.

**Antes de enviar:**
1. ~~Publicar la demo~~ — hecho: https://lucman223.github.io/bogna-ni-karama/
2. ~~Rellenar nombre y contacto~~ — hecho: Lucman, +33 7 66 76 80 87
3. Confirma con ellos los barrios que cubren de verdad — los 12 de la demo son
   una suposición razonable, no un dato suyo
4. Avísales de que los conductores de la demo son inventados; el aviso amarillo
   de arriba ya lo dice, pero mejor decirlo tú también

**Ojo con el prefijo:** tu número es francés (+33) y el cliente está en Malí.
Asegúrate de que puede llamarte sin coste raro — o dile que te escriba por
WhatsApp, que le sale gratis. Si tienes un número maliense, mejor ese.

**Sobre la contraseña del panel:** ya no aparece escrita en la pantalla de
acceso, así que pásasela tú por WhatsApp (`admin` / `bogna2026`). Ojo: sigue
estando dentro del archivo `assets/data.js`, que es público — quien mire el
código la encuentra. En una demo con datos inventados no importa; cuando
conectemos la base de datos habrá contraseñas de verdad.

**Si te piden cambios en la demo:** dímelo y la actualizo. La URL no cambia,
así que el enlace que ya enviaste sigue valiendo.

**El coste de todo esto:** unos pocos euros de uso, o una fracción del uso
incluido en tu plan. Sostiene un servicio que se cobra desde 990 €.
 