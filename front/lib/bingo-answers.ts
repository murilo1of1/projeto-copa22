// Arquivo com todas as respostas corretas do Bingo Copa 2022
// Baseado nos dados reais da Copa do Mundo 2022

export interface BingoAnswer {
  name: string;
  type: "player" | "team";
  validCards: string[];
}

// Respostas para jogadores - baseado nas estatísticas reais da Copa 2022
export const PLAYER_ANSWERS: Record<string, string[]> = {
  // Principais artilheiros e assistentes
  "Kylian Mbappé": [
    "goals_5plus",
    "france",
    "assists_3plus",
    "psg",
    "shots_10plus",
  ],
  "Lionel Messi": [
    "goals_5plus",
    "argentina",
    "assists_3plus",
    "psg",
    "shots_10plus",
    "yellow_card",
  ],
  "Harry Kane": ["assists_3plus", "england", "goals_5plus", "shots_10plus"],
  "Antoine Griezmann": ["assists_3plus", "france", "shots_10plus"],
  "Ivan Perišić": ["assists_3plus", "croatia", "shots_10plus"],
  "Olivier Giroud": ["france", "goals_5plus"],

  // Jogadores com cartões
  "Luka Modrić": ["yellow_card", "croatia", "real_madrid"],
  Casemiro: ["yellow_card", "brazil", "man_united"],
  "Raphaël Varane": ["yellow_card", "france", "man_united"],
  "Denzel Dumfries": ["red_card", "netherlands"],
  "Wayne Hennessey": ["red_card", "wales"],

  // Brasil
  "Neymar Jr": ["brazil", "goals_5plus", "psg", "yellow_card"],
  "Vinícius Júnior": ["brazil", "real_madrid"],
  Alisson: ["brazil", "liverpool"],

  // Portugal
  "Cristiano Ronaldo": ["portugal", "goals_5plus", "man_united"],
  "Bruno Fernandes": ["portugal", "man_united"],
  "Raphaël Guerreiro": ["portugal", "assists_3plus"],

  // França
  "Hugo Lloris": ["france"],

  // Inglaterra
  "Jude Bellingham": ["england"],
  "Phil Foden": ["england", "man_city"],
  "Jordan Pickford": ["england"],

  Pedri: ["spain", "barcelona"],
  Gavi: ["spain", "barcelona"],
  "Sergio Busquets": ["spain", "barcelona"],
  "Unai Simón": ["spain"],

  "Manuel Neuer": ["germany", "bayern"],
  "Joshua Kimmich": ["germany", "bayern"],
  "Jamal Musiala": ["germany", "bayern"],
  "Thomas Müller": ["germany", "bayern"],

  "Virgil van Dijk": ["netherlands", "liverpool"],
  "Frenkie de Jong": ["netherlands", "barcelona"],
  "Memphis Depay": ["netherlands", "barcelona"],
  "Cody Gakpo": ["netherlands"],

  "Kevin De Bruyne": ["belgium", "man_city"],
  "Romelu Lukaku": ["belgium"],
  "Thibaut Courtois": ["belgium", "real_madrid"],

  "Mateo Kovačić": ["croatia"],

  "Achraf Hakimi": ["morocco", "psg"],
  "Hakim Ziyech": ["morocco"],
  "Youssef En-Nesyri": ["morocco"],

  "Takumi Minamino": ["japan", "liverpool"],
  "Maya Yoshida": ["japan"],

  "Son Heung-min": ["south_korea"],
  "Kim Min-jae": ["south_korea"],

  "Mathew Ryan": ["australia"],
  "Jackson Irvine": ["australia"],

  "Alphonso Davies": ["canada", "bayern"],
  "Jonathan David": ["canada"],

  "Christian Pulisic": ["usa"],
  "Weston McKennie": ["usa"],
  "Tyler Adams": ["usa"],

  "Hirving Lozano": ["mexico"],
  "Raúl Jiménez": ["mexico"],

  "Enner Valencia": ["ecuador"],
  "Moisés Caicedo": ["ecuador"],

  "Luis Suárez": ["uruguay"],
  "Edinson Cavani": ["uruguay"],
  "Darwin Núñez": ["uruguay", "liverpool"],

  "Robert Lewandowski": ["poland", "barcelona", "goals_5plus"],
  "Piotr Zieliński": ["poland"],

  "Kasper Schmeichel": ["denmark"],
  "Christian Eriksen": ["denmark", "man_united"],

  "Yann Sommer": ["switzerland"],
  "Granit Xhaka": ["switzerland"],

  "Gareth Bale": ["wales"],
  "Aaron Ramsey": ["wales"],

  "Dušan Tadić": ["serbia"],
  "Aleksandar Mitrović": ["serbia"],

  "André Onana": ["cameroon"],
  "Vincent Aboubakar": ["cameroon"],

  "Thomas Partey": ["ghana"],
  "Mohammed Kudus": ["ghana"],

  "Sadio Mané": ["senegal", "bayern"],
  "Kalidou Koulibaly": ["senegal"],

  "Wahbi Khazri": ["tunisia"],

  "Mehdi Taremi": ["iran"],
  "Alireza Beiranvand": ["iran"],

  "Salem Al-Dawsari": ["saudi_arabia"],
  "Mohammed Al-Owais": ["saudi_arabia"],

  "Akram Afif": ["qatar"],
  "Saad Al-Sheeb": ["qatar"],

  "Keylor Navas": ["costa_rica", "psg"],
  "Joel Campbell": ["costa_rica"],
};

