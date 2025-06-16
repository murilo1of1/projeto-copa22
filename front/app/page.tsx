import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar, User, Target, TrendingUp } from "lucide-react"

const features = [
  {
    title: "Times",
    description: "Visualize todos os times participantes e suas estatísticas",
    icon: Users,
    href: "/times",
    color: "text-blue-400 bg-blue-500/20",
  },
  {
    title: "Partidas",
    description: "Acompanhe todas as partidas por grupo e seus resultados",
    icon: Calendar,
    href: "/partidas",
    color: "text-green-400 bg-green-500/20",
  },
  {
    title: "Jogadores",
    description: "Busque jogadores, veja artilheiros e estatísticas individuais",
    icon: User,
    href: "/jogadores",
    color: "text-purple-400 bg-purple-500/20",
  },
  {
    title: "Grupos",
    description: "Explore os grupos da Copa e suas classificações",
    icon: Target,
    href: "/grupos",
    color: "text-orange-400 bg-orange-500/20",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Trophy className="h-12 w-12 text-amber-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">Copa do Mundo 2022</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Sistema completo de visualização de dados da Copa do Mundo FIFA 2022 realizada no Catar.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.href} href={feature.href}>
              <Card className="h-full hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer bg-slate-800 border-slate-700 hover:border-amber-500/30">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className={`p-2 rounded-full ${feature.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-slate-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Stats Preview */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-600">
        <div className="text-center space-y-4">
          <TrendingUp className="h-8 w-8 text-amber-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Dados da Copa 2022</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Todos os dados são atualizados através da nossa API REST. Navegue pelas seções para explorar estatísticas
            detalhadas de times, jogadores e partidas.
          </p>
        </div>
      </div>
    </div>
  )
}
