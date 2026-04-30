import { useState } from "react";

// ─── INITIAL DATA ────────────────────────────────────────────────────────────

const initialDays = [
  {
    day: "Segunda", emoji: "💪", total: "~1770 kcal",
    meals: {
      cafe:   { title: "Pós-treino",    kcal: "~620 kcal", items: ["Tapioca 60g + 2 ovos mexidos + 1 col. requeijão", "Tapioca 30g + banana nanica", "Suco verde 200ml"] },
      almoco: { title: "Almoço",        kcal: "~550 kcal", items: ["Frango grelhado 180g", "Arroz integral 4 col. sopa", "Abóbora cozida 4 col.", "Rúcula + tomate à vontade", "Fio de azeite"] },
      lanche: { title: "Lanche",        kcal: "~180 kcal", items: ["Iogurte natural 1 pote (170g)", "Maçã 1 unidade"] },
      jantar: { title: "Jantar",        kcal: "~420 kcal", items: ["Carne grelhada 150g", "Mandioca cozida 100g", "Couve refogada no alho", "Tomate 1 unidade"] },
    },
  },
  {
    day: "Terça", emoji: "🏃", total: "~1370 kcal",
    meals: {
      cafe:   { title: "Café da Manhã", kcal: "~380 kcal", items: ["Aveia 50g com água ou leite", "Banana nanica 1 unidade", "Iogurte natural 1 pote"] },
      almoco: { title: "Almoço",        kcal: "~480 kcal", items: ["Atum em água 1 lata (170g)", "Arroz integral 4 col. sopa", "Brócolis cozido 1 xícara", "Cenoura cozida 1 unidade", "Azeite + limão"] },
      lanche: { title: "Lanche",        kcal: "~170 kcal", items: ["Kiwi 2 unidades", "Cottage 100g"] },
      jantar: { title: "Jantar",        kcal: "~340 kcal", items: ["Frango cozido 180g", "Abobrinha refogada", "Rúcula + pepino + tomate"] },
    },
  },
  {
    day: "Quarta", emoji: "🔥", total: "~1510 kcal",
    meals: {
      cafe:   { title: "Pós-treino",    kcal: "~480 kcal", items: ["Tapioca 60g + 2 ovos + 1 col. requeijão", "Kiwi 2 unidades", "Água de coco 200ml"] },
      almoco: { title: "Almoço",        kcal: "~490 kcal", items: ["Frango grelhado 180g", "Inhame cozido 150g", "Alface + tomate + pepino", "Azeite + limão"] },
      lanche: { title: "Lanche",        kcal: "~160 kcal", items: ["Iogurte natural 1 pote", "Morango 1 xícara"] },
      jantar: { title: "Jantar",        kcal: "~380 kcal", items: ["Carne moída magra 150g", "Couve refogada", "Cenoura cozida", "Tomate 1 unidade"] },
    },
  },
  {
    day: "Quinta", emoji: "🥗", total: "~1400 kcal",
    meals: {
      cafe:   { title: "Café da Manhã", kcal: "~340 kcal", items: ["Pão integral 2 fatias", "2 ovos mexidos", "Tomate 1 unidade fatiado"] },
      almoco: { title: "Almoço",        kcal: "~480 kcal", items: ["Atum em água 1 lata", "Arroz integral 4 col. sopa", "Brócolis + abobrinha refogada", "Azeite + alho"] },
      lanche: { title: "Lanche",        kcal: "~150 kcal", items: ["Maçã 1 unidade", "Ricota ou cottage 80g"] },
      jantar: { title: "Jantar",        kcal: "~430 kcal", items: ["Frango grelhado 180g", "Mandioca cozida 100g", "Rúcula + pepino", "Azeite + limão"] },
    },
  },
  {
    day: "Sexta", emoji: "⚡", total: "~1520 kcal",
    meals: {
      cafe:   { title: "Pós-treino",    kcal: "~420 kcal", items: ["Aveia 50g", "Banana nanica 1 unidade", "Kiwi 1 unidade", "Iogurte natural 1 pote"] },
      almoco: { title: "Almoço",        kcal: "~520 kcal", items: ["Frango grelhado 180g", "Arroz integral 4 col. sopa", "Abóbora cozida", "Couve refogada no alho"] },
      lanche: { title: "Lanche",        kcal: "~160 kcal", items: ["Laranja 1 unidade", "Iogurte natural 1 pote"] },
      jantar: { title: "Jantar",        kcal: "~420 kcal", items: ["Carne grelhada 150g", "Inhame cozido 150g", "Tomate + alface + cenoura"] },
    },
  },
  {
    day: "Sábado", emoji: "🍝", total: "~1860 kcal",
    meals: {
      cafe:   { title: "Café da Manhã",     kcal: "~520 kcal", items: ["Tapioca 2x (60g + 30g)", "2 ovos + cottage 50g", "Morango ou uva 1 xícara"] },
      almoco: { title: "Almoço",            kcal: "~580 kcal", items: ["Frango 200g (pode assar com temperos)", "Arroz integral 4 col. sopa", "Brócolis + cenoura + salada à vontade"] },
      lanche: { title: "Lanche",            kcal: "~180 kcal", items: ["Uva 1 xícara", "Iogurte natural 1 pote"] },
      jantar: { title: "Jantar Flexível 🎉", kcal: "~580 kcal", items: ["Macarrão integral 80g (cru)", "Carne moída 150g no molho", "Tomate + abobrinha no molho", "Azeite + alho + cebola"] },
    },
  },
  {
    day: "Domingo", emoji: "🌿", total: "~1570 kcal",
    meals: {
      cafe:   { title: "Café da Manhã", kcal: "~440 kcal", items: ["3 ovos mexidos", "Pão integral 2 fatias", "Manga ½ unidade média"] },
      almoco: { title: "Almoço",        kcal: "~580 kcal", items: ["Frango ou carne assada 200g", "Arroz integral 4 col. sopa", "Legumes variados assados (abobrinha, cenoura, abóbora)", "Salada verde"] },
      lanche: { title: "Lanche",        kcal: "~170 kcal", items: ["Kiwi 2 unidades", "Iogurte natural 1 pote"] },
      jantar: { title: "Jantar Leve",   kcal: "~380 kcal", items: ["Tapioca 60g + atum + tomate", "Rúcula à vontade", "Requeijão 1 col."] },
    },
  },
];

