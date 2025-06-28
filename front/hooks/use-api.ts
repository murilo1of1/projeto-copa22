"use client";

import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3000/api";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(endpoint: string, dependencies: any[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    };

    fetchData();
  }, [endpoint, ...dependencies]);

  return state;
}

export function useTeams() {
  return useApi<any[]>("/teams/");
}

export function useTeam(teamName: string) {
  return useApi<any>(teamName ? `/teams/${teamName}` : "", [teamName]);
}

export function useMatches() {
  return useApi<any[]>("/matches/");
}

export function useMatchesByGroup(groupName: string) {
  return useApi<any[]>(groupName ? `/matches/group/${groupName}` : "", [
    groupName,
  ]);
}

export function usePlayer(playerName: string) {
  return useApi<any>(playerName ? `/players/${playerName}` : "", [playerName]);
}

export function usePlayersByTeam(teamName: string) {
  return useApi<any[]>(teamName ? `/players/team/${teamName}` : "", [teamName]);
}

export function usePlayersByClub(clubName: string) {
  return useApi<any[]>(clubName ? `/players/club/${clubName}` : "", [clubName]);
}

export function useTopScorer() {
  return useApi<any>("/players/top-scorer");
}

export function useGroups() {
  return useApi<any[]>("/groups/");
}

export function useGroup(groupName: string) {
  return useApi<any>(groupName ? `/groups/${groupName}` : "", [groupName]);
}

export function useAllPlayers() {
  return useApi<any[]>("/players/");
}

export function useBingoData() {
  return useApi<any>("/bingo/data");
}
