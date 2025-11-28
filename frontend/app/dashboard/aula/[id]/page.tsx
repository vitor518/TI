"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, ArrowLeft, ExternalLink, MessageSquare, BookOpen, Code } from "lucide-react"
import Link from "next/link"
import { courseData } from "@/lib/course-data"
import { useParams } from "next/navigation"

export default function AulaPage() {
  const params = useParams()
  const disciplineId = params.id as string

  // Find discipline across all semesters
  let discipline = null
  let semesterId = 0

  for (const semester of courseData) {
    const found = semester.disciplines.find((d) => d.id === disciplineId)
    if (found) {
      discipline = found
      semesterId = semester.id
      break
    }
  }

  if (!discipline) {
    return <div>Disciplina não encontrada</div>
  }

  // Extract video ID from YouTube URL for embedding
  const getYouTubeEmbedUrl = (url: string) => {
    const playlistMatch = url.match(/[?&]list=([^&]+)/)
    if (playlistMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`
    }
    return url
  }

  const embedUrl =
    discipline.videoUrl.includes("youtube.com") || discipline.videoUrl.includes("youtu.be")
      ? getYouTubeEmbedUrl(discipline.videoUrl)
      : null

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
          href={`/dashboard/semestre/${semesterId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Semestre
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                {embedUrl ? (
                  <div className="aspect-video bg-black rounded-t-lg">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full rounded-t-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Conteúdo hospedado externamente</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 text-sm text-primary">
                    <span className="text-xl">{discipline.specialization.split(" ")[0]}</span>
                    <span>{discipline.specialization}</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{discipline.name}</h1>
                  <p className="text-muted-foreground mb-4">{discipline.description}</p>
                  <a href={discipline.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <ExternalLink className="w-4 h-4" />
                      Acessar Playlist Completa
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Notes, Discussion, etc */}
            <Card>
              <Tabs defaultValue="notas" className="w-full">
                <CardHeader>
                  <TabsList className="w-full">
                    <TabsTrigger value="notas" className="flex-1">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Notas
                    </TabsTrigger>
                    <TabsTrigger value="discussao" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discussão
                    </TabsTrigger>
                    <TabsTrigger value="exercicios" className="flex-1">
                      <Code className="w-4 h-4 mr-2" />
                      Exercícios
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="notas" className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-foreground">Sobre esta disciplina</h3>
                      <p className="text-muted-foreground">{discipline.description}</p>
                      <p className="text-muted-foreground">
                        Este curso faz parte da especialização em {discipline.specialization} e é fundamental para seu
                        desenvolvimento na área.
                      </p>
                      <h3 className="text-foreground">Recursos de Aprendizado</h3>
                      <ul className="text-muted-foreground">
                        <li>Aulas em vídeo de alta qualidade</li>
                        <li>Material de apoio e slides</li>
                        <li>Exercícios práticos</li>
                        <li>Fórum de discussão com outros alunos</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="discussao" className="space-y-4">
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Fórum de discussão em desenvolvimento</p>
                      <p className="text-sm text-muted-foreground">
                        Em breve você poderá interagir com outros estudantes
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="exercicios" className="space-y-4">
                    <div className="text-center py-12">
                      <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Exercícios práticos em desenvolvimento</p>
                      <p className="text-sm text-muted-foreground">
                        Editor de código integrado será disponibilizado em breve
                      </p>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seu Progresso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Aulas Assistidas</span>
                    <span className="text-sm font-medium">3/15</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "20%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Tempo de Estudo</span>
                    <span className="text-sm font-medium">4.5h</span>
                  </div>
                </div>
                <Button className="w-full">Marcar como Completo</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Materiais de Apoio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href={discipline.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-between bg-transparent">
                    Playlist Completa
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Button variant="outline" className="w-full justify-between bg-transparent" disabled>
                  Slides da Aula
                  <BookOpen className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent" disabled>
                  Exercícios Extras
                  <Code className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
