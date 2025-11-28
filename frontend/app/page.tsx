import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Database,
  Lock,
  Cloud,
  Microscope,
  GraduationCap,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TECNOLOGIA DA INFORMAÇÃO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#curso" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              O Curso
            </Link>
            <Link
              href="#especializacoes"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Especializações
            </Link>
            <Link href="#grade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Grade Curricular
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Começar Agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Universidade Brasileira Livre</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            O Programa Definitivo em <span className="text-primary">Tecnologia da Informação</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Um curso completo e superior às graduações tradicionais. Domine todas as áreas de TI com conteúdo de
            universidades de elite mundial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Iniciar Jornada
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#grade">
              <Button size="lg" variant="outline">
                Ver Grade Completa
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            <div>
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Semestres</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">60+</div>
              <div className="text-sm text-muted-foreground">Disciplinas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Especializações</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Gratuito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section id="especializacoes" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">6 Especializações Integradas</h2>
          <p className="text-xl text-muted-foreground">Domine múltiplas áreas ao longo do curso</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:border-primary transition-colors">
            <Code2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">💻 Engenharia de Software</h3>
            <p className="text-muted-foreground mb-4">Microserviços, DDD, DevOps e arquitetura de sistemas complexos</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Domain-Driven Design</li>
              <li>• Arquitetura de Microserviços</li>
              <li>• CI/CD e DevOps</li>
            </ul>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors">
            <Database className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">📊 Ciência de Dados & IA</h3>
            <p className="text-muted-foreground mb-4">Machine Learning, Deep Learning, NLP e MLOps</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Deep Learning (Stanford)</li>
              <li>• Natural Language Processing</li>
              <li>• MLOps e Data Engineering</li>
            </ul>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors">
            <Lock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">🔒 Cybersecurity</h3>
            <p className="text-muted-foreground mb-4">Pentesting, SOC, Criptografia e segurança avançada</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ethical Hacking</li>
              <li>• Security Operations Center</li>
              <li>• Computação Forense</li>
            </ul>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors">
            <Cpu className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">🔧 Engenharia de Hardware</h3>
            <p className="text-muted-foreground mb-4">VLSI, FPGA, Processadores e sistemas embarcados</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• VLSI Design</li>
              <li>• FPGA Development</li>
              <li>• Arquitetura de Processadores</li>
            </ul>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors">
            <Cloud className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">☁️ Cloud & Infrastructure</h3>
            <p className="text-muted-foreground mb-4">AWS, Kubernetes, Terraform e computação em nuvem</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AWS Solutions Architect</li>
              <li>• Kubernetes (CKA)</li>
              <li>• Infrastructure as Code</li>
            </ul>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors">
            <Microscope className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">🔬 Computação Científica</h3>
            <p className="text-muted-foreground mb-4">HPC, CUDA, Simulação e computação quântica</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High Performance Computing</li>
              <li>• GPU Programming (CUDA)</li>
              <li>• Computação Quântica</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que estão dominando Tecnologia da Informação com o curso mais completo do
            Brasil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Criar Conta Grátis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Explorar Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-primary" />
                <span className="font-bold">TI Sigma</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Universidade Brasileira Livre - Educação de qualidade mundial acessível a todos.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Curso</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#grade">Grade Curricular</Link>
                </li>
                <li>
                  <Link href="#especializacoes">Especializações</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">Comunidade</Link>
                </li>
                <li>
                  <Link href="#">Fórum</Link>
                </li>
                <li>
                  <Link href="#">Certificados</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">Termos de Uso</Link>
                </li>
                <li>
                  <Link href="#">Privacidade</Link>
                </li>
                <li>
                  <Link href="#">Licenças</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Tecnologia da Informação - Universidade Brasileira Livre. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
