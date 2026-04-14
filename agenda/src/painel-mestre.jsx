import { useState, useEffect, useRef } from "react";

const DEFAULT_TASKS = {
  pessoal: {
    label: "Pessoal & Bem-Estar",
    icon: "🧠",
    color: "#a78bfa",
    sections: [
      {
        title: "Diário",
        freq: "daily",
        tasks: [
          { id: "p1", text: "Mandarim — 15 min no HelloChinese", time: "09:00" },
        ],
      },
      {
        title: "Semanal",
        freq: "weekly",
        tasks: [
          { id: "p2", text: "Academia — treinar 3x na semana", time: "10:00" },
          { id: "p3", text: "RPG — sessão aos sábados" },
          { id: "p4", text: "Saúde mental — crochê (FDS ou após 18h)" },
        ],
      },
      {
        title: "Quinzenal",
        freq: "biweekly",
        tasks: [
          { id: "p5", text: "RPG — sessão às terças" },
        ],
      },
      {
        title: "Pendências",
        freq: "pending",
        tasks: [
          { id: "p6", text: "Configurar fone" },
        ],
      },
    ],
  },
  academico: {
    label: "Acadêmico",
    icon: "📚",
    color: "#34d399",
    sections: [
      {
        title: "Semanal",
        freq: "weekly",
        tasks: [
          { id: "a1", text: "Alura — 21h de estudos focados (Data Science / Machine Learning)" },
          { id: "a2", text: "Faculdade — Residência MCTI/Avanti", time: "Sex 08:00" },
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
        title: "Rituais Semanais",
        freq: "weekly",
        tasks: [
          { id: "j0", text: "Sprint Jiupter — SENAF", time: "TER 1h" },
          { id: "j1", text: "Sprint Jiupter — revisão estratégica", time: "Qui 1h" },
          { id: "j2", text: "Atualizar dashboard PowerBI" },
          { id: "j3", text: "Publicar 1 conteúdo orgânico (growth + tech)", owner: "Giu" },
        ],
      },
      {
        title: "Tarefas Urgentes",
        freq: "urgent",
        tasks: [
          { id: "j4", text: "Definir Logo" },
          { id: "j5", text: "Criar Página Linkedin/instagram" },
          { id: "j6", text: "Publicar 1 conteúdo orgânico (growth + tech)", owner: "Giu" },
          { id: "j7", text: "Ativar Google Meu negócio" },
          { id: "j8", text: "Estudar panfletos" },
          { id: "j9", text: "Fazer Site E powerbi" },
        ],
      },
      {
        title: "Quinzenal",
        freq: "biweekly",
        tasks: [
          { id: "jq1", text: "Revisar pipeline de prospects" },
        ],
      },
      {
        title: "Mensal",
        freq: "monthly",
        tasks: [
          { id: "jm1", text: "Revisão financeira — MRR e margem" },
          { id: "jm2", text: "Benchmark de mercado (Tegrus, GrowthMachine, concorrentes)" },
        ],
      },
      {
        title: "Sprint 1 — Fundação",
        freq: "sprint",
        tasks: [
          { id: "js1", text: "Finalizar identidade visual e logo" },
          { id: "js2", text: "Definir e aprovar slogan", owner: "JP + Giu" },
          { id: "js3", text: "Criar site institucional Jiupter" },
          { id: "js4", text: "Publicar Google Meu Negócio" },
          { id: "js5", text: "Documentar case Senaf (CPL, CTR, stack, resultado)" },
          { id: "js6", text: "Implementar ritual Duas Agendas (Ter=Senaf · Qui=Jiupter)" },
          { id: "js7", text: "Montar dashboard PowerBI Jiupter (MRR, CAC, pipeline, margem)" },
        ],
      },
      {
        title: "Sprint 2 — Presença e Posicionamento",
        freq: "sprint",
        tasks: [
          { id: "js8", text: "Criar página de case no site (métricas reais da Senaf)" },
          { id: "js9", text: "Publicar 3 posts de credibilidade", owner: "Giu" },
          { id: "js10", text: "Definir pacotes de serviço com preços (3 tiers)" },
          { id: "js11", text: "Criar proposta comercial PDF" },
          { id: "js12", text: "Mapear 10 prospects ideais", owner: "Giu" },
          { id: "js13", text: "Criar script de cold outreach (LinkedIn + e-mail)" },
        ],
      },
      {
        title: "Sprint 3 — Aquisição Cliente 2",
        freq: "sprint",
        tasks: [
          { id: "js14", text: "Disparar cold outreach para 10 prospects", owner: "Giu" },
          { id: "js15", text: "Criar ads próprios da Jiupter (Google/Meta)" },
          { id: "js16", text: "Abrir CNPJ — gatilho: 2º cliente fechado" },
          { id: "js17", text: "Formalizar contrato padrão Jiupter" },
        ],
      },
      {
        title: "Backlog — Médio Prazo",
        freq: "backlog",
        tasks: [
          { id: "jb1", text: "Definir diferencial técnico único da Jiupter" },
          { id: "jb2", text: "Criar metodologia documentada — \"Método Jiupter\"" },
          { id: "jb3", text: "Prospectar 2º e 3º clientes (meta: R$10k MRR até mês 3)", owner: "Giu" },
          { id: "jb4", text: "Revisar precificação com dados reais (após 60 dias)" },
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
        title: "Rituais Semanais",
        freq: "weekly",
        tasks: [
          { id: "s1", text: "Preencher planilha de KPIs — CPL, conversão e leads", time: "Sex" },
          { id: "s2", text: "WhatsApp Status — 2 posts de credibilidade na semana" },
        ],
      },
      {
        title: "Mensal",
        freq: "monthly",
        tasks: [
          { id: "s4", text: "Bater meta de 30+ contratos fechados" },
          { id: "s5", text: "Captar 10 avaliações no Google Meu Negócio" },
          { id: "s6", text: "Criar e publicar 2 artigos no blog (SEO)" },
        ],
      },
      {
        title: "🔴 Urgente — Hoje / 14-16 Abr",
        freq: "urgent",
        tasks: [
          { id: "s7", text: "Kit Credibilidade — ativar ANTES de qualquer orçamento", owner: "Antonio + Lucimar", deadline: "14/04" },
          { id: "s8", text: "Repescagem de leads de março e abril (script de credibilidade)", owner: "Antonio", deadline: "14-16/04" },
          { id: "s9", text: "Ancoragem de custo de espera em todo orçamento", owner: "Lucimar", deadline: "14/04" },
          { id: "s10", text: "Pesquisa competitiva — 5 leads recentes que não fecharam", owner: "Antonio", deadline: "14-15/04" },
        ],
      },
      {
        title: "🟠 Curto Prazo — 15-20 Abr",
        freq: "short",
        tasks: [
          { id: "s11", text: "Programa de indicação — base de 15.000 clientes", owner: "Antonio" },
          { id: "s12", text: "Reativar leads com documentação em aberto", owner: "Antonio" },
          { id: "s13", text: "Google Ads — ativar Remarketing Display", owner: "Giu (Jiupter)" },
          { id: "s14", text: "WhatsApp Status — criar banco de 7 posts de credibilidade" },
          { id: "s15", text: "Parcerias locais — visitar mecânicas e despachantes SJC", owner: "Antonio" },
        ],
      },
      {
        title: "🟡 Médio Prazo — 17-30 Abr",
        freq: "medium",
        tasks: [
          { id: "s16", text: "Meta Ads — campanha Lead Form Instagram/Facebook", owner: "Giu (Jiupter)" },
          { id: "s17", text: "Revisar Geo-Targeting e Keywords Google Ads", owner: "Giu (Jiupter)" },
          { id: "s18", text: "Padronizar funil com Kit Credibilidade integrado", owner: "Antonio + Andrea" },
          { id: "s19", text: "Dashboard de métricas semanais (GA4 + Google Ads + Sheets)", owner: "Jiupter" },
        ],
      },
      {
        title: "🔵 Longo Prazo — Maio-Julho",
        freq: "longterm",
        tasks: [
          { id: "s20", text: "Google Meu Negócio — fluxo automático de avaliações pós-contrato", owner: "Andrea + Antonio", deadline: "Maio/26" },
          { id: "s21", text: "SEO Blog — criar seção /blog com artigos educativos (2/mês)", owner: "Jiupter", deadline: "Maio-Jun/26" },
          { id: "s22", text: "Diversificar canais — reduzir dependência do Google Ads (máx 50%)", owner: "Antonio + Jiupter", deadline: "Jun-Jul/26" },
        ],
      },
    ],
  },
};

const DEFAULT_QUICK_LISTS = [
  { id: "qlinbox", title: "Caixa de entrada", items: [] },
];

const FREQ_BADGE = {
  daily:    { label: "Diário",        bg: "#1e1b4b", color: "#a5b4fc" },
  weekly:   { label: "Semanal",       bg: "#064e3b", color: "#6ee7b7" },
  biweekly: { label: "Quinzenal",     bg: "#1c1917", color: "#d6d3d1" },
  monthly:  { label: "Mensal",        bg: "#431407", color: "#fdba74" },
  sprint:   { label: "Sprint",        bg: "#1e3a5f", color: "#7dd3fc" },
  backlog:  { label: "Backlog",       bg: "#1a1a2e", color: "#818cf8" },
  urgent:   { label: "🔴 Urgente",    bg: "#450a0a", color: "#fca5a5" },
  short:    { label: "🟠 Curto",      bg: "#431407", color: "#fed7aa" },
  medium:   { label: "🟡 Médio",      bg: "#3b2f0a", color: "#fde68a" },
  longterm: { label: "🔵 Longo",      bg: "#0c2340", color: "#93c5fd" },
  pending:  { label: "Pendente",      bg: "#1f1635", color: "#c4b5fd" },
};

const FREQ_OPTIONS = Object.entries(FREQ_BADGE).map(([key, val]) => ({ key, label: val.label }));

function Badge({ freq }) {
  const b = FREQ_BADGE[freq] || FREQ_BADGE.pending;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      padding: "2px 7px", borderRadius: 4,
      backgroundColor: b.bg, color: b.color, textTransform: "uppercase",
      border: `1px solid ${b.color}22`,
    }}>
      {b.label}
    </span>
  );
}

