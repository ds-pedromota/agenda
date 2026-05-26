import { useState, useEffect } from "react";

const TASKS = {
  rotina: {
    label: "Rotina",
    icon: "📅",
    color: "#94a3b8",
    sections: [
      {
        title: "Blocos Fixos — Segunda a Sexta",
        freq: "daily",
        tasks: [
          { id: "r1", text: "Acordar + manhã pessoal", time: "06:00" },
          { id: "r2", text: "Início do trabalho", time: "09:00" },
          { id: "r3", text: "Almoço", time: "12:00–13:00" },
          { id: "r4", text: "Pausa", time: "15:00–15:30" },
          { id: "r5", text: "Encerrar trabalho", time: "17:00" },
          { id: "r6", text: "Caminhada diária", time: "18:00–19:00" },
          { id: "r7", text: "Dormir", time: "22:00" },
        ],
      },
      {
        title: "Sábado — Estudos + Lazer",
        freq: "weekly",
        tasks: [
          { id: "r8", text: "Faculdade — estudo/revisão (1h)", time: "Manhã" },
          { id: "r9", text: "Espiritualidade — prática ou leitura (1h)", time: "Manhã" },
          { id: "r10", text: "Lazer livre (sem trabalho)", time: "Tarde/Noite" },
        ],
      },
      {
        title: "Domingo — Descanso Total",
        freq: "weekly",
        tasks: [
          { id: "r11", text: "Lazer completo — zero trabalho, zero obrigação" },
        ],
      },
    ],
  },

  senaf: {
    label: "Senaf",
    icon: "🏢",
    color: "#38bdf8",
    sections: [
      {
        title: "Rituais Semanais (~10h · Seg/Ter/Qui manhã + Sex tarde)",
        freq: "weekly",
        tasks: [
          { id: "s1", text: "Preencher KPIs — CPL, conversão e leads", time: "Sex" },
          { id: "s2", text: "WhatsApp Status — 7 posts de credibilidade na semana" },
          { id: "s3", text: "Sistema full-stack — avançar no upload de documentos" },
          { id: "s4", text: "Google Ads — revisar performance e ajustes de campanha" },
        ],
      },
      {
        title: "Mensal",
        freq: "monthly",
        tasks: [
          { id: "s5", text: "Meta: 30+ contratos fechados" },
          { id: "s6", text: "Captar 10 avaliações no Google Meu Negócio" },
          { id: "s7", text: "Publicar 2 artigos no blog (SEO)" },
        ],
      },
      {
        title: "Plano de Ação Ativo",
        freq: "sprint",
        tasks: [
          { id: "s8", text: "Kit Credibilidade — ativar ANTES de qualquer orçamento", owner: "Antonio + Lucimar" },
          { id: "s9", text: "Repescagem de leads março/abril (script de credibilidade)", owner: "Antonio" },
          { id: "s10", text: "Programa de indicação — base 15.000 clientes", owner: "Antonio" },
          { id: "s11", text: "Meta Ads — Lead Form Instagram/Facebook", owner: "Giu" },
          { id: "s12", text: "Geo-targeting e keywords Google Ads — auditoria completa", owner: "Giu" },
          { id: "s13", text: "Google Meu Negócio — fluxo automático de avaliações pós-contrato", owner: "Andrea", deadline: "Maio/26" },
          { id: "s14", text: "SEO Blog — criar seção /blog com artigos educativos (2/mês)", deadline: "Maio-Jun/26" },
        ],
      },
    ],
  },

  hoodoo: {
    label: "Empório Hoodoo",
    icon: "🌿",
    color: "#a78bfa",
    sections: [
      {
        title: "Rituais Semanais (~10h · Seg tarde + Qua manhã + Qui tarde)",
        freq: "weekly",
        tasks: [
          { id: "h1", text: "Planejar pauta de conteúdo semanal para redes sociais" },
          { id: "h2", text: "Criar e agendar posts (Instagram, Facebook etc.)" },
          { id: "h3", text: "Monitorar engajamento e responder comentários" },
          { id: "h4", text: "Relatório semanal de performance" },
        ],
      },
      {
        title: "Projetos em Andamento",
        freq: "sprint",
        tasks: [
          { id: "h5", text: "Definir identidade de conteúdo e tom de voz" },
          { id: "h6", text: "Mapear automações e integrações necessárias" },
          { id: "h7", text: "Configurar ferramentas de agendamento e analytics" },
        ],
      },
    ],
  },

  jady: {
    label: "Jady",
    icon: "✨",
    color: "#f472b6",
    sections: [
      {
        title: "Rituais Semanais (~10h · Ter manhã + Qua tarde + Sex manhã)",
        freq: "weekly",
        tasks: [
          { id: "jd1", text: "Planejar pauta de conteúdo semanal para redes sociais" },
          { id: "jd2", text: "Criar e agendar posts" },
          { id: "jd3", text: "Monitorar engajamento e responder comentários" },
          { id: "jd4", text: "Relatório semanal de performance" },
        ],
      },
      {
        title: "Projetos em Andamento",
        freq: "sprint",
        tasks: [
          { id: "jd5", text: "Definir identidade de conteúdo e tom de voz" },
          { id: "jd6", text: "Mapear automações e integrações necessárias" },
          { id: "jd7", text: "Configurar ferramentas de agendamento e analytics" },
        ],
      },
    ],
  },

  jiupter: {
    label: "Jiupter",
    icon: "🚀",
    color: "#f59e0b",
    sections: [
      {
        title: "Rituais Semanais (~7.5h · 15:30–17h todos os dias)",
        freq: "weekly",
        tasks: [
          { id: "j1", text: "Sprint Jiupter — revisão estratégica", time: "Qui 15:30" },
          { id: "j2", text: "Atualizar dashboard PowerBI" },
          { id: "j3", text: "Publicar 1 conteúdo orgânico (growth + tech)", owner: "Giu" },
          { id: "j4", text: "Revisar pipeline de prospects", owner: "Giu" },
        ],
      },
      {
        title: "Mensal",
        freq: "monthly",
        tasks: [
          { id: "j5", text: "Revisão financeira — MRR e margem" },
          { id: "j6", text: "Benchmark de mercado (Tegrus, GrowthMachine, concorrentes)" },
        ],
      },
      {
        title: "Projetos em Andamento",
        freq: "sprint",
        tasks: [
          { id: "j7", text: "Finalizar identidade visual e logo" },
          { id: "j8", text: "Definir e aprovar slogan", owner: "Você + Giu" },
          { id: "j9", text: "Criar site institucional Jiupter" },
          { id: "j10", text: "Publicar Google Meu Negócio da Jiupter" },
          { id: "j11", text: "Documentar case Senaf para portfólio" },
          { id: "j12", text: "Criar proposta comercial PDF + definir pacotes de preço" },
          { id: "j13", text: "Mapear e disparar cold outreach — 10 prospects", owner: "Giu" },
          { id: "j14", text: "Abrir CNPJ — gatilho: 2º cliente fechado" },
        ],
      },
      {
        title: "Backlog",
        freq: "backlog",
        tasks: [
          { id: "j15", text: "Automatizar 60% das tarefas repetitivas (n8n)" },
          { id: "j16", text: "Criar metodologia documentada — Método Jiupter" },
          { id: "j17", text: "Prospectar 2º e 3º clientes (meta: R$10k MRR mês 3)", owner: "Giu" },
          { id: "j18", text: "Abrir vertical B2B para empresas com frota" },
        ],
      },
    ],
  },
};

