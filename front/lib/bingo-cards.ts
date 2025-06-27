export interface BingoCard {
  id: string
  label: string
  icon: string
  type: 'player' | 'team'
  category: 'stats' | 'club' | 'country' | 'group' | 'match'
  description?: string
  query?: string
  countryCode?: string 
}

export const PLAYER_CARDS: BingoCard[] = [
  {
    id: 'goals_5plus',
    label: '5+ GOLS',
    icon: '⚽',
    type: 'player',
    category: 'stats',
    description: 'Jogador que marcou 5 ou mais gols na Copa',
    query: 'Goals >= 5'
  },
  {
    id: 'assists_3plus',
    label: '3+ ASSISTS',
    icon: '🅰️',
    type: 'player',
    category: 'stats',
    description: 'Jogador com 3 ou mais assistências',
    query: 'Ast >= 3'
  },
  {
    id: 'minutes_90plus',
    label: '90+ MIN',
    icon: '⏱️',
    type: 'player',
    category: 'stats',
    description: 'Jogou 90 minutos ou mais',
    query: 'Minutes_played >= 90'
  },
  {
    id: 'yellow_card',
    label: 'CARTÃO AMARELO',
    icon: '🟨',
    type: 'player',
    category: 'stats',
    description: 'Recebeu pelo menos um cartão amarelo',
    query: 'CrdY >= 1'
  },
  {
    id: 'red_card',
    label: 'CARTÃO VERMELHO',
    icon: '🟥',
    type: 'player',
    category: 'stats',
    description: 'Recebeu cartão vermelho',
    query: 'CrdR >= 1'
  },
  {
    id: 'fouls_5plus',
    label: '5+ FALTAS',
    icon: '🚫',
    type: 'player',
    category: 'stats',
    description: 'Cometeu 5 ou mais faltas',
    query: 'fouls_committed >= 5'
  },
  {
    id: 'shots_10plus',
    label: '10+ CHUTES',
    icon: '🎯',
    type: 'player',
    category: 'stats',
    description: 'Fez 10 ou mais chutes',
    query: 'Shots >= 10'
  },
  {
    id: 'shots_target_5plus',
    label: '5+ CHUTES NO GOL',
    icon: '🥅',
    type: 'player',
    category: 'stats',
    description: 'Teve 5 ou mais chutes no gol',
    query: 'shots_on_target >= 5'
  },

  // Clubes
  {
    id: 'barcelona',
    label: 'BARCELONA',
    icon: '🔵🔴',
    type: 'player',
    category: 'club',
    description: 'Joga pelo Barcelona',
    query: "Club = 'Barcelona'"
  },
  {
    id: 'real_madrid',
    label: 'REAL MADRID',
    icon: '⚪',
    type: 'player',
    category: 'club',
    description: 'Joga pelo Real Madrid',
    query: "Club = 'Real Madrid'"
  },
  {
    id: 'psg',
    label: 'PSG',
    icon: '🔵🔴',
    type: 'player',
    category: 'club',
    description: 'Joga pelo Paris Saint-Germain',
    query: "Club = 'Paris Saint-Germain'"
  },
  {
    id: 'man_city',
    label: 'MANCHESTER CITY',
    icon: '🔵',
    type: 'player',
    category: 'club',
    description: 'Joga pelo Manchester City',
    query: "Club = 'Manchester City'"
  },
  {
    id: 'liverpool',
    label: 'LIVERPOOL',
    icon: '🔴',
    type: 'player',
    category: 'club',
    description: 'Joga pelo Liverpool',
    query: "Club = 'Liverpool'"
  },
  {
    id: 'bayern',
    label: 'BAYERN MUNICH',
    icon: '🔴⚪',
    type: 'player',
    category: 'club',
    description: 'Joga pelo Bayern Munich',
    query: "Club = 'Bayern Munich'"
  },

  // Países
  {
    id: 'brazil',
    label: 'BRASIL',
    icon: '🇧🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção brasileira',
    query: "Team = 'Brazil'",
    countryCode: 'Brazil'
  },
  {
    id: 'argentina',
    label: 'ARGENTINA',
    icon: '🇦🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção argentina',
    query: "Team = 'Argentina'",
    countryCode: 'Argentina'
  },
  {
    id: 'france',
    label: 'FRANÇA',
    icon: '🇫🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção francesa',
    query: "Team = 'France'",
    countryCode: 'France'
  },
  {
    id: 'spain',
    label: 'ESPANHA',
    icon: '🇪🇸',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção espanhola',
    query: "Team = 'Spain'",
    countryCode: 'Spain'
  },
  {
    id: 'portugal',
    label: 'PORTUGAL',
    icon: '🇵🇹',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção portuguesa',
    query: "Team = 'Portugal'",
    countryCode: 'Portugal'
  },
  {
    id: 'england',
    label: 'INGLATERRA',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção inglesa',
    query: "Team = 'England'",
    countryCode: 'England'
  },
  {
    id: 'germany',
    label: 'ALEMANHA',
    icon: '🇩🇪',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção alemã',
    query: "Team = 'Germany'",
    countryCode: 'Germany'
  },
  {
    id: 'netherlands',
    label: 'HOLANDA',
    icon: '🇳🇱',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção holandesa',
    query: "Team = 'Netherlands'",
    countryCode: 'Netherlands'
  },
  {
    id: 'belgium',
    label: 'BÉLGICA',
    icon: '🇧🇪',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção belga',
    query: "Team = 'Belgium'",
    countryCode: 'Belgium'
  },
  {
    id: 'croatia',
    label: 'CROÁCIA',
    icon: '🇭🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção croata',
    query: "Team = 'Croatia'",
    countryCode: 'Croatia'
  },
  {
    id: 'morocco',
    label: 'MARROCOS',
    icon: '🇲🇦',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção marroquina',
    query: "Team = 'Morocco'",
    countryCode: 'Morocco'
  },
  {
    id: 'japan',
    label: 'JAPÃO',
    icon: '🇯🇵',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção japonesa',
    query: "Team = 'Japan'",
    countryCode: 'Japan'
  },
  {
    id: 'south_korea',
    label: 'COREIA DO SUL',
    icon: '🇰🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção sul-coreana',
    query: "Team = 'Korea Republic'",
    countryCode: 'Korea Republic'
  },
  {
    id: 'australia',
    label: 'AUSTRÁLIA',
    icon: '🇦🇺',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção australiana',
    query: "Team = 'Australia'",
    countryCode: 'Australia'
  },
  {
    id: 'canada',
    label: 'CANADÁ',
    icon: '🇨🇦',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção canadense',
    query: "Team = 'Canada'",
    countryCode: 'Canada'
  },
  {
    id: 'usa',
    label: 'EUA',
    icon: '🇺🇸',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção americana',
    query: "Team = 'USA'",
    countryCode: 'USA'
  },
  {
    id: 'mexico',
    label: 'MÉXICO',
    icon: '🇲🇽',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção mexicana',
    query: "Team = 'Mexico'",
    countryCode: 'Mexico'
  },
  {
    id: 'ecuador',
    label: 'EQUADOR',
    icon: '🇪🇨',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção equatoriana',
    query: "Team = 'Ecuador'",
    countryCode: 'Ecuador'
  },
  {
    id: 'uruguay',
    label: 'URUGUAI',
    icon: '🇺🇾',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção uruguaia',
    query: "Team = 'Uruguay'",
    countryCode: 'Uruguay'
  },
  {
    id: 'poland',
    label: 'POLÔNIA',
    icon: '🇵🇱',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção polonesa',
    query: "Team = 'Poland'",
    countryCode: 'Poland'
  },
  {
    id: 'denmark',
    label: 'DINAMARCA',
    icon: '🇩🇰',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção dinamarquesa',
    query: "Team = 'Denmark'",
    countryCode: 'Denmark'
  },
  {
    id: 'switzerland',
    label: 'SUÍÇA',
    icon: '🇨🇭',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção suíça',
    query: "Team = 'Switzerland'",
    countryCode: 'Switzerland'
  },
  {
    id: 'wales',
    label: 'PAÍS DE GALES',
    icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção galesa',
    query: "Team = 'Wales'",
    countryCode: 'Wales'
  },
  {
    id: 'serbia',
    label: 'SÉRVIA',
    icon: '🇷🇸',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção sérvia',
    query: "Team = 'Serbia'",
    countryCode: 'Serbia'
  },
  {
    id: 'cameroon',
    label: 'CAMARÕES',
    icon: '🇨🇲',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção camaronesa',
    query: "Team = 'Cameroon'",
    countryCode: 'Cameroon'
  },
  {
    id: 'ghana',
    label: 'GANA',
    icon: '🇬🇭',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção ganense',
    query: "Team = 'Ghana'",
    countryCode: 'Ghana'
  },
  {
    id: 'senegal',
    label: 'SENEGAL',
    icon: '🇸🇳',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção senegalesa',
    query: "Team = 'Senegal'",
    countryCode: 'Senegal'
  },
  {
    id: 'tunisia',
    label: 'TUNÍSIA',
    icon: '🇹🇳',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção tunisiana',
    query: "Team = 'Tunisia'",
    countryCode: 'Tunisia'
  },
  {
    id: 'iran',
    label: 'IRÃ',
    icon: '🇮🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção iraniana',
    query: "Team = 'IR Iran'",
    countryCode: 'IR Iran'
  },
  {
    id: 'saudi_arabia',
    label: 'ARÁBIA SAUDITA',
    icon: '🇸🇦',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção saudita',
    query: "Team = 'Saudi Arabia'",
    countryCode: 'Saudi Arabia'
  },
  {
    id: 'qatar',
    label: 'QATAR',
    icon: '🇶🇦',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção qatari',
    query: "Team = 'Qatar'",
    countryCode: 'Qatar'
  },
  {
    id: 'costa_rica',
    label: 'COSTA RICA',
    icon: '🇨🇷',
    type: 'player',
    category: 'country',
    description: 'Jogador da seleção costa-riquenha',
    query: "Team = 'Costa Rica'",
    countryCode: 'Costa Rica'
  }
]