// Respostas para seleções - baseado nas estatísticas reais da Copa 2022
export const TEAM_ANSWERS: Record<string, string[]> = {
  // Campeão e vice
  Argentina: [
    "team_goals_10plus",
    "first_place",
    "played_final",
    "wins_2plus",
    "points_6plus",
    "penalties_3plus",
  ],
  France: [
    "team_goals_10plus",
    "first_place",
    "played_final",
    "wins_2plus",
    "points_6plus",
    "played_semifinal",
    "penalties_3plus",
  ],

  // Semifinalistas
  Croatia: ["second_place", "played_semifinal", "wins_2plus", "points_6plus"],
  Morocco: [
    "first_place",
    "played_semifinal",
    "wins_2plus",
    "points_6plus",
    "clean_sheet",
    "undefeated",
  ],

  // Quartas de final
  Brazil: [
    "first_place",
    "wins_2plus",
    "points_6plus",
    "team_goals_10plus",
    "clean_sheet",
    "possession_60plus",
  ],
  Netherlands: [
    "first_place",
    "wins_2plus",
    "points_6plus",
    "clean_sheet",
    "undefeated",
  ],
  England: [
    "first_place",
    "wins_2plus",
    "points_6plus",
    "team_goals_10plus",
    "clean_sheet",
  ],
  Portugal: [
    "first_place",
    "wins_2plus",
    "points_6plus",
    "team_goals_10plus",
    "goal_diff_3plus",
  ],

  // Primeira fase - Primeiros colocados
  Spain: [
    "first_place",
    "wins_2plus",
    "points_6plus",
    "possession_60plus",
    "clean_sheet",
    "team_assists_5plus",
    "corners_20plus",
  ],
  Japan: ["first_place", "wins_2plus", "points_6plus"],
  Australia: ["second_place", "wins_2plus", "points_6plus"],
  Poland: ["first_place", "wins_2plus", "points_6plus"],
  Senegal: ["first_place", "wins_2plus", "points_6plus"],

  // Segunda fase
  USA: ["second_place", "points_6plus"],
  Iran: ["second_place"],
  Tunisia: ["points_6plus"],
  "South Korea": ["points_6plus"],
  Denmark: ["points_6plus"],
  Switzerland: ["second_place"],
  "Saudi Arabia": ["wins_2plus"],

  // Times com estatísticas específicas
  Germany: ["possession_60plus", "team_assists_5plus"],
  Belgium: [],
  Serbia: [],
  Cameroon: [],
  Ghana: [],
  Uruguay: [],
  Ecuador: [],
  Qatar: [],
  "Costa Rica": [],
  Canada: [],
  Wales: [],
  Mexico: [],
};