const FREQ_BADGE = {
  daily:    { label: "Diário",    bg: "#1e1b4b", color: "#a5b4fc" },
  weekly:   { label: "Semanal",  bg: "#064e3b", color: "#6ee7b7" },
  monthly:  { label: "Mensal",   bg: "#431407", color: "#fdba74" },
  sprint:   { label: "Sprint",   bg: "#1e3a5f", color: "#7dd3fc" },
  backlog:  { label: "Backlog",  bg: "#1a1a2e", color: "#818cf8" },
  pending:  { label: "Pendente", bg: "#1f1635", color: "#c4b5fd" },
};

function Badge({ freq }) {
  const b = FREQ_BADGE[freq] || FREQ_BADGE.pending;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      padding: "2px 7px", borderRadius: 4,
      backgroundColor: b.bg, color: b.color,
      textTransform: "uppercase", border: `1px solid ${b.color}22`,
    }}>
      {b.label}
    </span>
  );
}

function TaskItem({ task, checked, onToggle }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "10px 12px", borderRadius: 8,
      backgroundColor: checked ? "#0f1a0f" : "#111318",
      border: checked ? "1px solid #1a3a1a" : "1px solid #1e2130",
      marginBottom: 6, opacity: checked ? 0.55 : 1,
      transition: "all 0.15s ease",
    }}>
      <div
        onClick={onToggle}
        style={{
          width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
          border: checked ? "2px solid #22c55e" : "2px solid #374151",
          backgroundColor: checked ? "#22c55e22" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.15s ease",
        }}
      >
        {checked && <span style={{ fontSize: 11, color: "#22c55e" }}>✓</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0, fontSize: 13, lineHeight: 1.4,
          color: checked ? "#4b5563" : "#d1d5db",
          textDecoration: checked ? "line-through" : "none",
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          {task.text}
        </p>
        {(task.time || task.owner || task.deadline) && (
          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
            {task.time     && <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>⏰ {task.time}</span>}
            {task.owner    && <span style={{ fontSize: 11, color: "#6b7280" }}>👤 {task.owner}</span>}
            {task.deadline && <span style={{ fontSize: 11, color: "#f59e0b" }}>📅 {task.deadline}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

const STORAGE_KEY = "rotina-checked";

export default function RotinaTrabalho() {
  const [activeTab, setActiveTab] = useState("rotina");
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const allTasks = Object.values(TASKS).flatMap(a => a.sections.flatMap(s => s.tasks));
  const totalDone = allTasks.filter(t => checked[t.id]).length;
  const totalAll  = allTasks.length;
  const pct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
  const area = TASKS[activeTab];

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0c10",
      fontFamily: "'IBM Plex Sans', sans-serif",
      background: "radial-gradient(ellipse at 20% 10%, #0f1729 0%, #0a0c10 60%)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "28px 24px 0", borderBottom: "1px solid #1a1f2e" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", color: "#4b6a9b", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
                PEDRO MOTA
              </p>
              <h1 style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                Rotina de Trabalho
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 11, color: "#4b5563", fontFamily: "'Space Mono', monospace" }}>PROGRESSO GERAL</p>
              <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 700, color: "#22c55e", fontFamily: "'Space Mono', monospace" }}>
                {totalDone}/{totalAll}
                <span style={{ fontSize: 13, color: "#4b5563", marginLeft: 6 }}>{pct}%</span>
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, backgroundColor: "#1e2130", borderRadius: 2, marginBottom: 20 }}>
            <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: "linear-gradient(90deg, #22c55e, #34d399)", transition: "width 0.4s ease" }} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {Object.entries(TASKS).map(([key, val]) => {
              const areaTasks = val.sections.flatMap(s => s.tasks);
              const doneTasks = areaTasks.filter(t => checked[t.id]).length;
              const isActive  = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "10px 20px", fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? val.color : "#4b5563",
                    borderBottom: isActive ? `2px solid ${val.color}` : "2px solid transparent",
                    transition: "all 0.15s ease", whiteSpace: "nowrap",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  {val.icon} {val.label}
                  <span style={{
                    marginLeft: 6, fontSize: 10, padding: "1px 6px", borderRadius: 10,
                    backgroundColor: isActive ? `${val.color}22` : "#1e2130",
                    color: isActive ? val.color : "#4b5563",
                  }}>
                    {doneTasks}/{areaTasks.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 24px 80px" }}>
        {area.sections.map((section, si) => (
          <div key={si} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {section.title}
              </h2>
              <Badge freq={section.freq} />
              <span style={{ fontSize: 11, color: "#374151", marginLeft: "auto", fontFamily: "'Space Mono', monospace" }}>
                {section.tasks.filter(t => checked[t.id]).length}/{section.tasks.length}
              </span>
            </div>

            {section.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                checked={!!checked[task.id]}
                onToggle={() => toggle(task.id)}
              />
            ))}
          </div>
        ))}

        {/* Rodapé */}
        <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              const next = {};
              setChecked(next);
              try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
            }}
            style={{
              background: "none", border: "1px solid #1e2130", color: "#4b5563",
              padding: "8px 20px", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#374151"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2130"}
          >
            ↺ Reiniciar checks
          </button>
          <a
            href="/"
            style={{
              background: "none", border: "1px solid #1e2130", color: "#4b5563",
              padding: "8px 20px", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif",
              textDecoration: "none", display: "inline-flex", alignItems: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#4b6a9b"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2130"}
          >
            ← Painel Mestre
          </a>
        </div>
      </div>
    </div>
  );
}
