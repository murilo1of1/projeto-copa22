"use client";

import { useState } from "react";

interface FlagIconProps {
  countryCode: string;
  className?: string;
  alt?: string;
}
// Função para normalizar o nome do país para busca no mapeamento
function normalizeCountryName(name: string): string {
  if (!name) return "";

  const normalized = name.trim().toLowerCase();

  const nameVariations: Record<string, string> = {
    usa: "united states",
    "united states": "united states",
    "korea republic": "south korea",
    "south korea": "south korea",
    "ir iran": "iran",
    iran: "iran",
    "saudi arabia": "saudi arabia",
    "costa rica": "costa rica",
    england: "england",
    wales: "wales",
    netherlands: "netherlands",
    "ivory coast": "ivory coast",
  };

  return nameVariations[normalized] || normalized;
}

// Mapeamento de países para códigos ISO
const countryCodeMap: Record<string, string> = {
  qatar: "qa",
  england: "gb-eng",
  senegal: "sn",
  "united states": "us",
  argentina: "ar",
  denmark: "dk",
  mexico: "mx",
  france: "fr",
  morocco: "ma",
  germany: "de",
  spain: "es",
  belgium: "be",
  switzerland: "ch",
  uruguay: "uy",
  portugal: "pt",
  brazil: "br",
  wales: "gb-wls",
  netherlands: "nl",
  tunisia: "tn",
  poland: "pl",
  japan: "jp",
  croatia: "hr",
  cameroon: "cm",
  "south korea": "kr",
  ecuador: "ec",
  iran: "ir",
  australia: "au",
  "saudi arabia": "sa",
  canada: "ca",
  "costa rica": "cr",
  ghana: "gh",
  serbia: "rs",
  "ivory coast": "ci",
};

export function FlagIcon({
  countryCode,
  className = "w-6 h-4",
  alt,
}: FlagIconProps) {
  const [imageError, setImageError] = useState(false);

  // Normaliza o nome do país e busca no mapeamento
  const normalizedName = normalizeCountryName(countryCode);
  const isoCode = countryCodeMap[normalizedName] || normalizedName;

  // Debug: log países não mapeados
  if (!countryCodeMap[normalizedName] && countryCode) {
    console.log(
      `País não mapeado: "${countryCode}" -> normalizado: "${normalizedName}" -> usando fallback: "${isoCode}"`
    );
  }

  if (imageError) {
    // Fallback para emojis se a imagem falhar
    const flagEmojis: Record<string, string> = {
      qa: "��",
      "gb-eng": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      sn: "��",
      us: "��",
      ar: "�🇷",
      dk: "��",
      mx: "��",
      fr: "�🇷",
      ma: "🇲🇦",
      de: "��",
      es: "�🇸",
      be: "��",
      ch: "🇨🇭",
      uy: "🇺🇾",
      pt: "🇵�",
      br: "��",
      "gb-wls": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
      nl: "🇳🇱",
      tn: "��",
      pl: "��",
      jp: "��",
      hr: "��",
      cm: "��",
      kr: "�🇷",
      ec: "��",
      ir: "🇮🇷",
      au: "�🇺",
      sa: "🇸🇦",
      ca: "🇨�",
      cr: "🇨🇷",
      gh: "��",
      rs: "🇷🇸",
    };

    const emoji =
      flagEmojis[isoCode] || flagEmojis[countryCode.toLowerCase()] || "🏳️";

    return (
      <span
        className={`text-base ${className}`}
        title={`${countryCode} (emoji fallback)`}
      >
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${isoCode}.png`}
      alt={alt || `Bandeira ${countryCode}`}
      className={className}
      onError={() => {
        console.log(
          `Falha ao carregar bandeira para ${countryCode} (${isoCode})`
        );
        setImageError(true);
      }}
      loading="lazy"
      title={`${countryCode} (${isoCode})`}
    />
  );
}
