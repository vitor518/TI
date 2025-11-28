"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, ArrowLeft, Award, Download, Share2, Calendar } from "lucide-react"
import Link from "next/link"

export default function CertificadosPage() {
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
            <Link
              href="/dashboard/progresso"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Progresso
            </Link>
            <Link href="/dashboard/certificados" className="text-sm font-medium text-primary">
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
          <h1 className="text-4xl font-bold mb-2">Certificados</h1>
          <p className="text-xl text-muted-foreground">Seus certificados e conquistas acadêmicas</p>
        </div>

        {/* No Certificates Yet */}
        <Card>
          <CardContent className="py-24 text-center">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Nenhum certificado ainda</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Complete disciplinas e semestres para ganhar certificados verificáveis
            </p>
            <Link href="/dashboard/cursos">
              <Button>Explorar Cursos</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Future Certificates Preview */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Certificados Disponíveis</h2>
          <p className="text-muted-foreground mb-6">Ao completar cada fase, você receberá certificados verificáveis:</p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="opacity-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Certificado de Fundamentos</CardTitle>
                    <p className="text-sm text-muted-foreground">Complete os Semestres 1-2</p>
                  </div>
                  <Award className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Bloqueado</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Certificado de Núcleo Técnico</CardTitle>
                    <p className="text-sm text-muted-foreground">Complete os Semestres 3-6</p>
                  </div>
                  <Award className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Bloqueado</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Certificado de Especialização</CardTitle>
                    <p className="text-sm text-muted-foreground">Complete os Semestres 7-10</p>
                  </div>
                  <Award className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Bloqueado</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Diploma de Conclusão</CardTitle>
                    <p className="text-sm text-muted-foreground">Complete todos os 12 semestres</p>
                  </div>
                  <Award className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Bloqueado</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" disabled>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
