"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Users, Calendar, User, Target, Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Início", icon: Trophy },
  { href: "/times", label: "Times", icon: Users },
  { href: "/partidas", label: "Partidas", icon: Calendar },
  { href: "/jogadores", label: "Jogadores", icon: User },
  { href: "/grupos", label: "Grupos", icon: Target },
  { href: "/bingo", label: "Bingo", icon: Gamepad2 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-slate-700 bg-slate-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <span className="text-xl font-bold text-white">Copa do Mundo 2022</span>
          </Link>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