// Lista balanceada: 70% jogadores (29) e 30% seleções (13) = 42 total
export const BINGO_ENTITIES = [
  // Jogadores principais (50 - 60%)
  "Lionel Messi",
  "Kylian Mbappé",
  "Cristiano Ronaldo",
  "Neymar Jr",
  "Harry Kane",
  "Robert Lewandowski",
  "Luka Modrić",
  "Kevin De Bruyne",
  "Virgil van Dijk",
  "Sadio Mané",
  "Gareth Bale",
  "Pedri",
  "Gavi",
  "Jude Bellingham",
  "Phil Foden",
  "Vinícius Júnior",
  "Casemiro",
  "Antoine Griezmann",
  "Olivier Giroud",
  "Manuel Neuer",
  "Thibaut Courtois",
  "Alisson",
  "Son Heung-min",
  "Christian Pulisic",
  "Alphonso Davies",
  "Ivan Perišić",
  "Bruno Fernandes",
  "Joshua Kimmich",
  "Achraf Hakimi",
  "Hugo Lloris",
  "Raphaël Varane",
  "Raphaël Guerreiro",
  "Sergio Busquets",
  "Jamal Musiala",
  "Frenkie de Jong",
  "Memphis Depay",
  "Cody Gakpo",
  "Romelu Lukaku",
  "Hakim Ziyech",
  "Takumi Minamino",
  "Maya Yoshida",
  "Mathew Ryan",
  "Jackson Irvine",
  "Jonathan David",
  "Weston McKennie",
  "Tyler Adams",
  "Hirving Lozano",
  "Enner Valencia",
  "Edinson Cavani",
  "Kasper Schmeichel",
  "Christian Eriksen",
  "Yann Sommer",
  "Granit Xhaka",
  "Aaron Ramsey",
  "Vincent Aboubakar",
  "Thomas Partey",
  "Mohammed Kudus",
  "Kalidou Koulibaly",
  "Wahbi Khazri",
  "Mehdi Taremi",
  "Alireza Beiranvand",
  "Akram Afif",
  "Keylor Navas",
  "Joel Campbell",
  "Denzel Dumfries",
  "Wayne Hennessey",
  "Jordan Pickford",

  // Todas as 32 seleções da Copa 2022 (40%)
  "Argentina",
  "France",
  "Brazil",
  "England",
  "Spain",
  "Portugal",
  "Netherlands",
  "Croatia",
  "Morocco",
  "Japan",
  "Germany",
  "Belgium",
  "Poland",
  "Korea Republic",
  "Australia",
  "Canada",
  "USA",
  "Mexico",
  "Ecuador",
  "Uruguay",
  "Denmark",
  "Switzerland",
  "Wales",
  "Serbia",
  "Cameroon",
  "Ghana",
  "Senegal",
  "Tunisia",
  "IR Iran",
  "Saudi Arabia",
  "Qatar",
  "Costa Rica",
];

// Função para validar se um card é correto para um jogador/seleção
export function validateBingoAnswer(entity: string, cardId: string): boolean {
  // Verifica se é um jogador
  if (PLAYER_ANSWERS[entity]) {
    return PLAYER_ANSWERS[entity].includes(cardId);
  }

  // Verifica se é uma seleção
  if (TEAM_ANSWERS[entity]) {
    return TEAM_ANSWERS[entity].includes(cardId);
  }

  return false;
}

// Função para obter todas as respostas válidas para uma entidade
export function getValidCards(entity: string): string[] {
  return PLAYER_ANSWERS[entity] || TEAM_ANSWERS[entity] || [];
}

// Função para gerar sequência de entidades para o jogo
export function generateGameSequence(seed?: string): string[] {
  const entities = [...BINGO_ENTITIES];

  // Se tiver seed (para cartela diária), usar para embaralhar consistentemente
  if (seed) {
    // Embaralhamento determinístico baseado na seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Usar hash como seed para embaralhamento
    const random = function (seed: number) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = entities.length - 1; i > 0; i--) {
      const j = Math.floor(random(hash + i) * (i + 1));
      [entities[i], entities[j]] = [entities[j], entities[i]];
    }
  } else {
    // Embaralhamento aleatório
    for (let i = entities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entities[i], entities[j]] = [entities[j], entities[i]];
    }
  }

  // GARANTIR QUE SEJA EXATAMENTE 42 ENTIDADES
  return entities.slice(0, 42);
}

// Função para gerar seed da cartela diária
export function getDailySeed(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
}
