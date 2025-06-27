"use client"

import { useState } from "react"

interface FlagIconProps {
  countryCode: string
  className?: string
  alt?: string
}

// Mapeamento de países para códigos ISO
const countryCodeMap: Record<string, string> = {
  'Qatar': 'qa',
  'England': 'gb-eng',
  'Senegal': 'sn',
  'United States': 'us',
  'Argentina': 'ar',
  'Denmark': 'dk',
  'Mexico': 'mx',
  'France': 'fr',
  'Morocco': 'ma',
  'Germany': 'de',
  'Spain': 'es',
  'Belgium': 'be',
  'Switzerland': 'ch',
  'Uruguay': 'uy',
  'Portugal': 'pt',
  'Brazil': 'br',
  'Wales': 'gb-wls',
  'Netherlands': 'nl',
  'Tunisia': 'tn',
  'Poland': 'pl',
  'Japan': 'jp',
  'Croatia': 'hr',
  'Cameroon': 'cm',
  'Korea Republic': 'kr',
  'Ecuador': 'ec',
  'Iran': 'ir',
  'Australia': 'au',
  'Saudi Arabia': 'sa',
  'Canada': 'ca',
  'Costa Rica': 'cr',
  'Ghana': 'gh',
  'Serbia': 'rs',
  
  'USA': 'us',
  'IR Iran': 'ir',
  'South Korea': 'kr'
}

export function FlagIcon({ countryCode, className = "w-6 h-4", alt }: FlagIconProps) {
  const [imageError, setImageError] = useState(false)
  
  const isoCode = countryCodeMap[countryCode] || countryCode.toLowerCase()
  
  // Debug: log países não mapeados
  if (!countryCodeMap[countryCode] && countryCode) {
    console.log(`País não mapeado: "${countryCode}" -> usando fallback: "${isoCode}"`)
  }
  
  if (imageError) {
    // Fallback para emojis se a imagem falhar
    const flagEmojis: Record<string, string> = {
      'qa': '��', 'gb-eng': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'sn': '��', 'us': '��', 'ar': '�🇷', 
      'dk': '��', 'mx': '��', 'fr': '�🇷', 'ma': '🇲🇦', 'de': '��', 
      'es': '�🇸', 'be': '��', 'ch': '🇨🇭', 'uy': '🇺🇾', 'pt': '🇵�', 
      'br': '��', 'gb-wls': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'nl': '🇳🇱', 'tn': '��', 'pl': '��', 
      'jp': '��', 'hr': '��', 'cm': '��', 'kr': '�🇷', 'ec': '��', 
      'ir': '🇮🇷', 'au': '�🇺', 'sa': '🇸🇦', 'ca': '🇨�', 'cr': '🇨🇷', 
      'gh': '��', 'rs': '🇷🇸'
    }
    
    const emoji = flagEmojis[isoCode] || flagEmojis[countryCode.toLowerCase()] || '🏳️'
    
    return (
      <span className={`text-base ${className}`} title={`${countryCode} (emoji fallback)`}>
        {emoji}
      </span>
    )
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${isoCode}.png`}
      alt={alt || `Bandeira ${countryCode}`}
      className={className}
      onError={() => {
        console.log(`Falha ao carregar bandeira para ${countryCode} (${isoCode})`)
        setImageError(true)
      }}
      loading="lazy"
      title={`${countryCode} (${isoCode})`}
    />
  )
}
