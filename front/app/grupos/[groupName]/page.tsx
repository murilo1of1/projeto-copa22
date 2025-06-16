"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Users, Calendar, TrendingUp } from "lucide-react"
import { useGroup, useMatchesByGroup } from "@/hooks/use-api"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import Link from "next/link"

interface GroupDetailPageProps {
  params: {
    groupName: string
  }
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const groupName = decodeURIComponent(params.groupName)
  const { data: group, loading: groupLoading, error: groupError } = useGroup(groupName)
  const { data: matches, loading: matchesLoading, error: matchesError } = useMatchesByGroup(groupName)

  if (groupLoading) return <LoadingSpinner message="Carregando detalhes do grupo..." />
  if (groupError) return <ErrorMessage message={groupError} />

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/grupos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grupo {group?.name}</h1>
          <p className="text-gray-600">Classificação e estatísticas detalhadas</p>
        </div>
      </div>

      {/* Group Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {group?.totalMatches !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Partidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{group.totalMatches}</p>
            </CardContent>
          </Card>
        )}

        {group?.totalGoals !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Gols</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{group.totalGoals}</p>
            </CardContent>
          </Card>
        )}

        {group?.avgGoalsPerMatch !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Média de Gols
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">{group.avgGoalsPerMatch.toFixed(1)}</p>
              <p className="text-sm text-gray-500">por partida</p>
            </CardContent>
          </Card>
        )}

        {group?.teams && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">
                {Array.isArray(group.teams) ? group.teams.length : group.teams}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Leader Highlight */}
      {group?.leader && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <Trophy className="h-5 w-5 mr-2" />
              Líder do Grupo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-yellow-900">{group.leader}</p>
          </CardContent>
        </Card>
      )}

      {/* Teams List */}
      {group?.teams && Array.isArray(group.teams) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Times do Grupo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.teams.map((team, index) => (
                <Link key={team.name || index} href={`/times/${encodeURIComponent(team.name || "")}`}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold">{team.name}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      {team.points !== undefined && (
                        <div className="flex justify-between">
                          <span>Pontos:</span>
                          <Badge variant="secondary">{team.points}</Badge>
                        </div>
                      )}
                      {team.goals !== undefined && (
                        <div className="flex justify-between">
                          <span>Gols:</span>
                          <span>{team.goals}</span>
                        </div>
                      )}
                      {team.wins !== undefined && (
                        <div className="flex justify-between">
                          <span>Vitórias:</span>
                          <span>{team.wins}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Partidas do Grupo
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matchesLoading ? (
            <LoadingSpinner message="Carregando partidas..." />
          ) : matchesError ? (
            <ErrorMessage message={matchesError} />
          ) : matches && matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">{match.homeTeam}</span>
                      <div className="flex items-center space-x-2">
                        {match.homeScore !== undefined && match.awayScore !== undefined ? (
                          <span className="text-lg font-bold">
                            {match.homeScore} - {match.awayScore}
                          </span>
                        ) : (
                          <span className="text-gray-400">vs</span>
                        )}
                      </div>
                      <span className="font-semibold">{match.awayTeam}</span>
                    </div>

                    {match.status && (
                      <Badge variant={match.status === "finished" ? "default" : "secondary"}>
                        {match.status === "finished" ? "Finalizada" : match.status === "live" ? "Ao Vivo" : "Agendada"}
                      </Badge>
                    )}
                  </div>

                  {(match.date || match.venue) && (
                    <div className="mt-2 text-sm text-gray-600">
                      {match.date && <span>{new Date(match.date).toLocaleDateString("pt-BR")}</span>}
                      {match.date && match.venue && <span> • </span>}
                      {match.venue && <span>{match.venue}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma partida encontrada para este grupo</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
