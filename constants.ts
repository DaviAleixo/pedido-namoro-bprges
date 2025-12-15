export const SPOTIFY_TRACK_ID = '587Lf3LyhC8smoFnNIQtn3'; // "Te Assumo"

// Using high quality Unsplash images that fit the romantic theme
export const PHOTOS = {
  // Foto fornecida (Link direto):
  start: 'https://i.ibb.co/bM7NyVJD/capa.jpg', 
  
  // A cozy, intimate moment or memory vibe (single fallback)
  intro: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=2000&auto=format&fit=crop',
  // Foto para a tela "Vou direto ao ponto..."
  question: 'https://img.freepik.com/fotos-gratis/par-segurando-luminoso-rosa-vermelha-em-maos_23-2148019255.jpg?semt=ais_hybrid&w=740&q=80',
  // Foto para a tela final "Somos oficialmente namorados"
  success: 'https://a.storyblok.com/f/112937/568x464/88ccff84c5/10_most_romantic_cities_hero-1.jpg/m/620x0/filters:quality(70)/',
};

// New array for the carousel in the Intro screen - Updated with user provided photos
export const INTRO_PHOTOS = [
  'https://i.ibb.co/Nn6tP7h8/Whats-App-Image-2025-12-11-at-20-01-16.jpg',
  'https://i.ibb.co/zhkxMJpp/Whats-App-Image-2025-12-11-at-20-01-15-1.jpg',
  'https://i.ibb.co/HDP9NRPS/Whats-App-Image-2025-12-11-at-20-01-15.jpg'
];

export const TEXTS = {
  start: {
    title: "Para você...",
    subtitle: "Preparei uma surpresa especial ❤️",
    button: "Ver surpresa"
  },
  intro: {
    paragraph1: "Oi, vim aqui pra fazer uma lembrancinha e uma prova do que eu to sentindo de vc, desse tempo que a gente começou a se falar e que a gente se conheceu...",
    paragraph2: "e começamos a conversar na maior inocência e agora estamos aqui, eu fazendo lembrancinha de apaixonado por esse seu jeitinho incrível.",
    button: "Continuar"
  },
  question: {
    main: "E vou ir direto ao ponto, quer namorar comigo? ❤️"
  },
  success: {
    main: "A partir de agora somos oficialmente namorados ❤️",
    sub: "Te amo infinitamente!"
  }
};