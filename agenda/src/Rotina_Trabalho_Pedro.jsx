import { useState } from "react";

const DAYS = [
  {
    id: "seg",
    short: "SEG",
    name: "Segunda-feira",
    theme: "Planejamento + Dev",
    emoji: "⚙️",
    blocks: [
      { time: "09:00", end: "09:30", label: "Planejamento semanal", desc: "Trello, prioridades da semana, mensagens do fim de semana", type: "ops" },
      { time: "09:30", end: "10:00", label: "Revisão de métricas", desc: "Google Ads (CPL), GA4 (blog), Search Console (indexação)", type: "ops" },
      { time: "10:00", end: "12:00", label: "Desenvolvimento (deep work)", desc: "Power BI, Sheets, n8n, LP, APIs — demanda técnica prioritária", type: "dev" },
      { time: "12:00", end: "13:30", label: "Almoço", desc: "", type: "break" },
      { time: "13:30", end: "14:30", label: "Conteúdo / Blog", desc: "Escrever artigo, imagens, RankMath, submeter no Search Console", type: "content" },
      { time: "14:30", end: "16:30", label: "Estudo", desc: "Data Science, curso em andamento, prática", type: "study" },
      { time: "16:30", end: "17:00", label: "Fechamento do dia", desc: "Atualizar Trello, responder Senaf, anotar pendências", type: "ops" },
    ],
  },
  {
    id: "ter",
    short: "TER",
    name: "Terça-feira",
    theme: "Tráfego + Assets",
    emoji: "🎨",
    blocks: [
      { time: "09:00", end: "09:30", label: "Sync com Giu", desc: "Google Ads, Meta Ads, orçamento, keywords, remarketing", type: "meeting" },
      { time: "09:30", end: "12:00", label: "Desenvolvimento (deep work)", desc: "Projeto técnico prioritário — segundo grande bloco de dev", type: "dev" },
      { time: "12:00", end: "13:30", label: "Almoço", desc: "", type: "break" },
      { time: "13:30", end: "15:00", label: "Produção visual", desc: "Assets: Instagram, WhatsApp, blog. Checklists, posts, imagens", type: "content" },
      { time: "15:00", end: "15:30", label: "Suporte Giu", desc: "UTMs, conversões, LP, ajustes técnicos de tráfego", type: "meeting" },
      { time: "15:30", end: "16:30", label: "Estudo", desc: "Data Science ou curso", type: "study" },
      { time: "16:30", end: "17:00", label: "Fechamento do dia", desc: "Atualizar Trello, responder Senaf", type: "ops" },
    ],
  },
  {
    id: "qua",
    short: "QUA",
    name: "Quarta-feira",
    theme: "Deep Work + Estudo",
    emoji: "🧠",
    blocks: [
      { time: "09:00", end: "12:00", label: "Desenvolvimento (deep work)", desc: "3h ininterruptas — projeto mais complexo da semana. Zero interrupções", type: "dev" },
      { time: "12:00", end: "13:30", label: "Almoço", desc: "", type: "break" },
      { time: "13:30", end: "15:30", label: "Estudo (bloco longo)", desc: "Maior bloco da semana. Data Science, modelagem, Python, prática", type: "study" },
      { time: "15:30", end: "16:00", label: "Prep reunião de quinta", desc: "Métricas, status das demandas, montar pauta", type: "ops" },
      { time: "16:00", end: "16:30", label: "Conteúdo / social media", desc: "Posts da semana, WhatsApp Status, agendamentos", type: "content" },
      { time: "16:30", end: "17:00", label: "Fechamento do dia", desc: "Trello, pauta da reunião pronta", type: "ops" },
    ],
  },
  {
    id: "qui",
    short: "QUI",
    name: "Quinta-feira",
    theme: "Reunião + Operacional",
    emoji: "🤝",
    blocks: [
      { time: "09:00", end: "09:30", label: "Sync com Giu", desc: "Resultados das campanhas, ajustes, performance", type: "meeting" },
      { time: "09:30", end: "10:30", label: "Revisão pré-reunião", desc: "Dados finais, apresentação, status de todas as demandas", type: "ops" },
      { time: "10:30", end: "12:00", label: "Reunião semanal — Senaf", desc: "Resultados, demandas novas, bloqueios, prioridades. Registrar atas", type: "meeting" },
      { time: "12:00", end: "13:30", label: "Almoço", desc: "", type: "break" },
      { time: "13:30", end: "14:00", label: "Pós-reunião", desc: "Cards no Trello, novas demandas, prioridades definidas", type: "ops" },
      { time: "14:00", end: "15:30", label: "Execução de demandas", desc: "Resolver o que saiu da reunião: ajustes, correções, respostas", type: "dev" },
      { time: "15:30", end: "16:30", label: "Estudo", desc: "Data Science ou curso", type: "study" },
      { time: "16:30", end: "17:00", label: "Fechamento do dia", desc: "Atualizar Trello, responder pendências", type: "ops" },
    ],
  },
  {
    id: "sex",
    short: "SEX",
    name: "Sexta-feira",
    theme: "Revisão + Jiupter",
    emoji: "🚀",
    blocks: [
      { time: "09:00", end: "09:30", label: "Revisão semanal", desc: "O que foi feito? O que ficou? Mover cards no Trello", type: "ops" },
      { time: "09:30", end: "10:00", label: "Métricas semanais", desc: "KPIs: leads, orçamentos, contratos, CPL, conversão", type: "ops" },
      { time: "10:00", end: "12:00", label: "Estudo (bloco longo)", desc: "Segundo grande bloco. Aprofundamento, projetos de aprendizado", type: "study" },
      { time: "12:00", end: "13:30", label: "Almoço", desc: "", type: "break" },
      { time: "13:30", end: "14:30", label: "Jiupter — backoffice", desc: "MEI, nota fiscal, financeiro, contratos, documentação", type: "jiupter" },
      { time: "14:30", end: "15:30", label: "Jiupter — estratégia", desc: "Novos clientes, portfólio, marca, LinkedIn, metodologia", type: "jiupter" },
      { time: "15:30", end: "16:30", label: "Buffer / overflow", desc: "Pendências da semana ou estudo extra", type: "ops" },
      { time: "16:30", end: "17:00", label: "Planejamento próxima semana", desc: "Top 3 prioridades. Fechar Trello. Desligar.", type: "ops" },
    ],
  },
];