const initialShopping = [
  { cat: "🥩 Proteínas",         color: "#ff6b6b", items: [{ name: "Peito de frango (filé)", qty: "1,5 kg" }, { name: "Carne moída 90% magra", qty: "500g" }, { name: "Ovos", qty: "30 unidades" }, { name: "Atum em água (lata)", qty: "4 latas" }, { name: "Iogurte natural", qty: "6 potes" }, { name: "Cottage ou ricota", qty: "300g" }] },
  { cat: "🥦 Vegetais e Legumes", color: "#51cf66", items: [{ name: "Brócolis", qty: "1 cabeça grande" }, { name: "Abobrinha", qty: "3 unidades" }, { name: "Cenoura", qty: "500g" }, { name: "Pepino", qty: "3 unidades" }, { name: "Alface", qty: "1 pé" }, { name: "Cebola", qty: "1kg" }, { name: "Alho", qty: "1 cabeça" }] },
  { cat: "🍌 Frutas",             color: "#ffd43b", items: [{ name: "Banana", qty: "1 cacho" }, { name: "Maçã", qty: "6 unidades" }, { name: "Kiwi", qty: "8 unidades" }, { name: "Laranja", qty: "6 unidades" }, { name: "Morango", qty: "1 caixinha" }] },
  { cat: "🍚 Carboidratos",       color: "#74c0fc", items: [{ name: "Goma de tapioca", qty: "500g" }, { name: "Arroz integral", qty: "1kg" }, { name: "Mandioca", qty: "500g" }, { name: "Inhame", qty: "4 unidades médias" }, { name: "Aveia em flocos", qty: "500g" }, { name: "Macarrão integral", qty: "500g" }] },
  { cat: "🫒 Extras e Temperos",  color: "#da77f2", items: [{ name: "Azeite extra virgem", qty: "1 frasco" }, { name: "Limão", qty: "6 unidades" }, { name: "Água de coco (caixinha)", qty: "6 unidades" }, { name: "Cúrcuma", qty: "1 unidade" }, { name: "Pimenta preta", qty: "1 unidade" }, { name: "Chá verde (sachês)", qty: "1 caixa" }] },
];

