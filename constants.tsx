import { Music, Star, Zap, Armchair, Tv, Radio, Cigarette } from 'lucide-react';
import React from 'react';

// --- AUDIO CONFIGURATION ---
// REPLACE THE URL BELOW with your own MP3 link.
// YouTube links will NOT work here. It must be a direct link to an audio file (.mp3).
// Example: upload your mp3 to a hosting service or GitHub and get the raw link.
export const MUSIC_URL = "https://audio.jukehost.co.uk/feZ27hAcDCPqeL8TZuV2V0ackeiFi51J"; 

export const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/ILY3Mm7KhJIBdxF5cQiPHS";

export const PARTY_INFO = {
  title: "Aniversário do Kainã",
  theme: "Véio e Fubanga de Boteco",
  dressCode: "Obrigatório vir vestido a caráter!!! Terá prêmios para os mais dedicados na vestimenta.",
  price: "R$40,00",
  address: "Rodovia Jornalista Manoel de Menezes 634, casa 5 - 88061-700",
  city: "Praia Mole, Florianópolis, SC",
  obs: "Vou ter que cobrar R$40 pra viabilizar o rolê (e pow, pensa bem, atrações, comida e bebida... TÁ VALENDO!)",
};

export const ATTRACTIONS = [
  { name: "Judivan do Teclado (18h - 20h)", icon: <Music className="w-6 h-6" /> },
  { name: "Show de Mágico (21h)", icon: <Star className="w-6 h-6" /> },
  { name: "Espetáculo Pirotécnico (22h)", icon: <Zap className="w-6 h-6" /> },
];

export const EXPERIENCES = [
  { title: "SHARK TANK DE IDÉIAS LIXO", desc: "Prepara o seu pitch, com slide e tudo, e vamo ver quem investe na sua idéia bosta" },
  { title: "Baseados enrolados em folha de ouro", desc: "Um clássico desde 2021" },
  { title: "Tiro ao alvo com premiações", desc: "Acerte e ganhe (ou não)" },
  { title: "Subcelebridades me dando parabéns", desc: "O auge da fama" },
];

// Images shown during transitions
export const TRANSITION_IMAGES: Record<string, string[]> = {
  theme: [
    "https://i.pinimg.com/236x/a1/97/77/a19777c6645694bcf8964896f30d2e32.jpg",
    "https://scontent-poa1-1.xx.fbcdn.net/v/t1.6435-9/120825968_2818568345028757_4110909590054883723_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=q-RT5NLATZwQ7kNvwFiSsKU&_nc_oc=Adnb_R7Wex7rDSLiM_6vWNa4DVsXZaxw6F-FewDVIn8VzL2f7BN-PfDc95uPNQZX_-UiaYYFVVO4cYEwiDev96El&_nc_zt=23&_nc_ht=scontent-poa1-1.xx&_nc_gid=XV4rc2usNsSYkuw_v8Blfg&oh=00_Afh1fPoosmxd4NQF33WG5Z3cVTpYuIScOq_X4PcogRcN8w&oe=69498EDB"
  ],
  attractions: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mgBstdIPZwxc3qoTRR_6V5urQsxRoF4b2Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjFKhhcR2N2g3lHwf09Dn9FbkTKD01E7Qbyg&s",
    "https://static.escolakids.uol.com.br/conteudo_legenda/645ed6bb55efead6fc9f3713ad333f00.jpg"
  ],
  food: [
    "https://www.estadao.com.br/resizer/v2/IIZRATR3GJDIPAHEYG4BZ3I37Y.jpeg?quality=80&auth=3c9514884d78f71a3ddb9420c783d9bcf3b81021e4c3c8fbd8b040fd4dfc4366&width=1075&height=527&smart=true",
    "https://destro.fbitsstatic.net/img/p/cachaca-velho-barreiro-600ml-72066/258602.jpg?w=500&h=500&v=202501231555&qs=ignore",
    "https://cozinhasimples.com.br/wp-content/uploads/cachorro-quente-cozinha-simples.jpg"
  ],
  experiences: [
    "https://static.todamateria.com.br/upload/tu/ba/tubaraobranco-cke.jpg",
    "https://conteudo.imguol.com.br/blogs/48/files/2013/09/ShinyWorld-612x400.jpg",
    "https://images.tcdn.com.br/img/img_prod/664029/tiro_ao_alvo_brinquedo_infantil_bola_velcro_gruda_super_divertido_14064_1_898c859a54af4e989a8e6a4bfe17a05b.jpg",
    "https://f.i.uol.com.br/fotografia/2023/06/04/1685914464647d03607b28c_1685914464_3x2_lg.jpg"
  ],
  location: [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/46/e8/c1/praia-mole-e-galheta.jpg?w=1200&h=1200&s=1"
  ]
};

// Items that will float in the background
export const FLOATING_ITEMS = [
  { id: 1, type: 'beer', emoji: '🍺', size: 'text-6xl', speed: 4, delay: 0 },
  { id: 2, type: 'chair', icon: <Armchair size={48} color="#D32F2F" />, size: 'text-5xl', speed: 6, delay: 1 },
  { id: 3, type: 'tv', icon: <Tv size={50} color="#333" />, size: 'text-4xl', speed: 5, delay: 2 },
  { id: 4, type: 'slipper', emoji: '🩴', size: 'text-5xl', speed: 7, delay: 0.5 },
  { id: 5, type: 'radio', icon: <Radio size={40} color="#555" />, size: 'text-4xl', speed: 8, delay: 3 },
  { id: 6, type: 'cigarette', icon: <Cigarette size={30} color="#888" />, size: 'text-3xl', speed: 5, delay: 1.5 },
  { id: 7, type: 'beer-crate', emoji: '🍻', size: 'text-6xl', speed: 5, delay: 4 },
  { id: 8, type: 'brazil', emoji: '🇧🇷', size: 'text-4xl', speed: 9, delay: 2 },
];