"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react"
import { generateRandomBingoCards, type BingoCard } from "@/lib/bingo-cards"
import { FlagIcon } from "@/components/flag-icon"

const bingoCards = [
  {
    id: 1,
    playerName: "LIONEL MESSI",
    playerNumber: 10,
    remaining: 39,
    squares: generateRandomBingoCards(16)
  },
  {
    id: 2,
    playerName: "CRISTIANO RONALDO", 
    playerNumber: 7,
    remaining: 38,
    squares: generateRandomBingoCards(16)
  },
  {
    id: 3,
    playerName: "KYLIAN MBAPPÉ",
    playerNumber: 10,
    remaining: 37,
    squares: generateRandomBingoCards(16)
  }
]

export default function BingoPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [selectedSquares, setSelectedSquares] = useState<string[]>([])

  const toggleSquare = (squareId: string) => {
    setSelectedSquares(prev => 
      prev.includes(squareId) 
        ? prev.filter(id => id !== squareId)
        : [...prev, squareId]
    )
  }

  const getSquareColor = (square: BingoCard, index: number) => {
    if (selectedSquares.includes(square.id)) {
      return "bg-green-500 hover:bg-green-600 text-white border-green-400"
    }
    
    const row = Math.floor(index / 4)
    const col = index % 4
    const isEven = (row + col) % 2 === 0
    
    if (isEven) {
      return "bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
    } else {
      return "bg-slate-600 hover:bg-slate-500 text-white border-slate-500"
    }
  }

  const card = bingoCards[currentCard]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">BINGO COPA DO MUNDO 2022</h1>
        </div>

        <div className="flex justify-center items-start">
          <div className="w-80 mt-16 mr-16">
            <h4 className="text-white text-sm font-bold mb-2">INFORMAÇÕES PERTINENTES</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p>Todos os dados são relacionados somente a copa do mundo de 2022, sediada no QATAR, todas as informações são referentes a época do torneio</p>
              <div className="mt-4">
                <p className="text-white font-semibold mb-1">Tipos de Cards:</p>
                <p>• <span className="text-blue-400">Cards sem marcação:</span> Para jogadores individuais</p>
                <p>• <span className="text-orange-400">Cards com "TIME":</span> Para seleções/times</p>
              </div>
            </div>
          </div>

          <div className="w-[480px]">
            {/* Header do jogador */}
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
                disabled={currentCard === 0}
                className="text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-purple-400">
                  {card.playerNumber}
                </div>
                <div className="text-center">
                  <h3 className="text-white font-bold text-xl">{card.playerName}</h3>
                </div>
              </div>

              <Button 
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2"
              >
                SKIP <SkipForward className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="text-right text-slate-400 text-sm mb-4 font-medium">
              {card.remaining} REMAINING
            </div>

            {/* Grid do Bingo */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {card.squares.map((square, index) => (
                <Button
                  key={square.id}
                  variant="outline"
                  onClick={() => toggleSquare(square.id)}
                  className={`
                    h-28 p-2 text-sm font-bold transition-all duration-200
                    border-2 rounded-lg relative
                    ${getSquareColor(square, index)}
                  `}
                >
                  {square.type === 'team' && (
                    <div className="absolute top-1 right-1 text-[8px] bg-orange-500 text-white rounded px-1">
                      TIME
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
                    <div className="leading-tight text-[9px] break-words">{square.label}</div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentCard(Math.min(bingoCards.length - 1, currentCard + 1))}
                disabled={currentCard === bingoCards.length - 1}
                className="text-slate-400 hover:text-white hover:bg-slate-700"
              >
                PRÓXIMO <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
