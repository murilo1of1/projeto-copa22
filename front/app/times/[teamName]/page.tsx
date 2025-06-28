"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Trophy,
  Target,
  Users,
  Calendar,
  Medal,
} from "lucide-react";
import { useTeam, usePlayersByTeam } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { FlagIcon } from "@/components/flag-icon";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TeamDetailPageProps {
  params: {
    teamName: string;
  };
}

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const teamNameDecoded = decodeURIComponent(params.teamName);

  const {
    data: team,
    loading: teamLoading,
    error: teamError,
  } = useTeam(teamNameDecoded);
  const {
    data: players,
    loading: playersLoading,
    error: playersError,
  } = usePlayersByTeam(teamNameDecoded);

  if (teamLoading)
    return <LoadingSpinner message="Carregando detalhes do time..." />;
  if (teamError) return <ErrorMessage message={teamError} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/times">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-white flex items-center mb-1">
        <FlagIcon
          countryCode={team?.name || ""}
          className="w-8 h-5 mr-3"
          alt={`Bandeira ${team?.name}`}
        />
        {team?.name}
        {team?.champion ? (
          <span className="ml-2" aria-label="Campeão" title="Campeão">
            <Medal className="h-6 w-6 text-yellow-400" />
          </span>
        ) : team?.second_place ? (
          <span className="ml-2" aria-label="Vice-campeão" title="Vice-campeão">
            <Medal className="h-6 w-6 text-gray-300" />
          </span>
        ) : team?.third_place ? (
          <span className="ml-2" aria-label="3º lugar" title="3º lugar">
            <Medal className="h-6 w-6 text-amber-700" />
          </span>
        ) : null}
      </h1>
      {team?.country && (
        <p className="text-lg text-slate-300 mb-6">{team.country}</p>
      )}

      {/* Team Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team?.country && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                País
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{team.country}</p>
            </CardContent>
          </Card>
        )}
        {team?.group && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Target className="h-4 w-4 mr-1" />
                Grupo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Grupo {team.group}</p>
            </CardContent>
          </Card>
        )}
        {team?.points !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                Pontos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{team.points}</p>
            </CardContent>
          </Card>
        )}
        {/* Adicione aqui mais cards de informações gerais se desejar */}
      </div>

      {/* Desempenho e Gols */}
      {(team?.wins !== undefined ||
        team?.ties !== undefined ||
        team?.losses !== undefined ||
        team?.goals !== undefined) && (
        <Card className="mb-8 bg-[#020818] border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-2xl">
              <Calendar className="h-5 w-5 mr-2" />
              Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {team.wins !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.wins}</p>
                  <p className="text-sm text-gray-400">Vitórias</p>
                </div>
              )}
              {team.ties !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.ties}</p>
                  <p className="text-sm text-gray-400">Empates</p>
                </div>
              )}
              {team.losses !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.losses}</p>
                  <p className="text-sm text-gray-400">Derrotas</p>
                </div>
              )}
              {team.goals !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.goals}</p>
                  <p className="text-sm text-gray-400">Gols</p>
                </div>
              )}
              {team.pens_made !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.pens_made}
                  </p>
                  <p className="text-sm text-gray-400">Gols de Pênalti</p>
                </div>
              )}
              {team.possession !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.possession}%
                  </p>
                  <p className="text-sm text-gray-400">Posse</p>
                </div>
              )}
              {team.xg !== undefined && team.games > 0 && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {(team.xg / team.games).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">xG/jogo</p>
                </div>
              )}
              {team.assists !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.assists}
                  </p>
                  <p className="text-sm text-gray-400">Assistências</p>
                </div>
              )}
              {team.cards_yellow !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.cards_yellow}
                  </p>
                  <p className="text-sm text-gray-400">Cartões Amarelos</p>
                </div>
              )}
              {team.cards_red !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.cards_red}
                  </p>
                  <p className="text-sm text-gray-400">Cartões Vermelhos</p>
                </div>
              )}
              {team.shots !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.shots}</p>
                  <p className="text-sm text-gray-400">Chutes</p>
                </div>
              )}
              {team.shots_on_target !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.shots_on_target}
                  </p>
                  <p className="text-sm text-gray-400">Chutes no Alvo</p>
                </div>
              )}
              {team.tackles !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.tackles}
                  </p>
                  <p className="text-sm text-gray-400">Desarmes</p>
                </div>
              )}
              {team.interceptions !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.interceptions}
                  </p>
                  <p className="text-sm text-gray-400">Interceptações</p>
                </div>
              )}
              {team.clearances !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.clearances}
                  </p>
                  <p className="text-sm text-gray-400">Rebatidas</p>
                </div>
              )}
              {team.fouls !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.fouls}</p>
                  <p className="text-sm text-gray-400">Faltas Cometidas</p>
                </div>
              )}
              {team.fouled !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">{team.fouled}</p>
                  <p className="text-sm text-gray-400">Faltas Sofridas</p>
                </div>
              )}
              {team.gk_clean_sheets !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-white">
                    {team.gk_clean_sheets}
                  </p>
                  <p className="text-sm text-gray-400">Clean Sheets</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Players */}
      <Card className="bg-[#020818] border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Jogadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {playersLoading ? (
            <LoadingSpinner message="Carregando jogadores..." />
          ) : playersError ? (
            <ErrorMessage message={playersError} />
          ) : players && players.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, index) => (
                <div
                  key={player.name || index}
                  className="p-4 border rounded-lg"
                >
                  <h3 className="font-semibold">{player.name}</h3>
                  {player.position && (
                    <Badge variant="outline" className="mt-1">
                      {player.position}
                    </Badge>
                  )}
                  {player.club && (
                    <p className="text-sm text-gray-600 mt-1">
                      Clube: {player.club}
                    </p>
                  )}
                  {player.goals !== undefined && (
                    <p className="text-sm text-gray-600">
                      Gols: {player.goals}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum jogador encontrado</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
