"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy, Target, Users, Medal } from "lucide-react"
import { useTeams } from "@/hooks/use-api"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import Link from "next/link"

export default function TimesPage() {
  const { data: teams, loading, error } = useTeams()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeams =
    teams?.filter(
      (team) =>
        team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.country?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  if (loading) return <LoadingSpinner message="Carregando times..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Times da Copa 2022</h1>
          <p className="text-slate-400">Explore as 32 seleções que participaram da Copa do Catar</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {teams?.length || 0} times
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar time..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team, index) => (
          <Link key={team.name || index} href={`/times/${encodeURIComponent(team.name || "")}`}>
            <Card className="h-full hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer bg-slate-800 border-slate-700 hover:border-amber-500/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Users className="h-4 w-4 text-amber-400" />
                  <span>{String(team.name).replace(/0+$/g, "").replace(/\s+$/, "")}</span>
                  {Number(team.champion) === 1 && (
                    <span className="ml-1" aria-label="Campeão" title="Campeão">
                      <Medal className="h-5 w-5 text-yellow-400" />
                    </span>
                  )}
                  {Number(team.second_place) === 1 && Number(team.champion) !== 1 && (
                    <span className="ml-1" aria-label="Vice-campeão" title="Vice-campeão">
                      <Medal className="h-5 w-5 text-gray-300" />
                    </span>
                  )}
                  {Number(team.third_place) === 1 && Number(team.champion) !== 1 && Number(team.second_place) !== 1 && (
                    <span className="ml-1" aria-label="3º lugar" title="3º lugar">
                      <Medal className="h-5 w-5 text-amber-700" />
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-bold">{team.wins}</span>
                    <span className="text-xs text-gray-400">Vitórias</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-bold">{team.ties}</span>
                    <span className="text-xs text-gray-400">Empates</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-bold">{team.losses}</span>
                    <span className="text-xs text-gray-400">Derrotas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredTeams.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum time encontrado para "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}