function EditForm({ form, onChange, onSave, onCancel }) {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const base = {
    background: "#0a0e1a",
    border: "1px solid #2d3748",
    borderRadius: 6,
    color: "#e2e8f0",
    fontSize: 13,
    fontFamily: "'IBM Plex Sans', sans-serif",
    outline: "none",
    padding: "6px 10px",
  };

  return (
    <div style={{
      padding: "12px", borderRadius: 8,
      backgroundColor: "#0d1220",
      border: "1px solid #2d3748",
      marginBottom: 6,
    }}>
      <input
        ref={inputRef}
        value={form.text}
        onChange={e => onChange({ ...form, text: e.target.value })}
        onKeyDown={e => { if (e.key === "Enter") onSave(); if (e.key === "Escape") onCancel(); }}
        placeholder="Texto da tarefa"
        style={{ ...base, width: "100%", boxSizing: "border-box", marginBottom: 8 }}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          value={form.time}
          onChange={e => onChange({ ...form, time: e.target.value })}
          placeholder="⏰ Horário"
          style={{ ...base, flex: "1 1 120px" }}
        />
        <input
          value={form.owner}
          onChange={e => onChange({ ...form, owner: e.target.value })}
          placeholder="👤 Responsável"
          style={{ ...base, flex: "1 1 150px" }}
        />
        <input
          value={form.deadline}
          onChange={e => onChange({ ...form, deadline: e.target.value })}
          placeholder="📅 Prazo"
          style={{ ...base, flex: "1 1 120px" }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{
            background: "none", border: "1px solid #374151", color: "#6b7280",
            padding: "5px 14px", borderRadius: 6, cursor: "pointer",
            fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif",
          }}
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          style={{
            background: "#22c55e22", border: "1px solid #22c55e55", color: "#22c55e",
            padding: "5px 14px", borderRadius: 6, cursor: "pointer",
            fontSize: 12, fontWeight: 600, fontFamily: "'IBM Plex Sans', sans-serif",
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

function IconBtn({ onClick, title, children, hoverBorder = "#4b6a9b", hoverColor = "#93c5fd", danger = false }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "none", border: "1px solid #2d3748", color: "#6b7280",
        width: 26, height: 26, borderRadius: 6, cursor: "pointer",
        fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s", flexShrink: 0, padding: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = danger ? "#7f1d1d" : hoverBorder;
        e.currentTarget.style.color = danger ? "#f87171" : hoverColor;
      }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#2d3748"; e.currentTarget.style.color = "#6b7280"; }}
    >
      {children}
    </button>
  );
}

function TaskItem({ task, checked, onToggle, editMode, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        padding: "10px 12px", borderRadius: 8,
        backgroundColor: checked ? "#0f1a0f" : "#111318",
        border: checked ? "1px solid #1a3a1a" : "1px solid #1e2130",
        marginBottom: 6, transition: "all 0.15s ease",
        opacity: editMode ? 1 : (checked ? 0.55 : 1),
      }}
    >
      {/* Setas de reordenação (modo edição) */}
      {editMode && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0, marginTop: 1 }}>
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            title="Mover para cima"
            style={{
              background: "none", border: "none", color: isFirst ? "#1e2130" : "#374151",
              cursor: isFirst ? "default" : "pointer", fontSize: 10, lineHeight: 1,
              padding: "1px 3px", borderRadius: 3, transition: "color 0.15s",
            }}
            onMouseEnter={e => { if (!isFirst) e.currentTarget.style.color = "#93c5fd"; }}
            onMouseLeave={e => { e.currentTarget.style.color = isFirst ? "#1e2130" : "#374151"; }}
          >▲</button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            title="Mover para baixo"
            style={{
              background: "none", border: "none", color: isLast ? "#1e2130" : "#374151",
              cursor: isLast ? "default" : "pointer", fontSize: 10, lineHeight: 1,
              padding: "1px 3px", borderRadius: 3, transition: "color 0.15s",
            }}
            onMouseEnter={e => { if (!isLast) e.currentTarget.style.color = "#93c5fd"; }}
            onMouseLeave={e => { e.currentTarget.style.color = isLast ? "#1e2130" : "#374151"; }}
          >▼</button>
        </div>
      )}

      {/* Checkbox — desabilitado no modo edição */}
      {!editMode && (
        <div
          onClick={onToggle}
          style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: checked ? "2px solid #22c55e" : "2px solid #374151",
            backgroundColor: checked ? "#22c55e22" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s ease", cursor: "pointer",
          }}
        >
          {checked && <span style={{ fontSize: 11, color: "#22c55e" }}>✓</span>}
        </div>
      )}

      {/* Conteúdo */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0, fontSize: 13, lineHeight: 1.4,
          color: checked && !editMode ? "#4b5563" : "#d1d5db",
          textDecoration: checked && !editMode ? "line-through" : "none",
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          {task.text}
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: task.owner || task.time || task.deadline ? 4 : 0, flexWrap: "wrap" }}>
          {task.time && <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>⏰ {task.time}</span>}
          {task.owner && <span style={{ fontSize: 11, color: "#6b7280" }}>👤 {task.owner}</span>}
          {task.deadline && <span style={{ fontSize: 11, color: "#f59e0b" }}>📅 {task.deadline}</span>}
        </div>
      </div>

      {/* Botões de edição */}
      {editMode && (
        <div style={{ display: "flex", gap: 4, flexShrink: 0, alignItems: "center" }}>
          <IconBtn onClick={onEdit} title="Editar tarefa">✏</IconBtn>
          <IconBtn onClick={onDelete} title="Excluir tarefa" danger>✕</IconBtn>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title, freq, editMode, onTitleChange, onFreqChange, tasksDone, tasksTotal }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const commit = () => {
    onTitleChange(val.trim() || title);
    setEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
      {editMode && editing ? (
        <input
          ref={inputRef}
          value={val}
          onChange={e => setVal(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") commit(); }}
          style={{
            background: "#0a0e1a", border: "1px solid #4b6a9b", borderRadius: 6,
            color: "#e2e8f0", fontSize: 13, fontWeight: 600, padding: "3px 8px",
            fontFamily: "'IBM Plex Sans', sans-serif", outline: "none",
            textTransform: "uppercase", letterSpacing: "0.1em",
          }}
        />
      ) : (
        <h2
          onClick={editMode ? () => { setVal(title); setEditing(true); } : undefined}
          style={{
            margin: 0, fontSize: 13, fontWeight: 600, color: editMode ? "#cbd5e1" : "#9ca3af",
            textTransform: "uppercase", letterSpacing: "0.1em",
            cursor: editMode ? "text" : "default",
            borderBottom: editMode ? "1px dashed #374151" : "none",
            paddingBottom: editMode ? 1 : 0,
          }}
          title={editMode ? "Clique para editar título" : undefined}
        >
          {title}
        </h2>
      )}

      {editMode ? (
        <select
          value={freq}
          onChange={e => onFreqChange(e.target.value)}
          style={{
            background: "#0a0e1a", border: "1px solid #2d3748", borderRadius: 4,
            color: "#9ca3af", fontSize: 10, padding: "2px 6px",
            fontFamily: "'IBM Plex Sans', sans-serif", cursor: "pointer",
          }}
        >
          {FREQ_OPTIONS.map(o => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
      ) : (
        <Badge freq={freq} />
      )}

      <span style={{ fontSize: 11, color: "#374151", marginLeft: "auto", fontFamily: "'Space Mono', monospace" }}>
        {tasksDone}/{tasksTotal}
      </span>
    </div>
  );
}

function QuickListsPanel({ lists, onSave }) {
  const [newText, setNewText] = useState({});
  const [editTitle, setEditTitle] = useState(null);
  const [titleVal, setTitleVal] = useState("");
  const titleRef = useRef(null);

  useEffect(() => { if (editTitle) titleRef.current?.focus(); }, [editTitle]);

  const addList = () => {
    const id = `ql_${Date.now()}`;
    const next = [...lists, { id, title: "Nova lista", items: [] }];
    onSave(next);
    setEditTitle(id);
    setTitleVal("Nova lista");
  };

  const deleteList = (listId) => onSave(lists.filter(l => l.id !== listId));

  const commitTitle = (listId) => {
    onSave(lists.map(l => l.id === listId ? { ...l, title: titleVal.trim() || l.title } : l));
    setEditTitle(null);
  };

  const addItem = (listId) => {
    const text = (newText[listId] || "").trim();
    if (!text) return;
    const item = { id: `qi_${Date.now()}`, text, checked: false };
    onSave(lists.map(l => l.id === listId ? { ...l, items: [...l.items, item] } : l));
    setNewText(t => ({ ...t, [listId]: "" }));
  };

  const toggleItem = (listId, itemId) =>
    onSave(lists.map(l => l.id === listId
      ? { ...l, items: l.items.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i) }
      : l));

  const deleteItem = (listId, itemId) =>
    onSave(lists.map(l => l.id === listId
      ? { ...l, items: l.items.filter(i => i.id !== itemId) }
      : l));

  return (
    <div style={{
      width: 220, flexShrink: 0,
      borderRight: "1px solid #1a1f2e",
      background: "#07090f",
    }}>
      <div style={{
        position: "sticky", top: 0,
        maxHeight: "100vh", overflowY: "auto",
        padding: "22px 12px 40px",
        scrollbarWidth: "none",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{
            fontSize: 10, letterSpacing: "0.15em", color: "#4b6a9b",
            textTransform: "uppercase", fontFamily: "'Space Mono', monospace",
          }}>📝 Listas Rápidas</span>
          <button
            onClick={addList}
            title="Nova lista"
            style={{
              background: "none", border: "1px solid #1e2130", color: "#4b5563",
              width: 22, height: 22, borderRadius: 5, cursor: "pointer",
              fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#4b6a9b"; e.currentTarget.style.color = "#93c5fd"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2130"; e.currentTarget.style.color = "#4b5563"; }}
          >+</button>
        </div>

        {/* Lists */}
        {lists.map(list => (
          <div key={list.id} style={{
            marginBottom: 12, background: "#0d1220",
            border: "1px solid #1a1f2e", borderRadius: 8, overflow: "hidden",
          }}>
            {/* Title row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 10px 6px", borderBottom: "1px solid #1a1f2e",
            }}>
              {editTitle === list.id ? (
                <input
                  ref={titleRef}
                  value={titleVal}
                  onChange={e => setTitleVal(e.target.value)}
                  onBlur={() => commitTitle(list.id)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") commitTitle(list.id); }}
                  style={{
                    flex: 1, background: "none", border: "none",
                    borderBottom: "1px solid #4b6a9b",
                    color: "#e2e8f0", fontSize: 11, fontWeight: 600,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    outline: "none", padding: "1px 0",
                  }}
                />
              ) : (
                <span
                  onClick={() => { setEditTitle(list.id); setTitleVal(list.title); }}
                  title="Clique para renomear"
                  style={{
                    flex: 1, fontSize: 11, fontWeight: 600, color: "#94a3b8",
                    cursor: "text", letterSpacing: "0.04em",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >{list.title}</span>
              )}
              <button
                onClick={() => deleteList(list.id)}
                title="Remover lista"
                style={{
                  background: "none", border: "none", color: "#374151",
                  cursor: "pointer", fontSize: 10, padding: 0, lineHeight: 1,
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                onMouseLeave={e => e.currentTarget.style.color = "#374151"}
              >✕</button>
            </div>

            {/* Items */}
            <div style={{ padding: "6px 8px" }}>
              {list.items.map(item => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "flex-start", gap: 6, padding: "3px 2px",
                }}>
                  <div
                    onClick={() => toggleItem(list.id, item.id)}
                    style={{
                      width: 13, height: 13, borderRadius: 3, flexShrink: 0, marginTop: 1,
                      border: item.checked ? "1.5px solid #22c55e" : "1.5px solid #374151",
                      backgroundColor: item.checked ? "#22c55e22" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {item.checked && <span style={{ fontSize: 9, color: "#22c55e" }}>✓</span>}
                  </div>
                  <span style={{
                    flex: 1, fontSize: 11, lineHeight: 1.4,
                    color: item.checked ? "#4b5563" : "#94a3b8",
                    textDecoration: item.checked ? "line-through" : "none",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    wordBreak: "break-word",
                  }}>{item.text}</span>
                  <button
                    onClick={() => deleteItem(list.id, item.id)}
                    style={{
                      background: "none", border: "none", color: "transparent",
                      cursor: "pointer", fontSize: 9, padding: 0, lineHeight: 1,
                      flexShrink: 0, transition: "color 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                    onMouseLeave={e => e.currentTarget.style.color = "transparent"}
                  >✕</button>
                </div>
              ))}

              {/* Add item input */}
              <div style={{ marginTop: list.items.length > 0 ? 5 : 2 }}>
                <input
                  value={newText[list.id] || ""}
                  onChange={e => setNewText(t => ({ ...t, [list.id]: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") addItem(list.id); }}
                  placeholder="Adicionar item..."
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "none", border: "none",
                    borderBottom: "1px solid #1e2130",
                    color: "#6b7280", fontSize: 11,
                    padding: "3px 2px", outline: "none",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.target.style.borderBottomColor = "#4b6a9b"}
                  onBlur={e => e.target.style.borderBottomColor = "#1e2130"}
                />
              </div>
            </div>
          </div>
        ))}

        {lists.length === 0 && (
          <p style={{
            fontSize: 11, color: "#374151", textAlign: "center",
            marginTop: 20, fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            Clique em + para criar uma lista
          </p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("pessoal");
  const [checked, setChecked] = useState({});
  const [tasks, setTasks] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // { areaKey, sectionIdx, taskIdx }
  const [editForm, setEditForm] = useState({});
  const [quickLists, setQuickLists] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = localStorage.getItem("tasks-checked");
        if (r) setChecked(JSON.parse(r));
        const t = localStorage.getItem("tasks-data");
        setTasks(t ? JSON.parse(t) : JSON.parse(JSON.stringify(DEFAULT_TASKS)));
        const q = localStorage.getItem("quicklists-data");
        setQuickLists(q ? JSON.parse(q) : JSON.parse(JSON.stringify(DEFAULT_QUICK_LISTS)));
      } catch {
        setTasks(JSON.parse(JSON.stringify(DEFAULT_TASKS)));
        setQuickLists(JSON.parse(JSON.stringify(DEFAULT_QUICK_LISTS)));
      }
      setLoaded(true);
    })();
  }, []);

  const saveQuickLists = async (next) => {
    setQuickLists(next);
    try { localStorage.setItem("quicklists-data", JSON.stringify(next)); } catch {}
  };

  const saveTasks = async (next) => {
    setTasks(next);
    try { localStorage.setItem("tasks-data", JSON.stringify(next)); } catch {}
  };

  const toggle = async (id) => {
    if (editMode) return;
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem("tasks-checked", JSON.stringify(next)); } catch {}
  };

  const startEdit = (areaKey, sectionIdx, taskIdx) => {
    const task = tasks[areaKey].sections[sectionIdx].tasks[taskIdx];
    setEditingTask({ areaKey, sectionIdx, taskIdx });
    setEditForm({ text: task.text, time: task.time || "", owner: task.owner || "", deadline: task.deadline || "" });
  };

  const saveEdit = () => {
    if (!editingTask) return;
    const { areaKey, sectionIdx, taskIdx } = editingTask;
    const next = JSON.parse(JSON.stringify(tasks));
    const task = next[areaKey].sections[sectionIdx].tasks[taskIdx];
    task.text = editForm.text || task.text;
    if (editForm.time) task.time = editForm.time; else delete task.time;
    if (editForm.owner) task.owner = editForm.owner; else delete task.owner;
    if (editForm.deadline) task.deadline = editForm.deadline; else delete task.deadline;
    saveTasks(next);
    setEditingTask(null);
  };

  const cancelEdit = () => setEditingTask(null);

  const deleteTask = (areaKey, sectionIdx, taskIdx) => {
    const next = JSON.parse(JSON.stringify(tasks));
    next[areaKey].sections[sectionIdx].tasks.splice(taskIdx, 1);
    saveTasks(next);
    if (editingTask?.areaKey === areaKey && editingTask?.sectionIdx === sectionIdx && editingTask?.taskIdx === taskIdx) {
      setEditingTask(null);
    }
  };

  const addTask = (areaKey, sectionIdx) => {
    const next = JSON.parse(JSON.stringify(tasks));
    const section = next[areaKey].sections[sectionIdx];
    const newId = `custom_${Date.now()}`;
    section.tasks.push({ id: newId, text: "Nova tarefa" });
    saveTasks(next);
    setEditingTask({ areaKey, sectionIdx, taskIdx: section.tasks.length - 1 });
    setEditForm({ text: "Nova tarefa", time: "", owner: "", deadline: "" });
  };

  const updateSectionTitle = (areaKey, sectionIdx, newTitle) => {
    const next = JSON.parse(JSON.stringify(tasks));
    next[areaKey].sections[sectionIdx].title = newTitle;
    saveTasks(next);
  };

  const updateSectionFreq = (areaKey, sectionIdx, newFreq) => {
    const next = JSON.parse(JSON.stringify(tasks));
    next[areaKey].sections[sectionIdx].freq = newFreq;
    saveTasks(next);
  };

  const addSection = (areaKey) => {
    const next = JSON.parse(JSON.stringify(tasks));
    next[areaKey].sections.push({
      title: "Nova Seção",
      freq: "pending",
      tasks: [],
    });
    saveTasks(next);
  };

  const deleteSection = (areaKey, sectionIdx) => {
    const next = JSON.parse(JSON.stringify(tasks));
    next[areaKey].sections.splice(sectionIdx, 1);
    saveTasks(next);
    setEditingTask(null);
  };

  const moveTask = (areaKey, sectionIdx, taskIdx, dir) => {
    const next = JSON.parse(JSON.stringify(tasks));
    const arr = next[areaKey].sections[sectionIdx].tasks;
    const newIdx = taskIdx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[taskIdx], arr[newIdx]] = [arr[newIdx], arr[taskIdx]];
    saveTasks(next);
    if (editingTask?.areaKey === areaKey && editingTask?.sectionIdx === sectionIdx && editingTask?.taskIdx === taskIdx) {
      setEditingTask({ ...editingTask, taskIdx: newIdx });
    }
  };

  const moveSection = (areaKey, sectionIdx, dir) => {
    const next = JSON.parse(JSON.stringify(tasks));
    const arr = next[areaKey].sections;
    const newIdx = sectionIdx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[sectionIdx], arr[newIdx]] = [arr[newIdx], arr[sectionIdx]];
    saveTasks(next);
    setEditingTask(null);
  };

  const resetToDefault = async () => {
    const next = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    await saveTasks(next);
    setChecked({});
    try { localStorage.setItem("tasks-checked", JSON.stringify({})); } catch {}
  };

  if (!loaded || !tasks || !quickLists) return (
    <div style={{ background: "#0a0c10", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#4b5563", fontFamily: "sans-serif" }}>
      Carregando...
    </div>
  );

  const area = tasks[activeTab];
  const allTasks = Object.values(tasks).flatMap(a => a.sections.flatMap(s => s.tasks));
  const totalDone = allTasks.filter(t => checked[t.id]).length;
  const totalAll = allTasks.length;
  const pct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0c10",
      fontFamily: "'IBM Plex Sans', sans-serif",
      background: "radial-gradient(ellipse at 20% 10%, #0f1729 0%, #0a0c10 60%)",
      display: "flex",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <QuickListsPanel lists={quickLists} onSave={saveQuickLists} />

      <div style={{ flex: 1, minWidth: 0 }}>
      {/* Header */}
      <div style={{ padding: "28px 24px 0", borderBottom: "1px solid #1a1f2e" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", color: "#4b6a9b", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
                LISTA MESTRE DE AFAZERES
              </p>
              <h1 style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                Central de Controle
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
              {/* Botão modo edição */}
              <button
                onClick={() => { setEditMode(e => !e); setEditingTask(null); }}
                style={{
                  background: editMode ? "#1e3a5f" : "none",
                  border: editMode ? "1px solid #3b82f6" : "1px solid #2d3748",
                  color: editMode ? "#93c5fd" : "#6b7280",
                  padding: "6px 14px", borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontWeight: editMode ? 600 : 400,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  transition: "all 0.15s ease",
                  display: "flex", alignItems: "center", gap: 6,
                  marginBottom: 2,
                }}
              >
                {editMode ? "✓ Edição ativa" : "✏ Editar"}
              </button>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 11, color: "#4b5563", fontFamily: "'Space Mono', monospace" }}>PROGRESSO GERAL</p>
                <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 700, color: "#22c55e", fontFamily: "'Space Mono', monospace" }}>
                  {totalDone}/{totalAll}
                  <span style={{ fontSize: 13, color: "#4b5563", marginLeft: 6 }}>{pct}%</span>
                </p>
              </div>
            </div>
          </div>

          {/* Aviso modo edição */}
          {editMode && (
            <div style={{
              marginBottom: 16, padding: "8px 14px", borderRadius: 8,
              backgroundColor: "#1e3a5f22", border: "1px solid #3b82f644",
              color: "#93c5fd", fontSize: 12, fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.05em",
            }}>
              ✏ MODO EDIÇÃO — ✏ editar · ✕ excluir · ▲▼ reordenar · clique no título da seção para renomear
            </div>
          )}

          {/* Progress bar */}
          <div style={{ height: 4, backgroundColor: "#1e2130", borderRadius: 2, marginBottom: 20 }}>
            <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: "linear-gradient(90deg, #22c55e, #34d399)", transition: "width 0.4s ease" }} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {Object.entries(tasks).map(([key, val]) => {
              const areaTasks = val.sections.flatMap(s => s.tasks);
              const doneTasks = areaTasks.filter(t => checked[t.id]).length;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "10px 20px", fontSize: 13, fontWeight: isActive ? 600 : 400,
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
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 24px 60px" }}>
        {area.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} style={{ marginBottom: 28 }}>
            {/* Cabeçalho da seção */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <SectionTitle
                  title={section.title}
                  freq={section.freq}
                  editMode={editMode}
                  onTitleChange={v => updateSectionTitle(activeTab, sectionIdx, v)}
                  onFreqChange={v => updateSectionFreq(activeTab, sectionIdx, v)}
                  tasksDone={section.tasks.filter(t => checked[t.id]).length}
                  tasksTotal={section.tasks.length}
                />
              </div>
              {editMode && (
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 12 }}>
                  <IconBtn
                    onClick={() => moveSection(activeTab, sectionIdx, -1)}
                    title="Mover seção para cima"
                    hoverColor="#93c5fd"
                  >▲</IconBtn>
                  <IconBtn
                    onClick={() => moveSection(activeTab, sectionIdx, 1)}
                    title="Mover seção para baixo"
                    hoverColor="#93c5fd"
                  >▼</IconBtn>
                  <IconBtn
                    onClick={() => deleteSection(activeTab, sectionIdx)}
                    title="Excluir seção"
                    danger
                  >✕</IconBtn>
                </div>
              )}
            </div>

            {/* Tarefas */}
            {section.tasks.map((task, taskIdx) => {
              const isEditing = editingTask?.areaKey === activeTab && editingTask?.sectionIdx === sectionIdx && editingTask?.taskIdx === taskIdx;
              if (isEditing) {
                return (
                  <EditForm
                    key={task.id}
                    form={editForm}
                    onChange={setEditForm}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                );
              }
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={!!checked[task.id]}
                  onToggle={() => toggle(task.id)}
                  editMode={editMode}
                  onEdit={() => startEdit(activeTab, sectionIdx, taskIdx)}
                  onDelete={() => deleteTask(activeTab, sectionIdx, taskIdx)}
                  onMoveUp={() => moveTask(activeTab, sectionIdx, taskIdx, -1)}
                  onMoveDown={() => moveTask(activeTab, sectionIdx, taskIdx, 1)}
                  isFirst={taskIdx === 0}
                  isLast={taskIdx === section.tasks.length - 1}
                />
              );
            })}

            {/* Adicionar tarefa (modo edição) */}
            {editMode && (
              <button
                onClick={() => addTask(activeTab, sectionIdx)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  width: "100%", background: "none",
                  border: "1px dashed #1e2130", borderRadius: 8,
                  color: "#374151", padding: "8px 12px", cursor: "pointer",
                  fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif",
                  transition: "all 0.15s ease", marginTop: 4,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.color = "#6b7280"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2130"; e.currentTarget.style.color = "#374151"; }}
              >
                + Adicionar tarefa
              </button>
            )}
          </div>
        ))}

        {/* Adicionar seção (modo edição) */}
        {editMode && (
          <button
            onClick={() => addSection(activeTab)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              width: "100%", background: "none",
              border: "1px dashed #2d3748", borderRadius: 8,
              color: "#4b5563", padding: "10px 16px", cursor: "pointer",
              fontSize: 13, fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.15s ease", marginBottom: 20,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#4b6a9b"; e.currentTarget.style.color = "#93c5fd"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2d3748"; e.currentTarget.style.color = "#4b5563"; }}
          >
            + Adicionar seção
          </button>
        )}

        {/* Botões de rodapé */}
        <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={async () => {
              const next = {};
              setChecked(next);
              try { localStorage.setItem("tasks-checked", JSON.stringify(next)); } catch {}
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
            ↺ Reiniciar todos os checks
          </button>
          <button
            onClick={async () => {
              if (window.confirm("Resetar todas as tarefas para o padrão original? Isso apagará todas as edições.")) {
                await resetToDefault();
              }
            }}
            style={{
              background: "none", border: "1px solid #1e2130", color: "#4b5563",
              padding: "8px 20px", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7f1d1d"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2130"; e.currentTarget.style.color = "#4b5563"; }}
          >
            ⚠ Restaurar padrão
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