export const TEAM_CARDS: BingoCard[] = [
  // Seleções específicas
  {
    id: 'team_brazil',
    label: 'BRASIL',
    icon: '🇧🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção brasileira',
    query: "team = 'Brazil'",
    countryCode: 'Brazil'
  },
  {
    id: 'team_argentina',
    label: 'ARGENTINA',
    icon: '🇦🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção argentina',
    query: "team = 'Argentina'",
    countryCode: 'Argentina'
  },
  {
    id: 'team_france',
    label: 'FRANÇA',
    icon: '🇫🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção francesa',
    query: "team = 'France'",
    countryCode: 'France'
  },
  {
    id: 'team_spain',
    label: 'ESPANHA',
    icon: '🇪🇸',
    type: 'team',
    category: 'country',
    description: 'Seleção espanhola',
    query: "team = 'Spain'",
    countryCode: 'Spain'
  },
  {
    id: 'team_portugal',
    label: 'PORTUGAL',
    icon: '🇵🇹',
    type: 'team',
    category: 'country',
    description: 'Seleção portuguesa',
    query: "team = 'Portugal'",
    countryCode: 'Portugal'
  },
  {
    id: 'team_england',
    label: 'INGLATERRA',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    type: 'team',
    category: 'country',
    description: 'Seleção inglesa',
    query: "team = 'England'",
    countryCode: 'England'
  },
  {
    id: 'team_germany',
    label: 'ALEMANHA',
    icon: '🇩🇪',
    type: 'team',
    category: 'country',
    description: 'Seleção alemã',
    query: "team = 'Germany'",
    countryCode: 'Germany'
  },
  {
    id: 'team_netherlands',
    label: 'HOLANDA',
    icon: '🇳🇱',
    type: 'team',
    category: 'country',
    description: 'Seleção holandesa',
    query: "team = 'Netherlands'",
    countryCode: 'Netherlands'
  },
  {
    id: 'team_belgium',
    label: 'BÉLGICA',
    icon: '🇧🇪',
    type: 'team',
    category: 'country',
    description: 'Seleção belga',
    query: "team = 'Belgium'",
    countryCode: 'Belgium'
  },
  {
    id: 'team_croatia',
    label: 'CROÁCIA',
    icon: '🇭🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção croata',
    query: "team = 'Croatia'",
    countryCode: 'Croatia'
  },
  {
    id: 'team_morocco',
    label: 'MARROCOS',
    icon: '🇲🇦',
    type: 'team',
    category: 'country',
    description: 'Seleção marroquina',
    query: "team = 'Morocco'",
    countryCode: 'Morocco'
  },
  {
    id: 'team_japan',
    label: 'JAPÃO',
    icon: '🇯🇵',
    type: 'team',
    category: 'country',
    description: 'Seleção japonesa',
    query: "team = 'Japan'",
    countryCode: 'Japan'
  },
  {
    id: 'team_south_korea',
    label: 'COREIA DO SUL',
    icon: '🇰🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção sul-coreana',
    query: "team = 'Korea Republic'",
    countryCode: 'Korea Republic'
  },
  {
    id: 'team_australia',
    label: 'AUSTRÁLIA',
    icon: '🇦🇺',
    type: 'team',
    category: 'country',
    description: 'Seleção australiana',
    query: "team = 'Australia'",
    countryCode: 'Australia'
  },
  {
    id: 'team_canada',
    label: 'CANADÁ',
    icon: '🇨🇦',
    type: 'team',
    category: 'country',
    description: 'Seleção canadense',
    query: "team = 'Canada'",
    countryCode: 'Canada'
  },
  {
    id: 'team_usa',
    label: 'EUA',
    icon: '🇺🇸',
    type: 'team',
    category: 'country',
    description: 'Seleção americana',
    query: "team = 'USA'",
    countryCode: 'USA'
  },
  {
    id: 'team_mexico',
    label: 'MÉXICO',
    icon: '🇲🇽',
    type: 'team',
    category: 'country',
    description: 'Seleção mexicana',
    query: "team = 'Mexico'",
    countryCode: 'Mexico'
  },
  {
    id: 'team_ecuador',
    label: 'EQUADOR',
    icon: '🇪🇨',
    type: 'team',
    category: 'country',
    description: 'Seleção equatoriana',
    query: "team = 'Ecuador'",
    countryCode: 'Ecuador'
  },
  {
    id: 'team_uruguay',
    label: 'URUGUAI',
    icon: '🇺🇾',
    type: 'team',
    category: 'country',
    description: 'Seleção uruguaia',
    query: "team = 'Uruguay'",
    countryCode: 'Uruguay'
  },
  {
    id: 'team_poland',
    label: 'POLÔNIA',
    icon: '🇵🇱',
    type: 'team',
    category: 'country',
    description: 'Seleção polonesa',
    query: "team = 'Poland'",
    countryCode: 'Poland'
  },
  {
    id: 'team_denmark',
    label: 'DINAMARCA',
    icon: '🇩🇰',
    type: 'team',
    category: 'country',
    description: 'Seleção dinamarquesa',
    query: "team = 'Denmark'",
    countryCode: 'Denmark'
  },
  {
    id: 'team_switzerland',
    label: 'SUÍÇA',
    icon: '🇨🇭',
    type: 'team',
    category: 'country',
    description: 'Seleção suíça',
    query: "team = 'Switzerland'",
    countryCode: 'Switzerland'
  },
  {
    id: 'team_wales',
    label: 'PAÍS DE GALES',
    icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    type: 'team',
    category: 'country',
    description: 'Seleção galesa',
    query: "team = 'Wales'",
    countryCode: 'Wales'
  },
  {
    id: 'team_serbia',
    label: 'SÉRVIA',
    icon: '🇷🇸',
    type: 'team',
    category: 'country',
    description: 'Seleção sérvia',
    query: "team = 'Serbia'",
    countryCode: 'Serbia'
  },
  {
    id: 'team_cameroon',
    label: 'CAMARÕES',
    icon: '🇨🇲',
    type: 'team',
    category: 'country',
    description: 'Seleção camaronesa',
    query: "team = 'Cameroon'",
    countryCode: 'Cameroon'
  },
  {
    id: 'team_ghana',
    label: 'GANA',
    icon: '🇬🇭',
    type: 'team',
    category: 'country',
    description: 'Seleção ganense',
    query: "team = 'Ghana'",
    countryCode: 'Ghana'
  },
  {
    id: 'team_senegal',
    label: 'SENEGAL',
    icon: '🇸🇳',
    type: 'team',
    category: 'country',
    description: 'Seleção senegalesa',
    query: "team = 'Senegal'",
    countryCode: 'Senegal'
  },
  {
    id: 'team_tunisia',
    label: 'TUNÍSIA',
    icon: '🇹🇳',
    type: 'team',
    category: 'country',
    description: 'Seleção tunisiana',
    query: "team = 'Tunisia'",
    countryCode: 'Tunisia'
  },
  {
    id: 'team_iran',
    label: 'IRÃ',
    icon: '🇮🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção iraniana',
    query: "team = 'IR Iran'",
    countryCode: 'IR Iran'
  },
  {
    id: 'team_saudi_arabia',
    label: 'ARÁBIA SAUDITA',
    icon: '🇸🇦',
    type: 'team',
    category: 'country',
    description: 'Seleção saudita',
    query: "team = 'Saudi Arabia'",
    countryCode: 'Saudi Arabia'
  },
  {
    id: 'team_qatar',
    label: 'QATAR',
    icon: '🇶🇦',
    type: 'team',
    category: 'country',
    description: 'Seleção qatari',
    query: "team = 'Qatar'",
    countryCode: 'Qatar'
  },
  {
    id: 'team_costa_rica',
    label: 'COSTA RICA',
    icon: '🇨🇷',
    type: 'team',
    category: 'country',
    description: 'Seleção costa-riquenha',
    query: "team = 'Costa Rica'",
    countryCode: 'Costa Rica'
  },

  // Estatísticas de time
  {
    id: 'possession_60plus',
    label: 'POSSE +60%',
    icon: '📊',
    type: 'team',
    category: 'stats',
    description: 'Seleção com mais de 60% de posse de bola',
    query: 'possession >= 60'
  },
  {
    id: 'team_goals_10plus',
    label: '10+ GOLS',
    icon: '⚽',
    type: 'team',
    category: 'stats',
    description: 'Seleção que marcou 10 ou mais gols',
    query: 'goals >= 10'
  },
  {
    id: 'team_assists_5plus',
    label: '5+ ASSISTS',
    icon: '🅰️',
    type: 'team',
    category: 'stats',
    description: 'Seleção com 5 ou mais assistências',
    query: 'assists >= 5'
  },
  {
    id: 'penalties_3plus',
    label: '3+ PÊNALTIS',
    icon: '🥅',
    type: 'team',
    category: 'stats',
    description: 'Seleção que bateu 3 ou mais pênaltis',
    query: 'pens_att >= 3'
  },
  {
    id: 'corners_20plus',
    label: '20+ ESCANTEIOS',
    icon: '📐',
    type: 'team',
    category: 'stats',
    description: 'Seleção com 20 ou mais escanteios',
    query: 'corners >= 20'
  },
  {
    id: 'clean_sheet',
    label: 'CLEAN SHEET',
    icon: '🛡️',
    type: 'team',
    category: 'stats',
    description: 'Seleção que não sofreu gols em pelo menos um jogo',
    query: 'gk_clean_sheets >= 1'
  },

  // Estatísticas de Grupo
  {
    id: 'first_place',
    label: '1º NO GRUPO',
    icon: '🥇',
    type: 'team',
    category: 'group',
    description: 'Terminou em primeiro lugar no grupo',
    query: 'rank = 1'
  },
  {
    id: 'second_place',
    label: '2º NO GRUPO',
    icon: '🥈',
    type: 'team',
    category: 'group',
    description: 'Terminou em segundo lugar no grupo',
    query: 'rank = 2'
  },
  {
    id: 'points_6plus',
    label: '6+ PONTOS',
    icon: '📊',
    type: 'team',
    category: 'group',
    description: 'Conquistou 6 ou mais pontos na fase de grupos',
    query: 'points >= 6'
  },
  {
    id: 'wins_2plus',
    label: '2+ VITÓRIAS',
    icon: '✅',
    type: 'team',
    category: 'group',
    description: 'Teve 2 ou mais vitórias na fase de grupos',
    query: 'wins >= 2'
  },
  {
    id: 'undefeated',
    label: 'SEM DERROTAS',
    icon: '🛡️',
    type: 'team',
    category: 'group',
    description: 'Não perdeu nenhum jogo na fase de grupos',
    query: 'losses = 0'
  },
  {
    id: 'goal_diff_3plus',
    label: 'SALDO +3',
    icon: '➕',
    type: 'team',
    category: 'group',
    description: 'Saldo de gols maior ou igual a 3',
    query: 'goal_difference >= 3'
  },

  // Participação em Fases
  {
    id: 'played_final',
    label: 'JOGOU FINAL',
    icon: '🏆',
    type: 'team',
    category: 'match',
    description: 'Participou da final da Copa',
    query: "venue = 'Final'"
  },
  {
    id: 'played_semifinal',
    label: 'JOGOU SEMIFINAL',
    icon: '🥉',
    type: 'team',
    category: 'match',
    description: 'Participou da semifinal',
    query: "venue = 'Semi-final'"
  },
  {
    id: 'group_a',
    label: 'GRUPO A',
    icon: '🔤',
    type: 'team',
    category: 'group',
    description: 'Participou do Grupo A',
    query: "group = 'A'"
  },
  {
    id: 'group_b',
    label: 'GRUPO B',
    icon: '🔤',
    type: 'team',
    category: 'group',
    description: 'Participou do Grupo B',
    query: "group = 'B'"
  }
]

export const getAllCards = (): BingoCard[] => [...PLAYER_CARDS, ...TEAM_CARDS]

export const getCardsByType = (type: 'player' | 'team'): BingoCard[] => {
  return type === 'player' ? PLAYER_CARDS : TEAM_CARDS
}

export const generateRandomBingoCards = (count: number = 16): BingoCard[] => {
  const allCards = getAllCards()
  const shuffled = [...allCards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const getCardById = (id: string): BingoCard | undefined => {
  return getAllCards().find(card => card.id === id)
}
