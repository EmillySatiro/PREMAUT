import { useState, useRef, CSSProperties, ReactNode } from "react";

/* ─── SVG Icons ─────────────────────────────────────────── */
const IconHeart = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F6F4F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconMenu = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F6F4F0" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconBack = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4DA1A9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DA1A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconCheck = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F6F4F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Puzzle SVG background ─────────────────────────────── */
interface PuzzlePieceProps { x: number; y: number; s: number; rot: number; op: number; color: string; }
function PuzzlePiece({ x, y, s, rot, op, color }: PuzzlePieceProps) {
  const r = s * 0.28;
  const b = s * 0.72;
  const m = s * 0.5;
  const d = `M${r},0 L${b},0 Q${s},0 ${s},${r} L${s},${b} Q${s},${s} ${b},${s} L${r},${s} Q0,${s} 0,${b} L0,${r} Q0,0 ${r},0 Z`;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot},${m},${m})`} opacity={op}>
      <path d={d} fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
    </g>
  );
}

function PuzzleBg() {
  const pieces = [
    { x: -8, y: -14, s: 72, rot: 18, op: 0.55, color: "#5DCAA5" },
    { x: 55, y: 4, s: 58, rot: -22, op: 0.48, color: "#4AACAC" },
    { x: 120, y: -10, s: 66, rot: 40, op: 0.52, color: "#6BBFBF" },
    { x: 190, y: 2, s: 62, rot: -8, op: 0.56, color: "#5BC4C4" },
    { x: 260, y: -14, s: 70, rot: 55, op: 0.48, color: "#4AACAC" },
    { x: 335, y: 0, s: 60, rot: -32, op: 0.52, color: "#5DCAA5" },
    { x: 405, y: -6, s: 68, rot: 24, op: 0.56, color: "#6BBFBF" },
    { x: 478, y: 6, s: 64, rot: -48, op: 0.48, color: "#5BC4C4" },
    { x: 548, y: -12, s: 72, rot: 33, op: 0.52, color: "#4AACAC" },
    { x: 620, y: 2, s: 62, rot: -16, op: 0.56, color: "#5DCAA5" },
    { x: 28, y: 40, s: 56, rot: -26, op: 0.38, color: "#6BBFBF" },
    { x: 98, y: 46, s: 64, rot: 44, op: 0.35, color: "#5BC4C4" },
    { x: 172, y: 32, s: 60, rot: -6, op: 0.4, color: "#5DCAA5" },
    { x: 490, y: 42, s: 58, rot: 58, op: 0.36, color: "#4AACAC" },
    { x: 568, y: 30, s: 66, rot: -38, op: 0.4, color: "#6BBFBF" },
  ];
  return (
    <svg
      viewBox="0 0 700 90"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      preserveAspectRatio="xMidYMid slice"
    >
      {pieces.map((p, i) => <PuzzlePiece key={i} {...p} />)}
    </svg>
  );
}

/* ─── Field component — label always on border line ─── */
interface FieldProps { id: string; label: string; error: boolean; focused: boolean; children: ReactNode; }
function Field({ id, label, error, focused, children }: FieldProps) {
  const borderColor = error ? "#d95555" : focused ? "#4DA1A9" : "rgba(77,161,169,0.4)";

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginTop: "12px" }}>
      {/* Label sits on the border */}
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          top: "-11px",
          left: "18px",
          background: "#F6F4F0",
          padding: "0 6px",
          fontFamily: "'Inria Serif', Georgia, serif",
          fontWeight: 700,
          fontSize: "14px",
          color: error ? "#d95555" : "#4DA1A9",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          zIndex: 1,
          userSelect: "none",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        {label}
      </label>

      {/* Border box */}
      <div style={{
        border: `1.8px solid ${borderColor}`,
        borderRadius: "10px",
        background: "transparent",
        transition: "border-color 0.2s",
      }}>
        {children}
      </div>

      {error && (
        <span role="alert" style={{
          marginTop: "5px",
          fontSize: "12px",
          color: "#d95555",
          fontFamily: "'Inria Serif', Georgia, serif",
          paddingLeft: "4px",
        }}>
          Campo obrigatório
        </span>
      )}
    </div>
  );
}

/* ─── Shared input styles ────────────────────────────────── */
function inputStyle(): CSSProperties {
  return {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "14px 18px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    fontFamily: "'Inria Serif', Georgia, serif",
    fontSize: "clamp(14px, 1.6vw, 16px)",
    color: "#2a5a5f",
  };
}

/* ─── Success screen ─────────────────────────────────────── */
interface SuccessScreenProps { titulo: string; onReset: () => void; }
function SuccessScreen({ titulo, onReset }: SuccessScreenProps) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F6F4F0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inria Serif', Georgia, serif",
    }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ textAlign: "center", padding: "48px 32px", maxWidth: "400px", animation: "fadeUp 0.4s ease" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "#4DA1A9",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 8px 28px rgba(77,161,169,0.35)",
        }}>
          <IconCheck />
        </div>
        <h2 style={{
          fontWeight: 700, fontSize: "28px", color: "#3B7E82",
          margin: "0 0 8px", letterSpacing: "-0.04em",
        }}>
          Evento cadastrado!
        </h2>
        <p style={{ color: "#7aacaf", fontSize: "16px", margin: "0 0 32px" }}>{titulo}</p>
        <button
          onClick={onReset}
          style={{
            background: "#4DA1A9", color: "#F6F4F0", border: "none",
            borderRadius: "10px", padding: "14px 36px",
            fontFamily: "'Inria Serif', Georgia, serif",
            fontWeight: 700, fontSize: "15px", letterSpacing: "0.08em",
            cursor: "pointer", boxShadow: "0 4px 16px rgba(77,161,169,0.3)",
            transition: "transform 0.1s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 22px rgba(77,161,169,0.45)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(77,161,169,0.3)"; }}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          NOVO EVENTO
        </button>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function CadastroEvento() {
  type FormKey = "titulo" | "data" | "criador" | "localizacao" | "descricao";
  type FormState = Record<FormKey, string>;
  type ErrorState = Partial<Record<FormKey, boolean>>;

  const EMPTY: FormState = { titulo: "", data: "", criador: "", localizacao: "", descricao: "" };
  const [form, setForm] = useState<FormState>(EMPTY);
  const [focused, setFocused] = useState<FormKey | null>(null);
  const [errors, setErrors] = useState<ErrorState>({});
  const dateRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);

  const set = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: false }));
  };

  const validate = () => {
  const newErrors: Partial<Record<FormKey, boolean>> = {};

  (Object.keys(form) as FormKey[]).forEach((k) => {
    if (!form[k].trim()) {
      newErrors[k] = true;
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = () => { if (validate()) setSuccess(true); };
  const handleReset = () => { setSuccess(false); setForm(EMPTY); setErrors({}); };

  if (success) return <SuccessScreen titulo={form.titulo} onReset={handleReset} />;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *{box-sizing:border-box;}
        body{margin:0;}
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:0;pointer-events:none;position:absolute;}
        textarea{resize:vertical;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F6F4F0", fontFamily: "'Inria Serif', Georgia, serif" }}>


        {/* ── Content ── */}
        <main style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "clamp(20px, 4vw, 40px) clamp(16px, 5vw, 52px) 72px",
          animation: "fadeUp 0.35s ease",
        }}>

          {/* Back */}
          <button
            aria-label="Voltar"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginBottom: "10px", display: "flex", alignItems: "center" }}
          >
            <IconBack />
          </button>

          {/* Title */}
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(26px, 5vw, 52px)",
            color: "#4DA1A9",
            margin: "0 0 clamp(24px, 4vw, 40px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}>
            Cadastro de Evento
          </h1>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 3vw, 30px)" }}>

            {/* Título */}
            <Field id="titulo" label="Título" error={errors.titulo ?? false} focused={focused === "titulo"}>
              <input
                id="titulo"
                type="text"
                value={form.titulo}
                onChange={set("titulo")}
                onFocus={() => setFocused("titulo")}
                onBlur={() => setFocused(null)}
                aria-required="true"
                aria-invalid={!!errors.titulo}
                style={inputStyle()}
              />
            </Field>

            {/* Data + Criador */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "clamp(14px, 2.5vw, 24px)",
            }}>
              <Field id="data" label="Data" error={!!errors.data} focused={focused === "data"}>
                <div style={{ position: "relative" }}>
                  <input
                    ref={dateRef}
                    id="data"
                    type="date"
                    value={form.data}
                    onChange={set("data")}
                    onFocus={() => setFocused("data")}
                    onBlur={() => setFocused(null)}
                    aria-required="true"
                    aria-invalid={!!errors.data}
                    style={{
                      ...inputStyle(),
                      paddingRight: "48px",
                      colorScheme: "light",
                    } as CSSProperties}
                  />
                  <button
                    type="button"
                    aria-label="Abrir calendário"
                    onClick={() => { dateRef.current?.showPicker(); dateRef.current?.focus(); }}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4DA1A9",
                    }}
                  >
                    <IconCalendar />
                  </button>
                </div>
              </Field>

              <Field id="criador" label="Criador do evento" error={errors.criador ?? false} focused={focused === "criador"}>
                <input
                  id="criador"
                  type="text"
                  value={form.criador}
                  onChange={set("criador")}
                  onFocus={() => setFocused("criador")}
                  onBlur={() => setFocused(null)}
                  aria-required="true"
                  aria-invalid={!!errors.criador}
                  style={inputStyle()}
                />
              </Field>
            </div>

            {/* Localização */}
            <Field id="localizacao" label="Localização" error={errors.localizacao ?? false} focused={focused === "localizacao"}>
              <input
                id="localizacao"
                type="text"
                value={form.localizacao}
                onChange={set("localizacao")}
                onFocus={() => setFocused("localizacao")}
                onBlur={() => setFocused(null)}
                aria-required="true"
                aria-invalid={!!errors.localizacao}
                style={{ ...inputStyle(), maxWidth: "100%" }}
              />
            </Field>

            {/* Descrição */}
            <Field id="descricao" label="Descrição" error={errors.descricao ?? false} focused={focused === "descricao"}>
              <textarea
                id="descricao"
                value={form.descricao}
                onChange={set("descricao")}
                onFocus={() => setFocused("descricao")}
                onBlur={() => setFocused(null)}
                rows={5}
                aria-required="true"
                aria-invalid={!!errors.descricao}
                style={{ ...inputStyle(), minHeight: "130px" }}
              />
            </Field>
          </div>

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "clamp(24px, 4vw, 40px)" }}>
            <button
              onClick={handleSubmit}
              style={{
                background: "#6D94C5",
                color: "#F6F4F0",
                border: "none",
                borderRadius: "12px",
                padding: "clamp(12px, 1.8vw, 16px) clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                fontSize: "clamp(13px, 1.6vw, 16px)",
                letterSpacing: "0.1em",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(109,148,197,0.4)",
                transition: "transform 0.1s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#5a7fb0";
                e.currentTarget.style.boxShadow = "0 8px 26px rgba(109,148,197,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#6D94C5";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(109,148,197,0.4)";
              }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              CADASTRAR
            </button>
          </div>
        </main>
      </div>
    </>
  );
}