import { useState, useRef, CSSProperties, ReactNode } from "react";

/* ─── SVG Icons ─────────────────────────────────────────── */
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

const IconTrash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

/* ─── Field component ────────────────────────────────────── */
interface FieldProps { id: string; label: string; error: boolean; focused: boolean; children: ReactNode; }
function Field({ id, label, error, focused, children }: FieldProps) {
  const borderColor = error ? "#d95555" : focused ? "#4DA1A9" : "rgba(77,161,169,0.4)";
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginTop: "12px" }}>
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
          marginTop: "5px", fontSize: "12px", color: "#d95555",
          fontFamily: "'Inria Serif', Georgia, serif", paddingLeft: "4px",
        }}>
          Campo obrigatório
        </span>
      )}
    </div>
  );
}

/* ─── Input base style ───────────────────────────────────── */
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

/* ─── Feedback screens ───────────────────────────────────── */
interface FeedbackScreenProps { titulo: string; type: "saved" | "deleted"; onBack: () => void; }
function FeedbackScreen({ titulo, type, onBack }: FeedbackScreenProps) {
  const isSaved = type === "saved";
  return (
    <div style={{
      minHeight: "100vh", background: "#F6F4F0",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inria Serif', Georgia, serif",
    }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ textAlign: "center", padding: "48px 32px", maxWidth: "400px", animation: "fadeUp 0.4s ease" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: isSaved ? "#4DA1A9" : "#d95555",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: isSaved ? "0 8px 28px rgba(77,161,169,0.35)" : "0 8px 28px rgba(217,85,85,0.3)",
        }}>
          {isSaved ? <IconCheck /> : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F6F4F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
          )}
        </div>
        <h2 style={{ fontWeight: 700, fontSize: "26px", color: isSaved ? "#3B7E82" : "#b03030", margin: "0 0 8px", letterSpacing: "-0.04em" }}>
          {isSaved ? "Alterações salvas!" : "Evento excluído!"}
        </h2>
        <p style={{ color: "#7aacaf", fontSize: "16px", margin: "0 0 32px" }}>{titulo}</p>
        <button
          onClick={onBack}
          style={{
            background: isSaved ? "#4DA1A9" : "#d95555",
            color: "#F6F4F0", border: "none", borderRadius: "10px",
            padding: "14px 36px", fontFamily: "'Inria Serif', Georgia, serif",
            fontWeight: 700, fontSize: "15px", letterSpacing: "0.08em",
            cursor: "pointer", transition: "transform 0.1s",
          }}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
}