const TYPE_CONFIG = {
  dev: { color: "#0A9B9B", bg: "#0A9B9B15", label: "Dev", icon: "⚡" },
  study: { color: "#7C3AED", bg: "#7C3AED12", label: "Estudo", icon: "📚" },
  content: { color: "#D97706", bg: "#D9770612", label: "Conteúdo", icon: "✏️" },
  meeting: { color: "#2563EB", bg: "#2563EB12", label: "Reunião", icon: "🤝" },
  ops: { color: "#64748B", bg: "#64748B10", label: "Operacional", icon: "📋" },
  jiupter: { color: "#D4AF37", bg: "#D4AF3715", label: "Jiupter", icon: "🚀" },
  break: { color: "#94A3B8", bg: "#94A3B810", label: "Pausa", icon: "☕" },
};

const WEEKLY_HOURS = [
  { label: "Dev / Tech", hours: 10, color: "#0A9B9B" },
  { label: "Estudo", hours: 8, color: "#7C3AED" },
  { label: "Conteúdo", hours: 3, color: "#D97706" },
  { label: "Reuniões", hours: 3, color: "#2563EB" },
  { label: "Operacional", hours: 3, color: "#64748B" },
  { label: "Jiupter", hours: 2, color: "#D4AF37" },
  { label: "Buffer", hours: 1, color: "#CBD5E1" },
];

const RULES = [
  { icon: "🔒", title: "Proteja a manhã", desc: "09-12h = celular no silencioso. Deep work. Sem WhatsApp." },
  { icon: "📊", title: "Quinta com dados", desc: "Chegue na reunião com métricas, não achismos. Prepare na quarta." },
  { icon: "📖", title: "Estudo é trabalho", desc: "8h semanais fixas. Não é 'quando sobrar' — é compromisso." },
  { icon: "🏢", title: "Sexta é da Jiupter", desc: "Se não dedicar tempo à empresa, ela nunca cresce além da Senaf." },
  { icon: "📝", title: "Fechamento diário", desc: "16:30 todo dia: Trello, pendências, plano do dia seguinte." },
];

