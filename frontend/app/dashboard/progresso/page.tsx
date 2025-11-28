"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code2, ArrowLeft, Trophy, Clock, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import { courseData, specializations } from "@/lib/course-data"

export default function ProgressoPage() {
  const totalDisciplines = courseData.reduce((acc, sem) => acc + sem.disciplines.length, 0)
  const completedDisciplines = 2
  const progressPercentage = (completedDisciplines / totalDisciplines) * 100

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
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link
              href="/dashboard/cursos"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cursos
            </Link>
            <Link href="/dashboard/progresso" className="text-sm font-medium text-primary">
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
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Seu Progresso</h1>
          <p className="text-xl text-muted-foreground">Acompanhe sua jornada em Tecnologia da Informação</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Progresso Geral do Curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Progresso Total</span>
                <span className="text-2xl font-bold text-primary">{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-4" />
              <p className="text-sm text-muted-foreground mt-2">
                {completedDisciplines} de {totalDisciplines} disciplinas concluídas
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">Nível 3</div>
                <div className="text-xs text-muted-foreground">350/500 XP</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">24h</div>
                <div className="text-xs text-muted-foreground">Tempo de estudo</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">1º</div>
                <div className="text-xs text-muted-foreground">Semestre atual</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">8h</div>
                <div className="text-xs text-muted-foreground">Esta semana</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress by Semester */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Progresso por Semestre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseData.map((semester) => {
              const semesterProgress = semester.id === 1 ? 40 : 0

              return (
                <div key={semester.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{semester.name}</div>
                      <div className="text-sm text-muted-foreground">{semester.disciplines.length} disciplinas</div>
                    </div>
                    <span className="text-sm font-medium">{semesterProgress}%</span>
                  </div>
                  <Progress value={semesterProgress} />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Progress by Specialization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Progresso por Especialização</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {specializations.map((spec) => {
              const specProgress = spec.id === "eng-software" ? 15 : 0

              return (
                <div key={spec.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{spec.icon}</span>
                      <div>
                        <div className="font-medium">{spec.name}</div>
                        <div className="text-sm text-muted-foreground">{spec.description}</div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{specProgress}%</span>
                  </div>
                  <Progress value={specProgress} />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
