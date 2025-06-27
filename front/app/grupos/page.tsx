"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Trophy, Users, TrendingUp } from "lucide-react"
import { useGroups } from "@/hooks/use-api"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { FlagIcon } from "@/components/flag-icon"
import Link from "next/link"

export default function GruposPage() {
  const { data: groups, loading, error } = useGroups()

  if (loading) return <LoadingSpinner message="Carregando grupos..." />
  if (error) return <ErrorMessage message={error} />

  // Agrupa os times por grupo usando os dados vindos de group_stats
  const groupLetters = ["A","B","C","D","E","F","G","H"];
  const groupedTeams: Record<string, any[]> = {};
  groups?.forEach((row: any) => {
    let groupKey = row.group;
    if (!isNaN(Number(row.group))) {
      groupKey = groupLetters[Number(row.group)-1] || row.group;
    }
    if (!groupedTeams[groupKey]) groupedTeams[groupKey] = [];
    groupedTeams[groupKey].push(row);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Grupos da Copa 2022</h1>
          <p className="text-slate-400">Classificações e estatísticas dos 8 grupos da fase inicial</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          8 grupos
        </Badge>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedTeams).map(([groupLetter, standings]) => (
          <Card key={groupLetter} className="w-full bg-[#0f172a] rounded-xl shadow transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-white">Grupo {groupLetter}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-lg bg-[#1e293b]">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead>
                    <tr className="bg-[#1e293b]">
                      <th className="pl-8 pr-3 py-2 text-left text-xs font-bold text-amber-300 uppercase tracking-wider"></th>
                      <th className="px-3 py-2 text-left text-xs font-bold text-amber-300 uppercase tracking-wider">Seleção</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">P</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">J</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">V</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">E</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">D</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">GP</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">GC</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-amber-300 uppercase tracking-wider">SG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team: any, idx: number) => (
                      <tr key={team.team} className="hover:bg-amber-400/10 transition-colors">
                        <td className="pl-8 pr-3 py-2 text-amber-400 font-bold text-center">{idx + 1}</td>
                        <td className="px-3 py-2 text-white font-semibold">
                          <div className="flex items-center space-x-2">
                            <FlagIcon 
                              countryCode={team.team || ''} 
                              className="w-5 h-3 flex-shrink-0" 
                              alt={`Bandeira ${team.team}`} 
                            />
                            <span>{team.team}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.points}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.matches_played}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.wins}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.draws}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.losses}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.goals_scored}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.goals_against}</td>
                        <td className="px-2 py-2 text-center text-slate-200">{team.goal_difference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {groups?.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum grupo encontrado</p>
        </div>
      )}
    </div>
  )
}
