"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, BookOpen, ArrowLeft, Lock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { courseData } from "@/lib/course-data"

export default function CursosPage() {
  const currentSemester = 1

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
            <Link href="/dashboard/cursos" className="text-sm font-medium text-primary">
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
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Grade Curricular Completa</h1>
          <p className="text-xl text-muted-foreground">12 semestres • 60+ disciplinas • 6 especializações</p>
        </div>

        {/* All Semesters */}
        <div className="space-y-12">
          {[
            "FASE 1: Fundamentos Universais",
            "FASE 2: Núcleo Tecnológico",
            "FASE 3: Especialização Avançada",
            "FASE 4: Integração Profissional",
          ].map((phase) => {
            const phaseSemesters = courseData.filter((s) => s.phase === phase)

            return (
              <div key={phase}>
                <h2 className="text-2xl font-bold mb-6 text-primary">{phase}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {phaseSemesters.map((semester) => {
                    const isLocked = semester.id > currentSemester
                    const isCompleted = semester.id < currentSemester
                    const isCurrent = semester.id === currentSemester

                    return (
                      <Card
                        key={semester.id}
                        className={`${
                          isLocked ? "opacity-50" : "hover:border-primary"
                        } transition-colors ${isCurrent ? "border-primary" : ""}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground mb-2">{semester.phase}</div>
                              <CardTitle className="text-xl">{semester.name}</CardTitle>
                            </div>
                            {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                            {isCompleted && <CheckCircle2 className="w-5 h-5 text-primary" />}
                            {isCurrent && (
                              <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                Em andamento
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            {semester.disciplines.map((discipline) => (
                              <div key={discipline.id} className="text-sm p-2 rounded hover:bg-muted transition-colors">
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-3 h-3 text-muted-foreground" />
                                  <span>{discipline.name}</span>
                                </div>
                                <div className="text-xs text-muted-foreground ml-5">{discipline.specialization}</div>
                              </div>
                            ))}
                          </div>
                          {!isLocked && (
                            <Link href={`/dashboard/semestre/${semester.id}`}>
                              <Button variant="outline" className="w-full bg-transparent">
                                {isCurrent ? "Continuar" : "Ver Disciplinas"}
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
