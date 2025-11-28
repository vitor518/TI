"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code2, BookOpen, Clock, Trophy, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { courseData, specializations } from "@/lib/course-data"

export default function DashboardPage() {
  // Mock user progress data
  const userProgress = {
    currentSemester: 1,
    completedDisciplines: 2,
    totalDisciplines: 60,
    hoursStudied: 24,
    level: 3,
  }

  const progressPercentage = (userProgress.completedDisciplines / userProgress.totalDisciplines) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TI SIGMA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link
              href="/dashboard/cursos"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cursos
            </Link>
            <Link
              href="/dashboard/progresso"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Progresso
            </Link>
            <Link
              href="/dashboard/certificados"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Certificados
            </Link>
          </nav>
          <Button variant="ghost">Sair</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta! 👋</h1>
          <p className="text-muted-foreground">Continue sua jornada em Tecnologia da Informação</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressPercentage.toFixed(1)}%</div>
              <Progress value={progressPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {userProgress.completedDisciplines} de {userProgress.totalDisciplines} disciplinas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas de Estudo</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.hoursStudied}h</div>
              <p className="text-xs text-muted-foreground mt-2">+8h esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Semestre Atual</CardTitle>
              <Code2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.currentSemester}º</div>
              <p className="text-xs text-muted-foreground mt-2">Base Científica</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nível</CardTitle>
              <Trophy className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Nível {userProgress.level}</div>
              <Progress value={65} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">350/500 XP</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Continuar Aprendendo</h2>
          <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-8">
                <Play className="w-16 h-16 text-primary" />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="text-sm text-primary font-medium mb-2">Semestre 1 • Algoritmos e Programação I</div>
                <h3 className="text-xl font-bold mb-2">Python - Estruturas de Controle</h3>
                <p className="text-muted-foreground mb-4">
                  Continue aprendendo sobre estruturas condicionais e loops em Python
                </p>
                <div className="flex items-center justify-between">
                  <Progress value={45} className="w-1/2" />
                  <Link href="/dashboard/aula/s1-algoritmos-prog-1">
                    <Button className="gap-2">
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* All Semesters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Todos os Semestres</h2>
            <Link href="/dashboard/cursos">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.slice(0, 6).map((semester) => (
              <Link key={semester.id} href={`/dashboard/semestre/${semester.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="text-sm text-primary font-medium mb-2">{semester.phase}</div>
                    <CardTitle className="text-lg">{semester.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{semester.disciplines.length} disciplinas</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="w-3 h-3" />
                      {semester.id === 1
                        ? "Em andamento"
                        : semester.id < userProgress.currentSemester
                          ? "Concluído"
                          : "Bloqueado"}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Especializações Disponíveis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec) => (
              <Card key={spec.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="text-3xl mb-2">{spec.icon}</div>
                  <CardTitle className="text-lg">{spec.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{spec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
