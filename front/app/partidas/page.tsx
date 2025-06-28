"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  useMatches,
  useMatchesByGroup,
  useGroups,
  useTeams,
} from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { FlagIcon } from "@/components/flag-icon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function parseScore(score: string) {
  const regex = /(?:\((\d+)\)\s*)?(\d+),(\d+)(?:\s*\((\d+)\))?/;
  const match = score ? score.match(regex) : null;
  if (!match)
    return {
      team_1_goals: undefined,
      team_2_goals: undefined,
      team_1_penalties: undefined,
      team_2_penalties: undefined,
    };
  return {
    team_1_goals: Number(match[2]),
    team_2_goals: Number(match[3]),
    team_1_penalties:
      match[1] !== undefined
        ? Number(match[1])
        : match[4] !== undefined
        ? Number(match[4])
        : undefined,
    team_2_penalties:
      match[4] !== undefined
        ? Number(match[4])
        : match[1] !== undefined
        ? Number(match[1])
        : undefined,
  };
}

export default function PartidasPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const {
    data: allMatches,
    loading: allLoading,
    error: allError,
  } = useMatches();
  const {
    data: groupMatches,
    loading: groupLoading,
    error: groupError,
  } = useMatchesByGroup(selectedGroup);
  const { data: groups } = useGroups();
  const { data: teams } = useTeams();

  const groupAndStageOptions = [
    { value: "all", label: "Todas as partidas" },
    { value: "Group A", label: "Grupo A" },
    { value: "Group B", label: "Grupo B" },
    { value: "Group C", label: "Grupo C" },
    { value: "Group D", label: "Grupo D" },
    { value: "Group E", label: "Grupo E" },
    { value: "Group F", label: "Grupo F" },
    { value: "Group G", label: "Grupo G" },
    { value: "Group H", label: "Grupo H" },
    { value: "Round of 16", label: "Oitavas de final" },
    { value: "Quarter-final", label: "Quartas de final" },
    { value: "Semi-Final", label: "Semifinal" },
    { value: "Play-off for third place", label: "Disputa 3º lugar" },
    { value: "Final", label: "Final" },
  ];

  const matches =
    selectedGroup === "all"
      ? allMatches
      : allMatches?.filter(
          (match) =>
            String(match.group).toLowerCase() === selectedGroup.toLowerCase()
        );

  const loading = selectedGroup === "all" ? allLoading : groupLoading;
  const error = selectedGroup === "all" ? allError : groupError;

  function extractPenalties(score: string) {
    const regex = /\((\d+)\)[^\d]+[\d,]+[^\d]+\((\d+)\)/;
    const match = score ? score.match(regex) : null;
    if (match) {
      return {
        team_1_penalties: Number(match[1]),
        team_2_penalties: Number(match[2]),
      };
    }
    return null;
  }

  const matchesParsed = matches?.map((match) => {
    const parsed = parseScore(match.score);
    const penalties = extractPenalties(match.score);
    return {
      ...match,
      ...parsed,
      team_1_penalties: penalties?.team_1_penalties,
      team_2_penalties: penalties?.team_2_penalties,
    };
  });

  if (loading) return <LoadingSpinner message="Carregando partidas..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Partidas da Copa 2022
          </h1>
          <p className="text-slate-400">
            Acompanhe todas as 64 partidas realizadas no Catar
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {matches?.length || 0} partidas
        </Badge>
      </div>
      <div className="max-w-xs">
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por grupo ou fase" />
          </SelectTrigger>
          <SelectContent>
            {groupAndStageOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchesParsed?.map((match, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 bg-slate-800 border-slate-700 cursor-pointer">
                <CardHeader className="pb-3">
                  <span className="text-xs font-semibold text-amber-300 mb-1">
                    {match.group || match.round || ""}
                  </span>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div
                      className="relative w-full flex items-center justify-between"
                      style={{ minHeight: 40 }}
                    >
                      <div className="flex items-center space-x-2 w-2/5">
                        <FlagIcon
                          countryCode={match.team_1 || match.homeTeam || ""}
                          className="w-5 h-3 flex-shrink-0"
                          alt={`Bandeira ${match.team_1 || match.homeTeam}`}
                        />
                        <span className="font-semibold text-white text-sm truncate">
                          {match.team_1 || match.homeTeam || "Time A"}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-amber-400 text-center w-1/5">
                        {match.team_1_goals !== undefined &&
                        match.team_2_goals !== undefined ? (
                          <>
                            {match.team_1_goals} - {match.team_2_goals}
                          </>
                        ) : (
                          <span className="text-slate-500">vs</span>
                        )}
                      </span>
                      <div className="flex items-center space-x-2 w-2/5 justify-end">
                        <span className="font-semibold text-white text-sm truncate">
                          {match.team_2 || match.awayTeam || "Time B"}
                        </span>
                        <FlagIcon
                          countryCode={match.team_2 || match.awayTeam || ""}
                          className="w-5 h-3 flex-shrink-0"
                          alt={`Bandeira ${match.team_2 || match.awayTeam}`}
                        />
                      </div>
                    </div>
                    {/* Exibe pênaltis só se o score tiver parênteses e penalties extraídos */}
                    {match.team_1_penalties !== undefined &&
                      match.team_2_penalties !== undefined && (
                        <div className="mt-1 text-xs text-amber-300 font-semibold text-center">
                          ({match.team_1_penalties}){" "}
                          <span className="mx-1">x</span> (
                          {match.team_2_penalties})
                        </div>
                      )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {match.date && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-white">{match.date}</span>
                      </div>
                    )}
                    {match.hour && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-white">{match.hour}</span>
                      </div>
                    )}
                    {match.venue && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-white">{match.venue}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8 max-w-3xl w-full min-h-[420px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-amber-400 text-center mb-2">
                  {match.team_1}{" "}
                  <span className="text-white font-normal">vs</span>{" "}
                  {match.team_2}
                </DialogTitle>
                <div className="text-xs font-semibold text-amber-300 text-center mb-4">
                  {match.group || match.round}
                </div>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-900 rounded-lg p-3">
                  <p className="font-semibold text-white mb-1 text-center">
                    {match.team_1}
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>
                      Gols:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_goals}
                      </span>
                    </li>
                    <li>
                      xG:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_xg}
                      </span>
                    </li>
                    <li>
                      Posse:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_poss}%
                      </span>
                    </li>
                    <li>
                      Chutes:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_attempts}
                      </span>
                    </li>
                    <li>
                      No alvo:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_ontarget}
                      </span>
                    </li>
                    <li>
                      Escanteios:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_corners}
                      </span>
                    </li>
                    <li>
                      Cartões amarelos:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_yellow_cards}
                      </span>
                    </li>
                    <li>
                      Cartões vermelhos:{" "}
                      <span className="font-bold text-white">
                        {match.team_1_red_cards}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900 rounded-lg p-3">
                  <p className="font-semibold text-white mb-1 text-center">
                    {match.team_2}
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>
                      Gols:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_goals}
                      </span>
                    </li>
                    <li>
                      xG:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_xg}
                      </span>
                    </li>
                    <li>
                      Posse:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_poss}%
                      </span>
                    </li>
                    <li>
                      Chutes:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_attempts}
                      </span>
                    </li>
                    <li>
                      No alvo:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_ontarget}
                      </span>
                    </li>
                    <li>
                      Escanteios:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_corners}
                      </span>
                    </li>
                    <li>
                      Cartões amarelos:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_yellow_cards}
                      </span>
                    </li>
                    <li>
                      Cartões vermelhos:{" "}
                      <span className="font-bold text-white">
                        {match.team_2_red_cards}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-400 text-center">
                Árbitro: {match.referee}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {matches?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {selectedGroup !== "all"
              ? `Nenhuma partida encontrada para o Grupo ${selectedGroup}`
              : "Nenhuma partida encontrada"}
          </p>
        </div>
      )}
    </div>
  );
}