function getDuration(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

export default function WorkRoutine() {
  const [activeDay, setActiveDay] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const day = DAYS[activeDay];

  const totalByType = {};
  day.blocks.forEach((b) => {
    if (b.type === "break") return;
    const mins = getDuration(b.time, b.end);
    totalByType[b.type] = (totalByType[b.type] || 0) + mins;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0B0E14", color: "#E2E8F0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #1E293B" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1B2A4E, #0A9B9B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#D4AF37" }}>J</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.02em" }}>Rotina de Trabalho</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#64748B" }}>Pedro Mota · Jiupter · 09:00–17:00</p>
          </div>
        </div>
      </div>

      {/* Day tabs */}
      <div style={{ display: "flex", gap: 4, padding: "16px 24px 0", overflowX: "auto" }}>
        {DAYS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActiveDay(i)}
            style={{
              flex: "1 1 0",
              minWidth: 58,
              padding: "10px 6px",
              border: activeDay === i ? "1.5px solid #0A9B9B" : "1px solid #1E293B",
              borderRadius: 10,
              background: activeDay === i ? "#0A9B9B12" : "#0F1219",
              color: activeDay === i ? "#0A9B9B" : "#64748B",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>{d.short}</div>
            <div style={{ fontSize: 16, marginTop: 2 }}>{d.emoji}</div>
          </button>
        ))}
      </div>

      {/* Day header */}
      <div style={{ padding: "20px 24px 12px" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#F1F5F9" }}>{day.emoji} {day.name}</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#0A9B9B", fontWeight: 500 }}>{day.theme}</p>
      </div>

      {/* Mini summary */}
      <div style={{ display: "flex", gap: 6, padding: "0 24px 16px", flexWrap: "wrap" }}>
        {Object.entries(totalByType).map(([type, mins]) => {
          const cfg = TYPE_CONFIG[type];
          return (
            <span key={type} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontWeight: 500, border: `1px solid ${cfg.color}20` }}>
              {cfg.icon} {cfg.label} {Math.round(mins / 60 * 10) / 10}h
            </span>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{ padding: "0 24px 24px" }}>
        {day.blocks.map((block, i) => {
          const cfg = TYPE_CONFIG[block.type];
          const mins = getDuration(block.time, block.end);
          const isBreak = block.type === "break";

          if (isBreak) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", opacity: 0.4 }}>
                <div style={{ width: 52, textAlign: "right", fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>{block.time}</div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#334155" }} />
                <div style={{ flex: 1, height: 1, background: "#1E293B" }} />
                <span style={{ fontSize: 11, color: "#475569" }}>☕ Almoço</span>
                <div style={{ flex: 1, height: 1, background: "#1E293B" }} />
              </div>
            );
          }

          return (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
              {/* Time */}
              <div style={{ width: 52, textAlign: "right", paddingTop: 12, fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono', monospace", lineHeight: "1.4" }}>
                <div>{block.time}</div>
                <div style={{ color: "#334155", fontSize: 10 }}>{block.end}</div>
              </div>

              {/* Dot + Line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cfg.color, flexShrink: 0, boxShadow: `0 0 8px ${cfg.color}40` }} />
                <div style={{ width: 1.5, flex: 1, background: `${cfg.color}25`, marginTop: 4 }} />
              </div>

              {/* Card */}
              <div style={{
                flex: 1,
                background: cfg.bg,
                borderRadius: 12,
                padding: "12px 16px",
                borderLeft: `3px solid ${cfg.color}`,
                minHeight: mins > 60 ? 72 : 52,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#F1F5F9" }}>{block.label}</span>
                  <span style={{ fontSize: 10, color: cfg.color, fontWeight: 500, background: `${cfg.color}18`, padding: "2px 8px", borderRadius: 12 }}>
                    {mins >= 60 ? `${mins / 60}h` : `${mins}min`}
                  </span>
                </div>
                {block.desc && <p style={{ margin: 0, fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{block.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly distribution */}
      <div style={{ padding: "0 24px 24px" }}>
        <div style={{ background: "#111827", borderRadius: 14, padding: 20, border: "1px solid #1E293B" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.03em" }}>Distribuição semanal — 30h úteis</h3>

          {WEEKLY_HOURS.map((cat) => (
            <div key={cat.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 80, fontSize: 12, color: "#94A3B8", textAlign: "right" }}>{cat.label}</span>
              <div style={{ flex: 1, height: 18, background: "#1E293B", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${(cat.hours / 10) * 100}%`,
                  height: "100%",
                  background: `${cat.color}CC`,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 8,
                  transition: "width 0.5s ease",
                }}>
                  {cat.hours >= 3 && <span style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>{cat.hours}h</span>}
                </div>
              </div>
              {cat.hours < 3 && <span style={{ fontSize: 11, color: "#64748B", minWidth: 24 }}>{cat.hours}h</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div style={{ padding: "0 24px 24px" }}>
        <button
          onClick={() => setShowRules(!showRules)}
          style={{
            width: "100%",
            background: "#111827",
            border: "1px solid #1E293B",
            borderRadius: 14,
            padding: "14px 20px",
            color: "#94A3B8",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "inherit",
          }}
        >
          <span>🔒 Regras de ouro</span>
          <span style={{ transform: showRules ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: 12 }}>▼</span>
        </button>

        {showRules && (
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {RULES.map((rule, i) => (
              <div key={i} style={{ background: "#111827", borderRadius: 12, padding: "14px 16px", border: "1px solid #1E293B", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{rule.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#E2E8F0" }}>{rule.title}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily checklist */}
      <div style={{ padding: "0 24px 32px" }}>
        <div style={{ background: "#111827", borderRadius: 14, padding: 20, border: "1px solid #1E293B" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#94A3B8" }}>☑️ Checklist diário</h3>
          {[
            "Bloco da manhã protegido (sem interrupções)?",
            "Prioridade nº 1 do dia foi trabalhada?",
            "Trello atualizado?",
            "Mensagens da Senaf respondidas?",
            "Estudo realizado?",
            "Próximo dia planejado?",
          ].map((item, i) => {
            const [checked, setChecked] = useState(false);
            return (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 5 ? "1px solid #1E293B" : "none", cursor: "pointer", userSelect: "none" }}>
                <div
                  onClick={() => setChecked(!checked)}
                  style={{
                    width: 20, height: 20, borderRadius: 6, border: checked ? "none" : "1.5px solid #334155",
                    background: checked ? "#0A9B9B" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.2s", cursor: "pointer",
                  }}
                >
                  {checked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: 13, color: checked ? "#64748B" : "#CBD5E1", textDecoration: checked ? "line-through" : "none", transition: "all 0.2s" }}>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px 24px", borderTop: "1px solid #1E293B", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 11, color: "#334155" }}>Jiupter · Do dado à decisão</p>
      </div>
    </div>
  );
}