/* ─── Delete confirmation modal ──────────────────────────── */
interface ConfirmDeleteProps { titulo: string; onConfirm: () => void; onCancel: () => void; }
function ConfirmDelete({ titulo, onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
    }}>
      <div style={{
        background: "#F6F4F0", borderRadius: "14px", padding: "32px 28px",
        maxWidth: "380px", width: "90%", textAlign: "center",
        fontFamily: "'Inria Serif', Georgia, serif",
        boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
        animation: "fadeUp 0.25s ease",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(217,85,85,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px", color: "#d95555",
        }}>
          <IconTrash />
        </div>
        <h3 style={{ fontWeight: 700, fontSize: "20px", color: "#2a5a5f", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
          Excluir evento?
        </h3>
        <p style={{ fontSize: "14px", color: "#7aacaf", margin: "0 0 24px", lineHeight: 1.5 }}>
          "<strong>{titulo}</strong>" será removido permanentemente.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "12px", border: "1.8px solid rgba(77,161,169,0.4)",
              borderRadius: "10px", background: "transparent",
              fontFamily: "'Inria Serif', Georgia, serif", fontWeight: 700,
              fontSize: "14px", color: "#4DA1A9", cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(77,161,169,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            CANCELAR
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "12px", border: "none",
              borderRadius: "10px", background: "#d95555",
              fontFamily: "'Inria Serif', Georgia, serif", fontWeight: 700,
              fontSize: "14px", color: "#F6F4F0", cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c44"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#d95555"; }}
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Props do componente principal ─────────────────────── */
interface EditarEventoProps {
  initialData?: {
    titulo?: string;
    data?: string;
    criador?: string;
    localizacao?: string;
    descricao?: string;
  };
  onSave?: (data: Record<string, string>) => void;
  onDelete?: () => void;
  onBack?: () => void;
}

/* ─── Main ───────────────────────────────────────────────── */
export default function EditarEvento({ initialData = {}, onSave, onDelete, onBack }: EditarEventoProps) {
  type FormKey = "titulo" | "data" | "criador" | "localizacao" | "descricao";
  type FormState = Record<FormKey, string>;
  type ErrorState = Partial<Record<FormKey, boolean>>;

  const EMPTY: FormState = {
    titulo: initialData.titulo ?? "",
    data: initialData.data ?? "",
    criador: initialData.criador ?? "",
    localizacao: initialData.localizacao ?? "",
    descricao: initialData.descricao ?? "",
  };

  const [form, setForm] = useState<FormState>(EMPTY);
  const [focused, setFocused] = useState<FormKey | null>(null);
  const [errors, setErrors] = useState<ErrorState>({});
  const [feedback, setFeedback] = useState<"saved" | "deleted" | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  const set = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: false }));
  };

  const validate = () => {
    const required: FormKey[] = ["titulo", "data", "criador", "localizacao", "descricao"];
    const newErrors: ErrorState = {};
    required.forEach((k) => { if (!form[k].trim()) newErrors[k] = true; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave?.(form);
    setFeedback("saved");
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(false);
    onDelete?.();
    setFeedback("deleted");
  };

  const handleBack = () => {
    setFeedback(null);
    onBack?.();
  };

  if (feedback) return <FeedbackScreen titulo={form.titulo} type={feedback} onBack={handleBack} />;

  /* btn style helpers */
  const btnBase: CSSProperties = {
    border: "none", borderRadius: "12px", cursor: "pointer", fontFamily: "'Inria Serif', Georgia, serif",
    fontWeight: 700, fontSize: "clamp(13px, 1.6vw, 16px)", letterSpacing: "0.1em",
    padding: "clamp(12px, 1.8vw, 16px) clamp(24px, 3.5vw, 44px)",
    transition: "transform 0.1s, box-shadow 0.2s, background 0.2s",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;}
        body{margin:0;}
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:0;pointer-events:none;position:absolute;}
        textarea{resize:vertical;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F6F4F0", fontFamily: "'Inria Serif', Georgia, serif" }}>

        {showConfirmDelete && (
          <ConfirmDelete
            titulo={form.titulo || "este evento"}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowConfirmDelete(false)}
          />
        )}

        <main style={{
          maxWidth: "860px", margin: "0 auto",
          padding: "clamp(20px, 4vw, 40px) clamp(16px, 5vw, 52px) 72px",
          animation: "fadeUp 0.35s ease",
        }}>

          {/* Back */}
          <button
            aria-label="Voltar"
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginBottom: "10px", display: "flex", alignItems: "center" }}
          >
            <IconBack />
          </button>

          {/* Title */}
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(26px, 5vw, 52px)", color: "#4DA1A9",
            margin: "0 0 clamp(24px, 4vw, 40px)", letterSpacing: "-0.04em", lineHeight: 1.1,
          }}>
            Editar Evento
          </h1>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 3vw, 30px)" }}>

            <Field id="titulo" label="Título" error={!!errors.titulo} focused={focused === "titulo"}>
              <input
                id="titulo" type="text" value={form.titulo}
                onChange={set("titulo")} onFocus={() => setFocused("titulo")} onBlur={() => setFocused(null)}
                aria-required="true" aria-invalid={!!errors.titulo} style={inputStyle()}
              />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(14px, 2.5vw, 24px)" }}>
              <Field id="data" label="Data" error={!!errors.data} focused={focused === "data"}>
                <div style={{ position: "relative" }}>
                  <input
                    ref={dateRef} id="data" type="date" value={form.data}
                    onChange={set("data")} onFocus={() => setFocused("data")} onBlur={() => setFocused(null)}
                    aria-required="true" aria-invalid={!!errors.data}
                    style={{ ...inputStyle(), paddingRight: "48px", colorScheme: "light" } as CSSProperties}
                  />
                  <button
                    type="button" aria-label="Abrir calendário"
                    onClick={() => { dateRef.current?.showPicker(); dateRef.current?.focus(); }}
                    style={{
                      position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", padding: "4px",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#4DA1A9",
                    }}
                  >
                    <IconCalendar />
                  </button>
                </div>
              </Field>

              <Field id="criador" label="Criador do evento" error={!!errors.criador} focused={focused === "criador"}>
                <input
                  id="criador" type="text" value={form.criador}
                  onChange={set("criador")} onFocus={() => setFocused("criador")} onBlur={() => setFocused(null)}
                  aria-required="true" aria-invalid={!!errors.criador} style={inputStyle()}
                />
              </Field>
            </div>

            <Field id="localizacao" label="Localização" error={!!errors.localizacao} focused={focused === "localizacao"}>
              <input
                id="localizacao" type="text" value={form.localizacao}
                onChange={set("localizacao")} onFocus={() => setFocused("localizacao")} onBlur={() => setFocused(null)}
                aria-required="true" aria-invalid={!!errors.localizacao} style={inputStyle()}
              />
            </Field>

            <Field id="descricao" label="Descrição" error={!!errors.descricao} focused={focused === "descricao"}>
              <textarea
                id="descricao" value={form.descricao} rows={5}
                onChange={set("descricao")} onFocus={() => setFocused("descricao")} onBlur={() => setFocused(null)}
                aria-required="true" aria-invalid={!!errors.descricao}
                style={{ ...inputStyle(), minHeight: "130px" }}
              />
            </Field>
          </div>

          {/* Actions — Excluir à esquerda, Salvar à direita */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "clamp(24px, 4vw, 40px)" }}>

            {/* Excluir */}
            <button
              onClick={() => setShowConfirmDelete(true)}
              style={{ ...btnBase, background: "#d95555", color: "#F6F4F0", boxShadow: "0 6px 20px rgba(217,85,85,0.3)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c44"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(217,85,85,0.42)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#d95555"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(217,85,85,0.3)"; }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              EXCLUIR
            </button>

            {/* Salvar */}
            <button
              onClick={handleSave}
              style={{ ...btnBase, background: "#6D94C5", color: "#F6F4F0", boxShadow: "0 6px 20px rgba(109,148,197,0.4)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#5a7fb0"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(109,148,197,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#6D94C5"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(109,148,197,0.4)"; }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              SALVAR
            </button>
          </div>
        </main>
      </div>
    </>
  );
}