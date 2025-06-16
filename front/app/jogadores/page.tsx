"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, User, Trophy, Users, Building } from "lucide-react"
import { usePlayer, usePlayersByTeam, usePlayersByClub, useTopScorer, useAllPlayers } from "@/hooks/use-api"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function JogadoresPage() {
  const [searchType, setSearchType] = useState<"player" | "team" | "club">("player")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")

  const {
    data: player,
    loading: playerLoading,
    error: playerError,
  } = usePlayer(searchType === "player" ? currentSearch : "")
  const {
    data: teamPlayers,
    loading: teamLoading,
    error: teamError,
  } = usePlayersByTeam(searchType === "team" ? currentSearch : "")
  const {
    data: clubPlayers,
    loading: clubLoading,
    error: clubError,
  } = usePlayersByClub(searchType === "club" ? currentSearch : "")
  const { data: topScorer, loading: topScorerLoading, error: topScorerError } = useTopScorer()
  const { data: allPlayers, loading: allPlayersLoading, error: allPlayersError } = useAllPlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [showHighlights, setShowHighlights] = useState(false);

  // Novo filtro para busca por nome, clube ou time
  const filteredPlayers = (allPlayers || []).filter((player) => {
    const term = searchTerm.toLowerCase();
    return (
      player.name?.toLowerCase().includes(term) ||
      player.Team?.toLowerCase().includes(term) ||
      player.Club?.toLowerCase().includes(term)
    );
  });

  const handleSearch = () => {
    setCurrentSearch(searchTerm)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const loading = playerLoading || teamLoading || clubLoading
  const error = playerError || teamError || clubError
  const results = searchType === "player" ? (player ? [player] : []) : searchType === "team" ? teamPlayers : clubPlayers

  // Rankings
  const topScorers = [...(allPlayers || [])].sort((a, b) => (b.Gls || 0) - (a.Gls || 0)).slice(0, 5);
  const topAssists = [...(allPlayers || [])].sort((a, b) => (b.Ast || 0) - (a.Ast || 0)).slice(0, 5);
  const topYellow = [...(allPlayers || [])].sort((a, b) => (b.CrdY || 0) - (a.CrdY || 0)).slice(0, 5);
  const topRed = [...(allPlayers || [])].sort((a, b) => (b.CrdR || 0) - (a.CrdR || 0)).slice(0, 5);

  if (allPlayersLoading) return <LoadingSpinner message="Carregando jogadores..." />;
  if (allPlayersError) return <ErrorMessage message={allPlayersError} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Jogadores da Copa 2022</h1>
        <p className="text-slate-400">Explore os craques que brilharam nos gramados do Catar</p>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <Input
          className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 rounded-lg px-4 py-2 w-full max-w-md shadow focus:ring-2 focus:ring-amber-400"
          placeholder="Digite o nome, clube ou seleção"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          className="bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 px-4 py-2 rounded-lg shadow"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5 mr-1" />Buscar
        </Button>
        <Button
          className="bg-slate-900 border border-amber-400 text-amber-400 font-bold hover:bg-amber-400 hover:text-slate-900 px-4 py-2 rounded-lg shadow"
          onClick={() => setShowHighlights(true)}
        >
          Destaques
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800 shadow-lg">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr className="bg-slate-900">
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider rounded-tl-xl">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider">Clube</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider">Posição</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider">Gols</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider">Assistências</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-amber-300 uppercase tracking-wider rounded-tr-xl">Idade</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers?.map((player) => (
              <tr
                key={player.name}
                className="hover:bg-amber-400/10 transition-colors cursor-pointer border-b border-slate-700 last:border-b-0"
                onClick={() => setSelectedPlayer(player)}
              >
                <td className="px-6 py-3 text-slate-100 font-semibold whitespace-nowrap">{player.name}</td>
                <td className="px-6 py-3 text-slate-200 whitespace-nowrap">{player.Team}</td>
                <td className="px-6 py-3 text-slate-200 whitespace-nowrap">{player.Club}</td>
                <td className="px-6 py-3 text-slate-200 whitespace-nowrap">{player.Pos}</td>
                <td className="px-6 py-3 text-slate-200 whitespace-nowrap">{player.Gls}</td>
                <td className="px-6 py-3 text-slate-200 whitespace-nowrap">{player.Ast}</td>
                <td className="px-6 py-3 text-slate-200 whitespace-nowrap">{player.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8 max-w-3xl w-full min-h-[420px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400 text-center mb-2">
              {selectedPlayer?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-center mb-4">
              Detalhes completos do jogador
            </DialogDescription>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Time:</strong> <span className="text-white">{selectedPlayer?.Team}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Clube:</strong> <span className="text-white">{selectedPlayer?.Club}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Posição:</strong> <span className="text-white">{selectedPlayer?.Pos}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Idade:</strong> <span className="text-white">{selectedPlayer?.Age}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Gols:</strong> <span className="text-white">{selectedPlayer?.Gls}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Assistências:</strong> <span className="text-white">{selectedPlayer?.Ast}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Minutos jogados:</strong> <span className="text-white">{selectedPlayer?.Minutes_played}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Partidas:</strong> <span className="text-white">{selectedPlayer?.Match_played}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Cartões Amarelos:</strong> <span className="text-white">{selectedPlayer?.CrdY}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Cartões Vermelhos:</strong> <span className="text-white">{selectedPlayer?.CrdR}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Faltas cometidas:</strong> <span className="text-white">{selectedPlayer?.fouls_committed}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Faltas sofridas:</strong> <span className="text-white">{selectedPlayer?.fouls_drawn}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Passes completos %:</strong> <span className="text-white">{selectedPlayer?.['pass_comp%']}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Dribles certos %:</strong> <span className="text-white">{selectedPlayer?.['successful_dribbles%']}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Disputas aéreas vencidas:</strong> <span className="text-white">{selectedPlayer?.aerial_duo_won}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Chutes:</strong> <span className="text-white">{selectedPlayer?.Shots}</span></div>
              <div className="bg-slate-900 rounded-lg p-2"><strong className="text-amber-300">Chutes no alvo:</strong> <span className="text-white">{selectedPlayer?.shots_on_target}</span></div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showHighlights} onOpenChange={setShowHighlights}>
        <DialogContent className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8 max-w-3xl w-full min-h-[420px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-400 text-center mb-2">
              Destaques da Copa 2022
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="gols" className="w-full mt-4">
            <TabsList className="flex justify-center gap-2 bg-slate-900 rounded-lg p-1 mb-6">
              <TabsTrigger value="gols" className="data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900 rounded-lg px-4 py-2 font-bold">Gols</TabsTrigger>
              <TabsTrigger value="assistencias" className="data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900 rounded-lg px-4 py-2 font-bold">Assistências</TabsTrigger>
              <TabsTrigger value="cartoes" className="data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900 rounded-lg px-4 py-2 font-bold">Cartões</TabsTrigger>
            </TabsList>
            <TabsContent value="gols">
              <div className="space-y-2">
                {topScorers.map((p, i) => (
                  <div key={p.name} className="flex items-center justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span className="font-bold text-amber-400">{i + 1}.</span>
                    <span className="font-semibold text-white flex-1 ml-3">{p.name}</span>
                    <span className="text-slate-400 mr-3">{p.Team}</span>
                    <span className="font-bold text-amber-400 text-lg">{p.Gls}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="assistencias">
              <div className="space-y-2">
                {topAssists.map((p, i) => (
                  <div key={p.name} className="flex items-center justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span className="font-bold text-amber-400">{i + 1}.</span>
                    <span className="font-semibold text-white flex-1 ml-3">{p.name}</span>
                    <span className="text-slate-400 mr-3">{p.Team}</span>
                    <span className="font-bold text-amber-400 text-lg">{p.Ast}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="cartoes">
              <div className="space-y-4">
                <div>
                  <div className="font-bold text-amber-400 mb-1">Amarelos</div>
                  {topYellow.map((p, i) => (
                    <div key={p.name} className="flex items-center justify-between bg-slate-900 rounded-lg px-4 py-2 mb-1">
                      <span className="font-bold text-amber-400">{i + 1}.</span>
                      <span className="font-semibold text-white flex-1 ml-3">{p.name}</span>
                      <span className="text-slate-400 mr-3">{p.Team}</span>
                      <span className="font-bold text-yellow-400 text-lg">{p.CrdY}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-amber-400 mb-1">Vermelhos</div>
                  {topRed.map((p, i) => (
                    <div key={p.name} className="flex items-center justify-between bg-slate-900 rounded-lg px-4 py-2 mb-1">
                      <span className="font-bold text-amber-400">{i + 1}.</span>
                      <span className="font-semibold text-white flex-1 ml-3">{p.name}</span>
                      <span className="text-slate-400 mr-3">{p.Team}</span>
                      <span className="font-bold text-red-500 text-lg">{p.CrdR}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
