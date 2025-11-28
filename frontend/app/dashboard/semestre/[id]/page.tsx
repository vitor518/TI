"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, ArrowLeft, ExternalLink, Play, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { courseData } from "@/lib/course-data"
import { useParams } from "next/navigation"

export default function SemestrePage() {
  const params = useParams()
  const semesterId = Number.parseInt(params.id as string)
  const semester = courseData.find((s) => s.id === semesterId)

  if (!semester) {
    return <div>Semestre não encontrado</div>
  }

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
          <Button variant="ghost">Sair</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard/cursos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Cursos
        </Link>

        {/* Semester Header */}
        <div className="mb-8">
          <div className="text-sm text-primary font-medium mb-2">{semester.phase}</div>
          <h1 className="text-4xl font-bold mb-2">{semester.name}</h1>
          <p className="text-muted-foreground">{semester.disciplines.length} disciplinas neste semestre</p>
        </div>

        {/* Disciplines Grid */}
        <div className="grid gap-6">
          {semester.disciplines.map((discipline, index) => {
            const isCompleted = index < 2 // Mock: first 2 are completed

            return (
              <Card key={discipline.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{discipline.specialization.split(" ")[0]}</span>
                        <span className="text-sm text-muted-foreground">{discipline.specialization}</span>
                      </div>
                      <CardTitle className="text-2xl mb-2">{discipline.name}</CardTitle>
                      <p className="text-muted-foreground">{discipline.description}</p>
                    </div>
                    {isCompleted && <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/dashboard/aula/${discipline.id}`} className="flex-1">
                      <Button className="w-full gap-2">
                        <Play className="w-4 h-4" />
                        {isCompleted ? "Revisar Aulas" : "Iniciar Aulas"}
                      </Button>
                    </Link>
                    <a href={discipline.videoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <ExternalLink className="w-4 h-4" />
                        Fonte Original
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
