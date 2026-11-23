/**
 * Fotos reales de las plantas (Wikimedia Commons, licencias libres).
 * Las licencias CC BY / CC BY-SA / GFDL piden dar crédito al autor, por eso se guarda aquí.
 */
export type FotoPlanta = { autor: string; licencia: string; fuente: string };

export const fotosPlantas: Record<string, FotoPlanta> = {
  girasol: {autor: "Fir0002", licencia: "GFDL 1.2", fuente: "https://commons.wikimedia.org/wiki/File:Sunflower_sky_backdrop.jpg"},
  frijol: {autor: "Nabunje Leticia", licencia: "CC BY-SA 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Bean_plants_in_the_garden.jpg"},
  cactus: {autor: "Jubair1985", licencia: "CC BY-SA 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Cactus_in_clay_pot.jpg"},
  albahaca: {autor: "Castielli", licencia: "CC BY-SA 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Basil-Basilico-Ocimum_basilicum-albahaca.jpg"},
  sabila: {autor: "Lionsleeps23", licencia: "CC BY-SA 4.0", fuente: "https://commons.wikimedia.org/wiki/File:A_potted_aloe_vera_plant.jpg"},
  jitomate: {autor: "George Chernilevsky", licencia: "CC BY 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Tomato_plant_2026_G1.jpg"},
  cempasuchil: {autor: "Joydeep", licencia: "CC BY-SA 3.0", fuente: "https://commons.wikimedia.org/wiki/File:Tagetes_erecta_26122014_(2).jpg"},
  menta: {autor: "Commonists", licencia: "CC BY-SA 4.0", fuente: "https://commons.wikimedia.org/wiki/File:Mint_leaves_(Mentha_spicata).jpg"},
};
