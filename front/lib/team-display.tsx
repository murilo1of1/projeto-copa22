import { FlagIcon } from "@/components/flag-icon"

// Componente conveniente para exibir bandeira + nome do time
interface TeamDisplayProps {
  teamName: string
  className?: string
  showFlag?: boolean
  flagSize?: string
}

export function TeamDisplay({ 
  teamName, 
  className = "", 
  showFlag = true, 
  flagSize = "w-5 h-3" 
}: TeamDisplayProps) {
  if (!showFlag) {
    return <span className={className}>{teamName}</span>
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <FlagIcon 
        countryCode={teamName} 
        className={`${flagSize} flex-shrink-0`} 
        alt={`Bandeira ${teamName}`} 
      />
      <span>{teamName}</span>
    </div>
  )
}

// Lista de todas as seleções da Copa 2022 para validação
export const WORLD_CUP_2022_TEAMS = [
  'Brazil', 'Argentina', 'France', 'Spain', 'Portugal', 'England', 
  'Germany', 'Netherlands', 'Belgium', 'Croatia', 'Morocco', 'Japan',
  'Korea Republic', 'Australia', 'Canada', 'USA', 'Mexico', 'Ecuador',
  'Uruguay', 'Poland', 'Denmark', 'Switzerland', 'Wales', 'Serbia',
  'Cameroon', 'Ghana', 'Senegal', 'Tunisia', 'IR Iran', 'Saudi Arabia',
  'Qatar', 'Costa Rica'
]

// Função utilitária para verificar se um time é válido
export function isWorldCupTeam(teamName: string): boolean {
  return WORLD_CUP_2022_TEAMS.includes(teamName)
}
