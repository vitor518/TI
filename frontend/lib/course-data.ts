// Complete course data structure for all 12 semesters

export interface Discipline {
  id: string
  name: string
  videoUrl: string
  specialization: string
  description: string
}

export interface Semester {
  id: number
  name: string
  phase: string
  disciplines: Discipline[]
}

export const courseData: Semester[] = [
  {
    id: 1,
    name: "Semestre 1 - Base Científica",
    phase: "FASE 1: Fundamentos Universais",
    disciplines: [
      {
        id: "s1-matematica-discreta",
        name: "Matemática Discreta",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHf8s-HEuPgP6gePwyuRk1Ge",
        specialization: "Fundamentos para todas as áreas",
        description: "Base matemática essencial para computação e algoritmos",
      },
      {
        id: "s1-logica-computacional",
        name: "Lógica Computacional",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "Base para algoritmos",
        description: "Fundamentos de lógica aplicada à programação",
      },
      {
        id: "s1-algoritmos-prog-1",
        name: "Algoritmos e Programação I",
        videoUrl: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6",
        specialization: "Programação fundamental",
        description: "Introdução à programação com Python",
      },
      {
        id: "s1-arquitetura-comp-1",
        name: "Arquitetura de Computadores I",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHcU4ZqoZqJgDzQKtWvXZz6B",
        specialization: "🔧 Eng. Hardware",
        description: "Fundamentos de arquitetura de computadores",
      },
      {
        id: "s1-comunicacao",
        name: "Comunicação e Expressão",
        videoUrl:
          "https://ocw.mit.edu/courses/21g-228-advanced-workshop-in-writing-for-science-and-engineering-spring-2020/",
        specialization: "Habilidade transversal",
        description: "Comunicação técnica e científica",
      },
    ],
  },
  {
    id: 2,
    name: "Semestre 2 - Fundamentos Técnicos",
    phase: "FASE 1: Fundamentos Universais",
    disciplines: [
      {
        id: "s2-calculo-1",
        name: "Cálculo I",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHf8s-HEuPgP6gePwyuRk1Ge",
        specialization: "🔬 Comp. Científica",
        description: "Fundamentos de cálculo diferencial e integral",
      },
      {
        id: "s2-estruturas-dados",
        name: "Estruturas de Dados",
        videoUrl: "https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBrgumpzz-l8kFMw2DLERdxi",
        specialization: "Base para todas as áreas",
        description: "Estruturas fundamentais: listas, pilhas, filas, árvores",
      },
      {
        id: "s2-circuitos-digitais",
        name: "Circuitos Digitais",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "🔧 Eng. Hardware",
        description: "Fundamentos de eletrônica digital",
      },
      {
        id: "s2-sistemas-op-1",
        name: "Sistemas Operacionais I",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHcU4ZqoZqJgDzQKtWvXZz6B",
        specialization: "☁️ Cloud & Infra",
        description: "Fundamentos de sistemas operacionais",
      },
      {
        id: "s2-metodologia",
        name: "Metodologia Científica",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHf8s-HEuPgP6gePwyuRk1Ge",
        specialization: "Pesquisa em TI",
        description: "Métodos de pesquisa científica em computação",
      },
    ],
  },
  {
    id: 3,
    name: "Semestre 3 - Teoria e Hardware",
    phase: "FASE 2: Núcleo Tecnológico",
    disciplines: [
      {
        id: "s3-algebra-linear",
        name: "Álgebra Linear",
        videoUrl: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
        specialization: "📊 Ciência de Dados & IA",
        description: "Fundamentos matemáticos para machine learning",
      },
      {
        id: "s3-teoria-grafos",
        name: "Teoria dos Grafos",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "Algoritmos avançados",
        description: "Teoria e aplicações de grafos",
      },
      {
        id: "s3-eletronica-digital",
        name: "Eletrônica Digital",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "🔧 Eng. Hardware - VLSI",
        description: "Eletrônica digital avançada e VLSI",
      },
      {
        id: "s3-poo",
        name: "Programação Orientada a Objetos",
        videoUrl: "https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBq0KXHsp5J3PxyFaBIXVs3r",
        specialization: "💻 Eng. Software",
        description: "POO com Java: classes, herança, polimorfismo",
      },
      {
        id: "s3-banco-dados-1",
        name: "Banco de Dados I",
        videoUrl: "https://www.youtube.com/playlist?list=PLHz_AreHm4dkBs-795Dsgvau_ekxg8g1r",
        specialization: "📊 Ciência de Dados",
        description: "SQL e modelagem de banco de dados",
      },
    ],
  },
  {
    id: 4,
    name: "Semestre 4 - Sistemas e Redes",
    phase: "FASE 2: Núcleo Tecnológico",
    disciplines: [
      {
        id: "s4-calculo-2",
        name: "Cálculo II",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHf8s-HEuPgP6gePwyuRk1Ge",
        specialization: "🔬 Comp. Científica",
        description: "Cálculo multivariável e equações diferenciais",
      },
      {
        id: "s4-redes-1",
        name: "Redes de Computadores I",
        videoUrl: "https://www.youtube.com/playlist?list=PL6eCpqZkPttU1pCTk-7gvE_9wv0x_9RgZ",
        specialization: "🔒 Cybersecurity",
        description: "Fundamentos de redes e protocolos",
      },
      {
        id: "s4-microcontroladores",
        name: "Microcontroladores",
        videoUrl: "https://www.youtube.com/playlist?list=PL7CjOZ3q8fMfFpKmh9p3yF6ex02b6x1Q2",
        specialization: "🔧 Eng. Hardware - FPGA",
        description: "Arduino e programação de microcontroladores",
      },
      {
        id: "s4-eng-software-1",
        name: "Engenharia de Software I",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "💻 Eng. Software - DDD",
        description: "Fundamentos de engenharia de software",
      },
      {
        id: "s4-lab-prog",
        name: "Laboratório de Programação",
        videoUrl: "https://www.youtube.com/playlist?list=PL5TJqBvpXQv4l7nHm08YqN1Xyfu-nqrNN",
        specialization: "Competições de programação",
        description: "Algoritmos avançados e programação dinâmica",
      },
    ],
  },
  {
    id: 5,
    name: "Semestre 5 - Algoritmos Avançados",
    phase: "FASE 2: Núcleo Tecnológico",
    disciplines: [
      {
        id: "s5-probabilidade",
        name: "Probabilidade e Estatística",
        videoUrl: "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo",
        specialization: "📊 Ciência de Dados & IA",
        description: "Estatística aplicada à análise de dados",
      },
      {
        id: "s5-analise-algoritmos",
        name: "Análise de Algoritmos",
        videoUrl: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
        specialization: "Base teórica avançada",
        description: "Complexidade e análise de algoritmos - MIT",
      },
      {
        id: "s5-sistemas-embarcados",
        name: "Sistemas Embarcados",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHcU4ZqoZqJgDzQKtWvXZz6B",
        specialization: "🔧 Eng. Hardware",
        description: "Sistemas embarcados e tempo real",
      },
      {
        id: "s5-testes-software",
        name: "Testes de Software",
        videoUrl: "https://www.youtube.com/playlist?list=PLszZ9Jjf84ztfL9GkTxncVbJ9nJX8B1kP",
        specialization: "💻 Eng. Software - DevOps",
        description: "Testes automatizados e qualidade de software",
      },
      {
        id: "s5-ihm",
        name: "Interface Homem-Máquina",
        videoUrl: "https://www.coursera.org/learn/user-interface-design",
        specialization: "Design de sistemas",
        description: "UX/UI Design e usabilidade",
      },
    ],
  },
  {
    id: 6,
    name: "Semestre 6 - Sistemas Complexos",
    phase: "FASE 2: Núcleo Tecnológico",
    disciplines: [
      {
        id: "s6-linguagens-formais",
        name: "Linguagens Formais",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "Compiladores e teoria",
        description: "Autômatos, gramáticas e linguagens formais",
      },
      {
        id: "s6-sistemas-distribuidos",
        name: "Sistemas Distribuídos",
        videoUrl: "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/",
        specialization: "☁️ Cloud & Infra",
        description: "Arquitetura de sistemas distribuídos - MIT",
      },
      {
        id: "s6-arquitetura-comp-2",
        name: "Arquitetura de Computadores II",
        videoUrl: "https://www.youtube.com/playlist?list=PL5D0C1440F6A6B4E2",
        specialization: "🔧 Eng. Hardware - Processadores",
        description: "Arquitetura avançada de processadores - Stanford",
      },
      {
        id: "s6-arquitetura-software",
        name: "Arquitetura de Software",
        videoUrl: "https://www.youtube.com/playlist?list=PLxI8Can9yAHd6aV6Q7y5Zg6YVqT3XvR7z",
        specialization: "💻 Eng. Software - Microserviços",
        description: "Padrões arquiteturais e microserviços",
      },
      {
        id: "s6-gestao-projetos",
        name: "Gestão de Projetos de TI",
        videoUrl: "https://www.youtube.com/playlist?list=PL6eCpqZkPttU1pCTk-7gvE_9wv0x_9RgZ",
        specialization: "Gestão técnica",
        description: "Metodologias ágeis e gestão de projetos",
      },
    ],
  },
  {
    id: 7,
    name: "Semestre 7 - Inteligência Artificial & Data",
    phase: "FASE 3: Especialização Avançada",
    disciplines: [
      {
        id: "s7-ia",
        name: "Inteligência Artificial",
        videoUrl: "https://www.youtube.com/playlist?list=PLoROMvodv4rO1NB9TD4iUZ3qghGEGtqNX",
        specialization: "📊 Ciência de Dados & IA",
        description: "Fundamentos de IA - Stanford",
      },
      {
        id: "s7-machine-learning",
        name: "Machine Learning",
        videoUrl: "https://www.coursera.org/learn/machine-learning",
        specialization: "📊 Deep Learning",
        description: "Machine Learning - Andrew Ng (Coursera)",
      },
      {
        id: "s7-proc-sinais",
        name: "Processamento de Sinais",
        videoUrl: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/",
        specialization: "🔧 Eng. Hardware",
        description: "Sinais e sistemas - MIT",
      },
      {
        id: "s7-data-engineering",
        name: "Data Engineering",
        videoUrl: "https://www.datacamp.com/courses/data-engineering-with-python",
        specialization: "📊 MLOps",
        description: "Engenharia de dados com Python",
      },
      {
        id: "s7-business-intelligence",
        name: "Business Intelligence",
        videoUrl: "https://www.youtube.com/playlist?list=PLpdAy0tYrnKyCZsH7Xd7K1rrlt-9u981P",
        specialization: "Análise de negócios",
        description: "Power BI e análise de dados de negócios",
      },
    ],
  },
  {
    id: 8,
    name: "Semestre 8 - Segurança & Cloud",
    phase: "FASE 3: Especialização Avançada",
    disciplines: [
      {
        id: "s8-seguranca",
        name: "Segurança Computacional",
        videoUrl: "https://www.youtube.com/playlist?list=PL1y1iaEtjSYiiSGVlL1cHsXN_kvJOOhu-",
        specialization: "🔒 Cybersecurity - Pentesting",
        description: "Fundamentos de cibersegurança - Stanford",
      },
      {
        id: "s8-cloud",
        name: "Computação em Nuvem",
        videoUrl: "https://www.youtube.com/playlist?list=PL2kSRH_Dm8Zp5-9m5qdv7T1O5LVjOvxQH",
        specialization: "☁️ Cloud & Infra - AWS",
        description: "AWS Cloud Computing",
      },
      {
        id: "s8-hardware-security",
        name: "Hardware Security",
        videoUrl: "https://www.coursera.org/learn/hardware-security",
        specialization: "🔒 Cybersecurity - Criptografia",
        description: "Segurança em hardware e criptografia",
      },
      {
        id: "s8-devops",
        name: "DevOps e SRE",
        videoUrl: "https://www.youtube.com/playlist?list=PLf-O3X2-mxDknL4dKyogrRbI0xO_FbDBI",
        specialization: "💻 Eng. Software - DevOps",
        description: "DevOps practices e Site Reliability Engineering",
      },
      {
        id: "s8-forense",
        name: "Computação Forense",
        videoUrl: "https://www.youtube.com/playlist?list=PL5D0C1440F6A6B4E2",
        specialization: "🔒 Cybersecurity - SOC",
        description: "Perícia forense digital e investigação",
      },
    ],
  },
  {
    id: 9,
    name: "Semestre 9 - Computação Gráfica & IoT",
    phase: "FASE 3: Especialização Avançada",
    disciplines: [
      {
        id: "s9-comp-grafica",
        name: "Computação Gráfica",
        videoUrl: "https://www.youtube.com/playlist?list=PL_w_qWAQZtAZhtzPI5pkAtcUVgmzdAP8g",
        specialization: "🔬 Comp. Científica - Simulação",
        description: "Computer Graphics - UC Davis",
      },
      {
        id: "s9-visao-comp",
        name: "Visão Computacional",
        videoUrl: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv",
        specialization: "📊 Ciência de Dados & IA - NLP",
        description: "Computer Vision - Stanford",
      },
      {
        id: "s9-iot",
        name: "Internet das Coisas",
        videoUrl: "https://www.youtube.com/playlist?list=PL6eCpqZkPttU1pCTk-7gvE_9wv0x_9RgZ",
        specialization: "🔧 Eng. Hardware",
        description: "IoT fundamentals - Cisco",
      },
      {
        id: "s9-vr-ar",
        name: "Realidade Virtual/Aumentada",
        videoUrl: "https://www.udacity.com/course/vr-developer-nanodegree--nd017",
        specialization: "🔬 Comp. Científica - CUDA",
        description: "VR/AR Development - Udacity",
      },
      {
        id: "s9-game-dev",
        name: "Game Development",
        videoUrl: "https://www.youtube.com/playlist?list=PLPV2KyIb3jR5QFsefuO2RlAgWEz6EvVi6",
        specialization: "Computação gráfica aplicada",
        description: "Unity Game Development - Brackeys",
      },
    ],
  },
  {
    id: 10,
    name: "Semestre 10 - Tópicos Emergentes",
    phase: "FASE 3: Especialização Avançada",
    disciplines: [
      {
        id: "s10-comp-quantica",
        name: "Computação Quântica",
        videoUrl: "https://www.youtube.com/playlist?list=PLnK6MrIqGXsIl_b6LzFQgzM6gqNGg4OcF",
        specialization: "🔬 Comp. Científica - HPC",
        description: "Quantum Computing - Microsoft",
      },
      {
        id: "s10-bioinformatica",
        name: "Bioinformática",
        videoUrl: "https://www.coursera.org/specializations/bioinformatics",
        specialization: "Aplicações científicas",
        description: "Bioinformatics Specialization - Coursera",
      },
      {
        id: "s10-robotica",
        name: "Robótica Inteligente",
        videoUrl: "https://www.youtube.com/playlist?list=PLp8ijpvp8iCvFDYdcXqqYU5IblB8s2RUG",
        specialization: "📊 IA aplicada",
        description: "Robotics - UPenn",
      },
      {
        id: "s10-blockchain",
        name: "Blockchain e Web3",
        videoUrl: "https://www.youtube.com/playlist?list=PLSONl1AVlZNVP7xJ44DGa2pU7YXZyZlkM",
        specialization: "🔒 Cybersecurity avançada",
        description: "Blockchain Technologies - Princeton",
      },
      {
        id: "s10-edge-computing",
        name: "Edge Computing",
        videoUrl: "https://www.youtube.com/playlist?list=PL6eCpqZkPttU1pCTk-7gvE_9wv0x_9RgZ",
        specialization: "☁️ Cloud & Infra - Kubernetes",
        description: "Edge Computing - Intel",
      },
    ],
  },
  {
    id: 11,
    name: "Semestre 11 - Especialização Profunda",
    phase: "FASE 4: Integração Profissional",
    disciplines: [
      {
        id: "s11-topicos-hardware",
        name: "Tópicos Especiais em Hardware",
        videoUrl: "https://www.youtube.com/playlist?list=PL5D0C1440F6A6B4E2",
        specialization: "🔧 Eng. Hardware - VLSI Design",
        description: "Advanced Hardware - ETH Zurich",
      },
      {
        id: "s11-eng-sistemas",
        name: "Engenharia de Sistemas Complexos",
        videoUrl: "https://ocw.mit.edu/courses/16-842-fundamentals-of-systems-engineering-fall-2015/",
        specialization: "💻 Eng. Software - Arquitetura",
        description: "Systems Engineering - MIT",
      },
      {
        id: "s11-pesquisa-operacional",
        name: "Pesquisa Operacional",
        videoUrl: "https://www.youtube.com/playlist?list=PLWD4_L7ZqWA4CFVqoAzZ7brPVHj3c0j8L",
        specialization: "🔬 Comp. Científica - Otimização",
        description: "Operations Research - Georgia Tech",
      },
      {
        id: "s11-empreendedorismo",
        name: "Empreendedorismo em Tech",
        videoUrl: "https://www.youtube.com/playlist?list=PLpGHT1n4-mAsxuRwLOpRfRz3aRcS1tZkC",
        specialization: "Habilidade empreendedora",
        description: "Startup Engineering - Stanford",
      },
      {
        id: "s11-optativa-1",
        name: "Optativa I",
        videoUrl: "https://www.coursera.org",
        specialization: "Foco na área escolhida",
        description: "Disciplina optativa de especialização avançada",
      },
    ],
  },
  {
    id: 12,
    name: "Semestre 12 - Projeto Final",
    phase: "FASE 4: Integração Profissional",
    disciplines: [
      {
        id: "s12-tcc",
        name: "Trabalho de Conclusão de Curso",
        videoUrl:
          "https://ocw.mit.edu/courses/22-01-introduction-to-nuclear-engineering-and-ionizing-radiation-fall-2016/",
        specialization: "Projeto integrador",
        description: "Projeto final integrador de todas as especializações",
      },
      {
        id: "s12-estagio",
        name: "Estágio Supervisionado",
        videoUrl: "https://www.youtube.com/playlist?list=PLpGHT1n4-mAsxuRwLOpRfRz3aRcS1tZkC",
        specialization: "Experiência prática",
        description: "Estágio profissional supervisionado",
      },
      {
        id: "s12-optativa-2",
        name: "Optativa II",
        videoUrl: "https://ocw.mit.edu",
        specialization: "Aprofundamento técnico",
        description: "Tópicos avançados de especialização",
      },
      {
        id: "s12-seminarios",
        name: "Seminários Avançados",
        videoUrl: "https://www.youtube.com/user/MicrosoftResearch",
        specialization: "Atualização tecnológica",
        description: "Tech Talks e seminários de atualização",
      },
    ],
  },
]

export const specializations = [
  {
    id: "eng-software",
    name: "Engenharia de Software",
    icon: "💻",
    description: "Microserviços, DDD, DevOps e arquitetura de software",
  },
  {
    id: "ciencia-dados",
    name: "Ciência de Dados & IA",
    icon: "📊",
    description: "Machine Learning, Deep Learning, NLP e MLOps",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "🔒",
    description: "Pentesting, SOC, Criptografia e segurança",
  },
  {
    id: "eng-hardware",
    name: "Engenharia de Hardware",
    icon: "🔧",
    description: "VLSI, FPGA, Processadores e sistemas embarcados",
  },
  {
    id: "cloud-infra",
    name: "Cloud & Infrastructure",
    icon: "☁️",
    description: "AWS, Kubernetes, Terraform e cloud computing",
  },
  {
    id: "comp-cientifica",
    name: "Computação Científica",
    icon: "🔬",
    description: "HPC, CUDA, Simulação e computação quântica",
  },
]