// intensity: "intense" | "moderate" | "light" | "rest"
const initialTraining = [
  {
    day: "Segunda", emoji: "💪", intensity: "intense",
    cardio: { type: "Corrida + Caminhada", detail: "Correr 2km + caminhar 5km | inclui subidas" },
    functional: [
      { name: "Agachamento livre", sets: "3x12", rest: "60s", tip: "Joelhos alinhados com os pés" },
      { name: "Flexão de braço (adaptada)", sets: "3x8", rest: "60s", tip: "Pode fazer com joelhos no chão" },
      { name: "Prancha abdominal", sets: "3x20s", rest: "45s", tip: "Quadril neutro, não deixe cair" },
      { name: "Avanço alternado", sets: "2x10 cada", rest: "60s", tip: "Passada longa, tronco reto" },
    ],
    kcalEst: "~700 kcal",
  },
  {
    day: "Terça", emoji: "🚶", intensity: "moderate",
    cardio: { type: "Caminhada moderada", detail: "5–6km em ritmo firme, terreno plano" },
    functional: [
      { name: "Elevação de panturrilha", sets: "3x15", rest: "45s", tip: "Segure 1s no topo do movimento" },
      { name: "Ponte de glúteo", sets: "3x15", rest: "45s", tip: "Aperte o glúteo no topo" },
      { name: "Rotação de tronco", sets: "2x10 cada lado", rest: "30s", tip: "Movimento lento e controlado" },
    ],
    kcalEst: "~450 kcal",
  },
  {
    day: "Quarta", emoji: "🔥", intensity: "intense",
    cardio: { type: "Corrida intervalada + Caminhada", detail: "Alternar 1min corrida / 2min caminhada por 30min" },
    functional: [
      { name: "Agachamento sumô", sets: "3x12", rest: "60s", tip: "Pés abertos, pontas para fora" },
      { name: "Flexão diamante", sets: "2x8", rest: "60s", tip: "Mãos próximas, foca no tríceps" },
      { name: "Mountain climber", sets: "3x20s", rest: "45s", tip: "Core contraído o tempo todo" },
      { name: "Elevação lateral de perna", sets: "3x12 cada", rest: "45s", tip: "Movimento lento na descida" },
    ],
    kcalEst: "~680 kcal",
  },
  {
    day: "Quinta", emoji: "🟢", intensity: "light",
    cardio: { type: "Caminhada leve", detail: "30–40min em ritmo confortável" },
    functional: [
      { name: "Alongamento de isquiotibial", sets: "3x30s", rest: "15s", tip: "Sem forçar, respire fundo" },
      { name: "Alongamento de quadril", sets: "3x30s cada", rest: "15s", tip: "Posição de pombo no chão" },
      { name: "Mobilidade de tornozelo", sets: "2x10 círculos", rest: "15s", tip: "Rotação completa" },
      { name: "Respiração diafragmática", sets: "5 min", rest: "—", tip: "Inspira pelo nariz 4s, expira 6s" },
    ],
    kcalEst: "~280 kcal",
  },
  {
    day: "Sexta", emoji: "⚡", intensity: "intense",
    cardio: { type: "Corrida + Caminhada com subida", detail: "Correr 2,5km + caminhar 4km | busque terreno com inclinação" },
    functional: [
      { name: "Burpee adaptado (sem salto)", sets: "3x8", rest: "75s", tip: "Vai ao chão devagar, levanta rápido" },
      { name: "Agachamento com pausa", sets: "3x10", rest: "60s", tip: "2s parado no ponto mais baixo" },
      { name: "Prancha lateral", sets: "3x15s cada", rest: "45s", tip: "Quadril no alinhamento do corpo" },
      { name: "Step up (degrau ou meio-fio)", sets: "3x10 cada", rest: "60s", tip: "Sobe com força, desce controlado" },
    ],
    kcalEst: "~720 kcal",
  },
  {
    day: "Sábado", emoji: "🌅", intensity: "moderate",
    cardio: { type: "Caminhada longa", detail: "7–8km em ritmo confortável, pode ser trilha ou parque" },
    functional: [
      { name: "Flexão de braço normal", sets: "3x10", rest: "60s", tip: "Progredir 1 rep por semana" },
      { name: "Agachamento + extensão de braço", sets: "3x12", rest: "60s", tip: "Braços esticam quando sobe" },
      { name: "Abdominal bicicleta", sets: "3x15 cada lado", rest: "45s", tip: "Cotovelo toca joelho oposto" },
    ],
    kcalEst: "~520 kcal",
  },
  {
    day: "Domingo", emoji: "☀️", intensity: "light",
    cardio: { type: "Recuperação ativa", detail: "Caminhada leve 20–25min ou descanso total" },
    functional: [
      { name: "Alongamento global", sets: "10 min", rest: "—", tip: "Foco nos grupos mais trabalhados na semana" },
      { name: "Rolamento de espuma (se tiver)", sets: "5 min", rest: "—", tip: "Ísquio, panturrilha e dorsal" },
    ],
    kcalEst: "~180 kcal",
  },
];

const intensityConfig = {
  intense:  { label: "Intenso",    color: "#ff6b6b", bg: "rgba(255,107,107,0.12)", dot: "🔴" },
  moderate: { label: "Moderado",   color: "#ffd43b", bg: "rgba(255,212,59,0.10)",  dot: "🟡" },
  light:    { label: "Leve",       color: "#51cf66", bg: "rgba(81,207,102,0.10)",  dot: "🟢" },
  rest:     { label: "Descanso",   color: "#74c0fc", bg: "rgba(116,192,252,0.10)", dot: "🔵" },
};

