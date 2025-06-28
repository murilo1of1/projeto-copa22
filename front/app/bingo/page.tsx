"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, SkipForward } from "lucide-react";
import { generateRandomBingoCards, type BingoCard } from "@/lib/bingo-cards";
import {
  generateGameSequence,
  validateBingoAnswer,
  BINGO_ENTITIES,
} from "@/lib/bingo-answers";
import { FlagIcon } from "@/components/flag-icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GameState {
  currentEntityIndex: number;
  entities: string[];
  completedEntities: Set<string>;
  selectedSquares: string[];
  cards: BingoCard[];
  isGameComplete: boolean;
  totalTries: number;
  correctAnswersCount: number;

  errorSquares: string[];
  correctAnswers: Map<string, string>;
}

export default function BingoPage() {
  const [gameState, setGameState] = useState<GameState>({
    currentEntityIndex: 0,
    entities: [],
    completedEntities: new Set(),
    selectedSquares: [],
    cards: [],
    isGameComplete: false,
    totalTries: 0,
    correctAnswersCount: 0,
    errorSquares: [],
    correctAnswers: new Map(),
  });

  const [showEntityType, setShowEntityType] = useState<
    "player" | "team" | null
  >(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const entities = generateGameSequence();
    const cards = generateRandomBingoCards(16);

    setGameState((prev) => ({
      ...prev,
      entities,
      cards,
    }));
  }, []);

  useEffect(() => {
    if (gameState.entities.length > 0) {
      const currentEntity = gameState.entities[gameState.currentEntityIndex];
      const teamNames = [
        "Argentina",
        "France",
        "Brazil",
        "England",
        "Spain",
        "Portugal",
        "Netherlands",
        "Croatia",
        "Morocco",
        "Japan",
        "Germany",
        "Belgium",
        "Poland",
      ];

      setShowEntityType(teamNames.includes(currentEntity) ? "team" : "player");
    }
  }, [gameState.currentEntityIndex, gameState.entities]);

  const currentEntity = gameState.entities[gameState.currentEntityIndex];
  const totalEntities = gameState.entities.length; // Usar o tamanho real da sequência

  const handleSquareClick = (square: BingoCard) => {
    if (gameState.selectedSquares.includes(square.id)) {
      return;
    }

    const isCorrect = validateBingoAnswer(currentEntity, square.id);

    setGameState((prev) => {
      const newTotalTries = prev.totalTries + 1;
      let newCurrentIndex = prev.currentEntityIndex;
      let newCompletedEntities = new Set(prev.completedEntities);
      let newSelectedSquares = [...prev.selectedSquares];
      let newCorrectAnswersCount = prev.correctAnswersCount;
      let newErrorSquares = [...prev.errorSquares];
      let newCorrectAnswers = new Map(prev.correctAnswers);

      newErrorSquares = newErrorSquares.filter((id) => id !== square.id);

      if (isCorrect) {
        newCompletedEntities.add(currentEntity);
        newSelectedSquares.push(square.id);
        newCorrectAnswers.set(square.id, currentEntity);
        newCurrentIndex = prev.currentEntityIndex + 1;
        newCorrectAnswersCount = prev.correctAnswersCount + 1;
      } else {
        newErrorSquares.push(square.id);

        setTimeout(() => {
          setGameState((currentState) => {
            const nextIndex = currentState.currentEntityIndex + 1;
            const isComplete = nextIndex >= currentState.entities.length;

            return {
              ...currentState,
              currentEntityIndex: nextIndex,
              errorSquares: currentState.errorSquares.filter(
                (id) => id !== square.id
              ),
              isGameComplete: isComplete,
            };
          });
        }, 500);
      }

      const isComplete = newCurrentIndex >= prev.entities.length;

      return {
        ...prev,
        currentEntityIndex: newCurrentIndex,
        completedEntities: newCompletedEntities,
        selectedSquares: newSelectedSquares,
        totalTries: newTotalTries,
        correctAnswersCount: newCorrectAnswersCount,
        errorSquares: newErrorSquares,
        correctAnswers: newCorrectAnswers,
        isGameComplete: isComplete,
      };
    });
  };

  const handleSkip = () => {
    setGameState((prev) => {
      const newCurrentIndex = prev.currentEntityIndex + 1;
      const isComplete = newCurrentIndex >= prev.entities.length;

      return {
        ...prev,
        currentEntityIndex: newCurrentIndex,
        errorSquares: [], // Limpar erros ao pular
        isGameComplete: isComplete,
      };
    });
  };

  const startGame = () => {
    setGameStarted(true);
  };

  // Mostrar estatísticas quando o jogo acabar
  useEffect(() => {
    if (gameState.isGameComplete) {
      setShowStats(true);
    }
  }, [gameState.isGameComplete]);

  const getSquareColor = (square: BingoCard, index: number) => {
    // Verde lime vivo para respostas corretas com texto preto
    if (gameState.selectedSquares.includes(square.id)) {
      return "bg-lime-400 hover:bg-lime-400 text-black border-lime-300 shadow-lg";
    }

    // Vermelho para erros (temporário)
    if (gameState.errorSquares.includes(square.id)) {
      return "bg-red-500 hover:bg-red-500 text-white border-red-400";
    }

    // Cores padrão para squares não interagidos
    const row = Math.floor(index / 4);
    const col = index % 4;
    const isEven = (row + col) % 2 === 0;

    if (isEven) {
      return "bg-slate-700 hover:bg-slate-600 text-white border-slate-600";
    } else {
      return "bg-slate-600 hover:bg-slate-500 text-white border-slate-500";
    }
  };

  const resetGame = () => {
    const entities = generateGameSequence();
    const cards = generateRandomBingoCards(16);

    setGameState({
      currentEntityIndex: 0,
      entities,
      completedEntities: new Set(),
      selectedSquares: [],
      cards,
      isGameComplete: false,
      totalTries: 0,
      correctAnswersCount: 0,
      errorSquares: [],
      correctAnswers: new Map(),
    });
    setShowStats(false);
    setGameStarted(false);
  };

  if (gameState.entities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  const successRate =
    gameState.totalTries > 0
      ? Math.round((gameState.correctAnswersCount / gameState.totalTries) * 100)
      : 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-start">
          <div className="w-80 mt-2 mr-16">
            <h4 className="text-white text-sm font-bold mb-2">
              INFORMAÇÕES PERTINENTES
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p>
                Todos os dados são relacionados somente a copa do mundo de 2022,
                sediada no QATAR, todas as informações são referentes a época do
                torneio
              </p>
              <div className="mt-4">
                <p className="text-white font-semibold mb-1">Tipos de Cards:</p>
                <p>
                  • <span className="text-blue-400">Cards sem marcação:</span>{" "}
                  Para jogadores individuais
                </p>
                <p>
                  •{" "}
                  <span className="text-orange-400">Cards com "SELEÇÃO":</span>{" "}
                  Para seleções
                </p>
              </div>
            </div>
          </div>

          <div className="w-[480px]">
            {/* Header da entidade atual */}
            <div className="bg-blue-600 rounded-lg p-3 mb-3">
              {!gameStarted ? (
                // Estado inicial - Botão JOGAR
                <div className="flex items-center justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={startGame}
                    className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-3 rounded-lg text-xl"
                  >
                    JOGAR
                  </Button>
                </div>
              ) : (
                // Estado do jogo - Header normal
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                        {gameState.currentEntityIndex + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl uppercase">
                          {currentEntity || "GAME OVER"}
                        </h3>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSkip}
                      disabled={gameState.isGameComplete}
                      className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-4 py-2 rounded-lg flex items-center"
                    >
                      SKIP <SkipForward className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                  <div className="text-right text-white text-sm mt-2 font-medium">
                    {Math.max(
                      0,
                      totalEntities - gameState.currentEntityIndex - 1
                    )}{" "}
                    REMAINING
                  </div>
                </>
              )}
            </div>

            {/* Grid do Bingo */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {gameState.cards.map((square, index) => (
                <Button
                  key={square.id}
                  variant="outline"
                  onClick={() => handleSquareClick(square)}
                  disabled={!gameStarted || gameState.isGameComplete}
                  className={`
                    h-28 p-2 text-sm font-bold transition-all duration-200
                    border-2 rounded-lg relative
                    ${getSquareColor(square, index)}
                    ${
                      !gameStarted || gameState.isGameComplete
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }
                  `}
                >
                  {square.type === "team" && (
                    <div className="absolute top-1 right-1 text-[8px] bg-orange-500 text-white rounded px-1">
                      SELEÇÃO
                    </div>
                  )}
                  <div className="text-center w-full h-full flex flex-col justify-center">
                    <div className="text-base mb-1 leading-none">
                      {square.countryCode ? (
                        <FlagIcon
                          countryCode={square.countryCode}
                          className="w-6 h-4 mx-auto"
                          alt={`Bandeira ${square.label}`}
                        />
                      ) : (
                        square.icon
                      )}
                    </div>
                    <div className="leading-tight text-[9px] break-words">
                      {gameState.selectedSquares.includes(square.id) &&
                      gameState.correctAnswers.has(square.id)
                        ? gameState.correctAnswers.get(square.id)
                        : square.label}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog de Estatísticas */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-2xl mb-4">
              Statistics
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold text-white">
                  {gameState.totalTries}
                </div>
                <div className="text-sm text-slate-400">Total Tries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-sm text-slate-400">Streak</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-sm text-slate-400">Best Streak</div>
              </div>
            </div>

            <div>
              <div className="text-4xl font-bold text-white">
                {successRate}%
              </div>
              <div className="text-sm text-slate-400">Success Rate</div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={resetGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Play Again
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStats(false)}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