const mealKeys   = ["cafe", "almoco", "lanche", "jantar"];
const mealColors = { cafe: "#ffd43b", almoco: "#51cf66", lanche: "#74c0fc", jantar: "#da77f2" };

// ─── SHARED UI ────────────────────────────────────────────────────────────────

const Btn = ({ onClick, color = "#52b788", bg = "transparent", children, style = {} }) => (
  <button onClick={onClick} style={{
    background: bg, color, border: `1px solid ${color}66`, borderRadius: 8,
    padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, ...style,
  }}>{children}</button>
);

const IconBtn = ({ onClick, title, children, danger, small }) => (
  <button onClick={onClick} title={title} style={{
    background: "transparent", border: "none", cursor: "pointer",
    color: danger ? "#ff6b6b" : "#6b9080", fontSize: small ? 13 : 15,
    padding: "2px 4px", lineHeight: 1, borderRadius: 5, flexShrink: 0,
  }}>{children}</button>
);

const Input = ({ value, onChange, onKeyDown, placeholder, style = {} }) => (
  <input value={value} onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown}
    placeholder={placeholder} style={{
      background: "rgba(255,255,255,0.08)", border: "1px solid #52b78866",
      borderRadius: 8, color: "#e8f5e9", padding: "7px 10px", fontSize: 13,
      fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", ...style,
    }} />
);

const Label = ({ children }) => (
  <div style={{ fontSize: 11, color: "#95d5b2", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{children}</div>
);

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200,
      display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#152315", border: "1px solid #52b788", borderRadius: "16px 16px 0 0",
        padding: 20, width: "100%", maxWidth: 500, maxHeight: "85vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: "bold", fontSize: 15, color: "#b7e4c7" }}>{title}</div>
          <IconBtn onClick={onClose}>✕</IconBtn>
        </div>
        {children}
      </div>
    </div>
  );
}

const ModalActions = ({ onClose, onConfirm, confirmLabel = "Salvar" }) => (
  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
    <Btn onClick={onClose} color="#6b9080" style={{ flex: 1 }}>Cancelar</Btn>
    <Btn onClick={onConfirm} bg="#52b788" color="#0f1923" style={{ flex: 1, border: "none" }}>{confirmLabel}</Btn>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab,       setTab]       = useState("treino");
  const [activeDay, setActiveDay] = useState(0);
  const [planDays,  setPlanDays]  = useState(initialDays);
  const [shopList,  setShopList]  = useState(initialShopping);
  const [training,  setTraining]  = useState(initialTraining);
  const [checked,   setChecked]   = useState({});
  const [modal,     setModal]     = useState(null);
  const closeModal = () => setModal(null);
  const onEnter = fn => e => { if (e.key === "Enter") fn(); };

  // ── meal helpers ────────────────────────────────────────────────────────
  const updMealItems = (di, mk, items) =>
    setPlanDays(p => p.map((d, i) => i !== di ? d : { ...d, meals: { ...d.meals, [mk]: { ...d.meals[mk], items } } }));
  const updMealMeta = (di, mk, title, kcal) =>
    setPlanDays(p => p.map((d, i) => i !== di ? d : { ...d, meals: { ...d.meals, [mk]: { ...d.meals[mk], title, kcal } } }));

  // ── shopping helpers ────────────────────────────────────────────────────
  const updShopItems = (ci, items) =>
    setShopList(p => p.map((c, i) => i !== ci ? c : { ...c, items }));

  // ── training helpers ────────────────────────────────────────────────────
  const updExercises = (di, exs) =>
    setTraining(p => p.map((d, i) => i !== di ? d : { ...d, functional: exs }));
  const updCardio = (di, cardio) =>
    setTraining(p => p.map((d, i) => i !== di ? d : { ...d, cardio }));
  const updTrainMeta = (di, field, val) =>
    setTraining(p => p.map((d, i) => i !== di ? d : { ...d, [field]: val }));

  // ── shopping check ──────────────────────────────────────────────────────
  const toggleCheck = (cat, name) => {
    const k = `${cat}-${name}`;
    setChecked(p => ({ ...p, [k]: !p[k] }));
  };
  const totalItems   = shopList.reduce((a, c) => a + c.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;

  // ─── CONFIRM HANDLERS ──────────────────────────────────────────────────
  const confirms = {
    editMealItem: () => {
      const { di, mk, idx, d1 } = modal; if (!d1.trim()) return;
      const its = [...planDays[di].meals[mk].items]; its[idx] = d1.trim();
      updMealItems(di, mk, its); closeModal();
    },
    addMealItem: () => {
      const { di, mk, d1 } = modal; if (!d1.trim()) return;
      updMealItems(di, mk, [...planDays[di].meals[mk].items, d1.trim()]); closeModal();
    },
    editMealMeta: () => {
      const { di, mk, d1, d2 } = modal;
      updMealMeta(di, mk, d1, d2); closeModal();
    },
    editShopItem: () => {
      const { ci, idx, d1, d2 } = modal; if (!d1.trim()) return;
      const its = [...shopList[ci].items]; its[idx] = { name: d1.trim(), qty: d2.trim() };
      updShopItems(ci, its); closeModal();
    },
    addShopItem: () => {
      const { ci, d1, d2 } = modal; if (!d1.trim()) return;
      updShopItems(ci, [...shopList[ci].items, { name: d1.trim(), qty: d2.trim() }]); closeModal();
    },
    addShopCat: () => {
      const { d1 } = modal; if (!d1.trim()) return;
      const cols = ["#ff6b6b","#51cf66","#ffd43b","#74c0fc","#da77f2","#ff922b"];
      setShopList(p => [...p, { cat: d1.trim(), color: cols[p.length % cols.length], items: [] }]); closeModal();
    },
    editExercise: () => {
      const { di, idx, d1, d2, d3, d4 } = modal; if (!d1.trim()) return;
      const exs = [...training[di].functional];
      exs[idx] = { name: d1.trim(), sets: d2.trim(), rest: d3.trim(), tip: d4.trim() };
      updExercises(di, exs); closeModal();
    },
    addExercise: () => {
      const { di, d1, d2, d3, d4 } = modal; if (!d1.trim()) return;
      updExercises(di, [...training[di].functional, { name: d1.trim(), sets: d2.trim(), rest: d3.trim(), tip: d4.trim() }]); closeModal();
    },
    editCardio: () => {
      const { di, d1, d2 } = modal;
      updCardio(di, { type: d1.trim(), detail: d2.trim() }); closeModal();
    },
    editTrainMeta: () => {
      const { di, d1, d2, d3 } = modal;
      setTraining(p => p.map((d, i) => i !== di ? d : { ...d, intensity: d1, kcalEst: d2.trim(), emoji: d3.trim() }));
      closeModal();
    },
  };

  // ─── DAY SELECTOR (shared) ────────────────────────────────────────────
  const DayBar = ({ source }) => (
    <div style={{ display: "flex", overflowX: "auto", gap: 8, padding: "10px 14px", borderBottom: "1px solid #2d6a4f" }}>
      {source.map((d, i) => {
        const ic = tab === "treino" ? intensityConfig[d.intensity] : null;
        return (
          <button key={i} onClick={() => setActiveDay(i)} style={{
            flexShrink: 0, padding: "7px 12px", borderRadius: 12, textAlign: "center", lineHeight: 1.4,
            border: activeDay === i ? `2px solid ${ic ? ic.color : "#52b788"}` : "2px solid transparent",
            background: activeDay === i ? "#1b4332" : "rgba(255,255,255,0.05)",
            color: activeDay === i ? "#b7e4c7" : "#6b9080",
            cursor: "pointer", fontFamily: "inherit", fontSize: 12,
            fontWeight: activeDay === i ? "bold" : "normal",
          }}>
            <div style={{ fontSize: 16 }}>{d.emoji}</div>
            <div>{d.day}</div>
            {ic && <div style={{ fontSize: 9, color: ic.color, marginTop: 2 }}>{ic.dot}</div>}
          </button>
        );
      })}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "linear-gradient(135deg,#0f1923 0%,#1a2e1a 50%,#0f1923 100%)", minHeight: "100vh", color: "#e8f5e9" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(90deg,#1b4332,#2d6a4f)", padding: "20px 16px 14px", borderBottom: "2px solid #52b788", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: "bold", color: "#b7e4c7" }}>🌿 Plano Semanal</div>
        <div style={{ fontSize: 11, color: "#95d5b2", marginTop: 2, fontStyle: "italic" }}>28 anos · 110kg · 1,75m · Semana 2</div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
          {[["treino","🏋️ Treinos"],["plano","📅 Cardápio"],["lista","🛒 Compras"]].map(([k,l]) => (
            <button key={k} onClick={() => { setTab(k); setActiveDay(0); }} style={{
              padding: "6px 14px", borderRadius: 18, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, fontWeight: "bold",
              background: tab === k ? "#52b788" : "rgba(255,255,255,0.1)",
              color: tab === k ? "#0f1923" : "#b7e4c7",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ════════════ TREINO TAB ════════════ */}
      {tab === "treino" && (
        <div>
          <DayBar source={training} />

          {(() => {
            const t  = training[activeDay];
            const ic = intensityConfig[t.intensity];
            return (
              <div style={{ padding: 14 }}>

                {/* Day header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 19, fontWeight: "bold", color: "#b7e4c7" }}>{t.emoji} {t.day}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 4, background: ic.bg, border: `1px solid ${ic.color}44`, borderRadius: 20, padding: "3px 10px" }}>
                      <span style={{ fontSize: 10 }}>{ic.dot}</span>
                      <span style={{ fontSize: 11, color: ic.color, fontWeight: "bold" }}>{ic.label}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ background: "#1b4332", border: "1px solid #52b788", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#95d5b2" }}>
                      🔥 {t.kcalEst}
                    </div>
                    <IconBtn title="Editar dia" small onClick={() => setModal({ type: "editTrainMeta", di: activeDay, d1: t.intensity, d2: t.kcalEst, d3: t.emoji })}>
                      ✏️ <span style={{ fontSize: 10 }}>editar dia</span>
                    </IconBtn>
                  </div>
                </div>

                {/* Cardio block */}
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #52b78844", borderLeft: "4px solid #52b788", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontWeight: "bold", fontSize: 13, color: "#52b788" }}>🏃 Cardio</div>
                    <IconBtn title="Editar cardio" onClick={() => setModal({ type: "editCardio", di: activeDay, d1: t.cardio.type, d2: t.cardio.detail })}>✏️</IconBtn>
                  </div>
                  <div style={{ fontSize: 14, color: "#b7e4c7", marginBottom: 4 }}>{t.cardio.type}</div>
                  <div style={{ fontSize: 12, color: "#6b9080" }}>{t.cardio.detail}</div>
                </div>

                {/* Functional block */}
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #da77f244", borderLeft: "4px solid #da77f2", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontWeight: "bold", fontSize: 13, color: "#da77f2", marginBottom: 10 }}>⚙️ Funcional</div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {t.functional.map((ex, idx) => (
                      <div key={idx} style={{ background: "rgba(218,119,242,0.06)", borderRadius: 10, padding: "10px 12px", border: "1px solid #da77f222" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: "bold", color: "#e8f5e9" }}>{ex.name}</div>
                            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                              <span style={{ fontSize: 11, color: "#da77f2", background: "rgba(218,119,242,0.15)", borderRadius: 6, padding: "2px 7px" }}>{ex.sets}</span>
                              <span style={{ fontSize: 11, color: "#74c0fc", background: "rgba(116,192,252,0.15)", borderRadius: 6, padding: "2px 7px" }}>⏱ {ex.rest}</span>
                            </div>
                            {ex.tip && <div style={{ fontSize: 11, color: "#6b9080", marginTop: 5 }}>💡 {ex.tip}</div>}
                          </div>
                          <div style={{ display: "flex", flexShrink: 0 }}>
                            <IconBtn title="Editar" small onClick={() => setModal({ type: "editExercise", di: activeDay, idx, d1: ex.name, d2: ex.sets, d3: ex.rest, d4: ex.tip || "" })}>✏️</IconBtn>
                            <IconBtn title="Excluir" danger small onClick={() => updExercises(activeDay, t.functional.filter((_, i) => i !== idx))}>🗑</IconBtn>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <Btn color="#da77f2" onClick={() => setModal({ type: "addExercise", di: activeDay, d1: "", d2: "", d3: "", d4: "" })}>
                      + Adicionar exercício
                    </Btn>
                  </div>
                </div>

                {/* Hydration */}
                <div style={{ marginTop: 12, background: "rgba(116,192,252,0.08)", border: "1px solid #74c0fc33", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "#a5d8ff" }}>
                  💧 Mínimo <strong>3 litros de água</strong> — especialmente nos dias intensos
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ════════════ CARDÁPIO TAB ════════════ */}
      {tab === "plano" && (
        <div>
          <DayBar source={planDays} />
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 19, fontWeight: "bold", color: "#b7e4c7" }}>
                {planDays[activeDay].emoji} {planDays[activeDay].day}
              </div>
              <div style={{ background: "#1b4332", border: "1px solid #52b788", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "#95d5b2" }}>
                {planDays[activeDay].total}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mealKeys.map(mk => {
                const meal  = planDays[activeDay].meals[mk];
                const color = mealColors[mk];
                return (
                  <div key={mk} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ fontWeight: "bold", fontSize: 13, color }}>{meal.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 11, color: "#6b9080" }}>{meal.kcal}</span>
                        <IconBtn title="Editar refeição" small onClick={() => setModal({ type: "editMealMeta", di: activeDay, mk, d1: meal.title, d2: meal.kcal })}>✏️</IconBtn>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {meal.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 13, color: "#c8e6c9" }}>
                          <span style={{ color, marginTop: 3, flexShrink: 0 }}>•</span>
                          <span style={{ flex: 1, lineHeight: 1.5 }}>{item}</span>
                          <div style={{ display: "flex", flexShrink: 0 }}>
                            <IconBtn small title="Editar" onClick={() => setModal({ type: "editMealItem", di: activeDay, mk, idx, d1: item })}>✏️</IconBtn>
                            <IconBtn small title="Excluir" danger onClick={() => updMealItems(activeDay, mk, meal.items.filter((_, i) => i !== idx))}>🗑</IconBtn>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <Btn color={color} onClick={() => setModal({ type: "addMealItem", di: activeDay, mk, d1: "" })}>+ Adicionar item</Btn>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ margin: "12px 0 16px", background: "rgba(116,192,252,0.08)", border: "1px solid #74c0fc33", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#a5d8ff" }}>
              💧 Mínimo <strong>3 litros de água</strong> hoje
            </div>
          </div>
        </div>
      )}

      {/* ════════════ COMPRAS TAB ════════════ */}
      {tab === "lista" && (
        <div style={{ padding: 14 }}>
          <div style={{ background: "#1b4332", border: "1px solid #52b788", borderRadius: 12, padding: "12px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "#95d5b2" }}>Itens marcados</div>
              <div style={{ fontSize: 20, fontWeight: "bold", color: "#b7e4c7" }}>{totalChecked} / {totalItems}</div>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: "50%", border: "3px solid #52b788", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: "bold", color: "#52b788" }}>
              {totalItems ? Math.round((totalChecked / totalItems) * 100) : 0}%
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {shopList.map((cat, ci) => (
              <div key={ci} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${cat.color}33`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: `${cat.color}22`, padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${cat.color}33` }}>
                  <div style={{ fontWeight: "bold", fontSize: 13, color: cat.color }}>{cat.cat}</div>
                  <IconBtn title="Excluir categoria" danger small onClick={() => setShopList(p => p.filter((_, i) => i !== ci))}>🗑</IconBtn>
                </div>
                <div>
                  {cat.items.map((item, ii) => {
                    const ck = `${cat.cat}-${item.name}`;
                    const done = !!checked[ck];
                    return (
                      <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", opacity: done ? 0.4 : 1 }}>
                        <div onClick={() => toggleCheck(cat.cat, item.name)} style={{ width: 19, height: 19, borderRadius: 5, border: `2px solid ${done ? cat.color : "#2d6a4f"}`, background: done ? cat.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
                          {done && <span style={{ color: "#0f1923", fontSize: 10, fontWeight: "bold" }}>✓</span>}
                        </div>
                        <div style={{ flex: 1, fontSize: 13, color: "#c8e6c9", textDecoration: done ? "line-through" : "none" }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: "#6b9080", flexShrink: 0 }}>{item.qty}</div>
                        <div style={{ display: "flex", flexShrink: 0 }}>
                          <IconBtn small title="Editar" onClick={() => setModal({ type: "editShopItem", ci, idx: ii, d1: item.name, d2: item.qty })}>✏️</IconBtn>
                          <IconBtn small title="Excluir" danger onClick={() => { updShopItems(ci, cat.items.filter((_, i) => i !== ii)); }}>🗑</IconBtn>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ padding: "8px 14px 12px" }}>
                  <Btn color={cat.color} onClick={() => setModal({ type: "addShopItem", ci, d1: "", d2: "" })}>+ Adicionar item</Btn>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button onClick={() => setModal({ type: "addShopCat", d1: "" })} style={{ width: "100%", padding: 12, borderRadius: 12, border: "2px dashed #2d6a4f", background: "transparent", color: "#52b788", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: "bold" }}>
              + Nova Categoria
            </button>
          </div>

          <div style={{ marginTop: 12, background: "rgba(255,212,59,0.08)", border: "1px solid #ffd43b44", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "#ffd43b", lineHeight: 1.6 }}>
            💡 <strong>Dica:</strong> Porcione e congele frango e carne em sacos de 150–180g assim que chegar em casa.
          </div>
        </div>
      )}

      {/* ════════════ MODALS ════════════ */}

      {modal?.type === "editTrainMeta" && (
        <Modal title="Editar dia de treino" onClose={closeModal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Label>Emoji do dia</Label><Input value={modal.d3} onChange={v => setModal(m => ({ ...m, d3: v }))} placeholder="Ex: 💪" /></div>
            <div>
              <Label>Intensidade</Label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.entries(intensityConfig).map(([k, v]) => (
                  <button key={k} onClick={() => setModal(m => ({ ...m, d1: k }))} style={{
                    padding: "6px 12px", borderRadius: 8, border: `1px solid ${modal.d1 === k ? v.color : "#2d6a4f"}`,
                    background: modal.d1 === k ? `${v.color}22` : "transparent",
                    color: modal.d1 === k ? v.color : "#6b9080", cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                  }}>{v.dot} {v.label}</button>
                ))}
              </div>
            </div>
            <div><Label>Calorias estimadas</Label><Input value={modal.d2} onChange={v => setModal(m => ({ ...m, d2: v }))} placeholder="Ex: ~650 kcal" /></div>
          </div>
          <ModalActions onClose={closeModal} onConfirm={confirms.editTrainMeta} />
        </Modal>
      )}

      {modal?.type === "editCardio" && (
        <Modal title="Editar cardio" onClose={closeModal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Label>Tipo</Label><Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: Corrida + Caminhada" /></div>
            <div><Label>Detalhe</Label><Input value={modal.d2} onChange={v => setModal(m => ({ ...m, d2: v }))} placeholder="Ex: Correr 2km + caminhar 5km" onKeyDown={onEnter(confirms.editCardio)} /></div>
          </div>
          <ModalActions onClose={closeModal} onConfirm={confirms.editCardio} />
        </Modal>
      )}

      {(modal?.type === "editExercise" || modal?.type === "addExercise") && (
        <Modal title={modal.type === "addExercise" ? "Novo exercício" : "Editar exercício"} onClose={closeModal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Label>Nome do exercício</Label><Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: Agachamento livre" /></div>
            <div><Label>Séries / Repetições</Label><Input value={modal.d2} onChange={v => setModal(m => ({ ...m, d2: v }))} placeholder="Ex: 3x12" /></div>
            <div><Label>Descanso</Label><Input value={modal.d3} onChange={v => setModal(m => ({ ...m, d3: v }))} placeholder="Ex: 60s" /></div>
            <div><Label>Dica (opcional)</Label><Input value={modal.d4} onChange={v => setModal(m => ({ ...m, d4: v }))} placeholder="Ex: Joelhos alinhados" onKeyDown={onEnter(confirms[modal.type])} /></div>
          </div>
          <ModalActions onClose={closeModal} onConfirm={confirms[modal.type]} confirmLabel={modal.type === "addExercise" ? "Adicionar" : "Salvar"} />
        </Modal>
      )}

      {modal?.type === "editMealItem" && (
        <Modal title="Editar item" onClose={closeModal}>
          <Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Descrição do item" onKeyDown={onEnter(confirms.editMealItem)} />
          <ModalActions onClose={closeModal} onConfirm={confirms.editMealItem} />
        </Modal>
      )}

      {modal?.type === "addMealItem" && (
        <Modal title="Novo item" onClose={closeModal}>
          <Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: Frango grelhado 150g" onKeyDown={onEnter(confirms.addMealItem)} />
          <ModalActions onClose={closeModal} onConfirm={confirms.addMealItem} confirmLabel="Adicionar" />
        </Modal>
      )}

      {modal?.type === "editMealMeta" && (
        <Modal title="Editar refeição" onClose={closeModal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Label>Nome da refeição</Label><Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: Almoço" /></div>
            <div><Label>Calorias estimadas</Label><Input value={modal.d2} onChange={v => setModal(m => ({ ...m, d2: v }))} placeholder="Ex: ~500 kcal" onKeyDown={onEnter(confirms.editMealMeta)} /></div>
          </div>
          <ModalActions onClose={closeModal} onConfirm={confirms.editMealMeta} />
        </Modal>
      )}

      {modal?.type === "editShopItem" && (
        <Modal title="Editar item" onClose={closeModal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Label>Nome</Label><Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: Peito de frango" /></div>
            <div><Label>Quantidade</Label><Input value={modal.d2} onChange={v => setModal(m => ({ ...m, d2: v }))} placeholder="Ex: 500g" onKeyDown={onEnter(confirms.editShopItem)} /></div>
          </div>
          <ModalActions onClose={closeModal} onConfirm={confirms.editShopItem} />
        </Modal>
      )}

      {modal?.type === "addShopItem" && (
        <Modal title="Novo item" onClose={closeModal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><Label>Nome</Label><Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: Brócolis" /></div>
            <div><Label>Quantidade</Label><Input value={modal.d2} onChange={v => setModal(m => ({ ...m, d2: v }))} placeholder="Ex: 2 unidades" onKeyDown={onEnter(confirms.addShopItem)} /></div>
          </div>
          <ModalActions onClose={closeModal} onConfirm={confirms.addShopItem} confirmLabel="Adicionar" />
        </Modal>
      )}

      {modal?.type === "addShopCat" && (
        <Modal title="Nova categoria" onClose={closeModal}>
          <Input value={modal.d1} onChange={v => setModal(m => ({ ...m, d1: v }))} placeholder="Ex: 🥛 Laticínios" onKeyDown={onEnter(confirms.addShopCat)} />
          <ModalActions onClose={closeModal} onConfirm={confirms.addShopCat} confirmLabel="Criar" />
        </Modal>
      )}

    </div>
  );
}
