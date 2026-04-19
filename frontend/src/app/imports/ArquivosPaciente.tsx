import { useState, CSSProperties } from "react";

/* ─── Types ──────────────────────────────────────────────── */
type FileType = "pdf" | "image" | "video" | "audio" | "doc" | "spreadsheet" | "zip" | "generic";

interface Arquivo {
  id: number;
  nome: string;
  tipo: FileType;
  data: string;
  url?: string;
}

/* ─── File type detector ─────────────────────────────────── */
function detectType(nome: string): FileType {
  const ext = nome.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(ext)) return "image";
  if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) return "video";
  if (["mp3", "wav", "ogg", "flac", "aac"].includes(ext)) return "audio";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc", "docx", "txt", "odt"].includes(ext)) return "doc";
  if (["xls", "xlsx", "csv", "ods"].includes(ext)) return "spreadsheet";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "zip";
  return "generic";
}

/* ─── Icons per file type ────────────────────────────────── */
function FileIcon({ tipo }: { tipo: FileType }) {
  const color = "#4DA1A9";
  const size = 28;

  if (tipo === "image") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );

  if (tipo === "pdf") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <text x="6" y="18" fontSize="5" fill={color} stroke="none" fontWeight="bold">PDF</text>
    </svg>
  );

  if (tipo === "video") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="15" height="14" rx="2"/>
      <polygon points="22 7 17 12 22 17 22 7" fill={color} stroke={color}/>
    </svg>
  );

  if (tipo === "audio") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  );

  if (tipo === "doc") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>
    </svg>
  );

  if (tipo === "spreadsheet") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  );

  if (tipo === "zip") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="10" x2="12" y2="10"/><line x1="12" y1="13" x2="12" y2="13"/>
      <line x1="12" y1="16" x2="12" y2="18"/>
    </svg>
  );

  // generic
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DA1A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconTrash = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d95555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const IconBack = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4DA1A9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

/* ─── Confirm delete modal ───────────────────────────────── */
interface ConfirmProps { nome: string; onConfirm: () => void; onCancel: () => void; }
function ConfirmDelete({ nome, onConfirm, onCancel }: ConfirmProps) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.32)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
    }}>
      <div style={{
        background: "#F6F4F0", borderRadius: "14px", padding: "28px 24px",
        maxWidth: "340px", width: "90%", textAlign: "center",
        fontFamily: "'Inria Serif', Georgia, serif",
        boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", background: "rgba(217,85,85,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
        }}>
          <IconTrash />
        </div>
        <h3 style={{ fontWeight: 700, fontSize: "18px", color: "#2a5a5f", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
          Excluir arquivo?
        </h3>
        <p style={{ fontSize: "13px", color: "#7aacaf", margin: "0 0 22px", lineHeight: 1.5 }}>
          "<strong style={{ color: "#2a5a5f" }}>{nome}</strong>" será removido permanentemente.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "11px", border: "1.8px solid rgba(77,161,169,0.4)",
            borderRadius: "10px", background: "transparent", fontFamily: "'Inria Serif', Georgia, serif",
            fontWeight: 700, fontSize: "13px", color: "#4DA1A9", cursor: "pointer",
          }}>
            CANCELAR
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "11px", border: "none", borderRadius: "10px",
            background: "#d95555", fontFamily: "'Inria Serif', Georgia, serif",
            fontWeight: 700, fontSize: "13px", color: "#F6F4F0", cursor: "pointer",
          }}>
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── File row ───────────────────────────────────────────── */
interface RowProps { arquivo: Arquivo; onDelete: (id: number) => void; }
function FileRow({ arquivo, onDelete }: RowProps) {
  const [hovered, setHovered] = useState(false);

  const rowStyle: CSSProperties = {
    display: "flex", alignItems: "center", gap: "14px",
    padding: "14px 18px",
    background: hovered ? "rgba(77,161,169,0.05)" : "#F6F4F0",
    border: "1.5px solid rgba(77,161,169,0.3)",
    borderRadius: "10px",
    transition: "background 0.15s",
    fontFamily: "'Inria Serif', Georgia, serif",
  };

  return (
    <div
      style={rowStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
        <FileIcon tipo={arquivo.tipo} />
      </div>

      {/* Name */}
      <span style={{ flex: 1, fontSize: "15px", color: "#2a5a5f", fontWeight: 400, letterSpacing: "-0.01em" }}>
        {arquivo.nome}
      </span>

      {/* Date */}
      <span style={{ fontSize: "13px", color: "#7aacaf", whiteSpace: "nowrap", marginRight: "8px" }}>
        {arquivo.data}
      </span>

      {/* Download */}
      <a
        href={arquivo.url ?? "#"}
        download={arquivo.nome}
        aria-label={`Baixar ${arquivo.nome}`}
        style={{ display: "flex", alignItems: "center", padding: "6px", borderRadius: "6px", color: "#4DA1A9", transition: "background 0.15s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(77,161,169,0.12)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
      >
        <IconDownload />
      </a>

      {/* Delete */}
      <button
        aria-label={`Excluir ${arquivo.nome}`}
        onClick={() => onDelete(arquivo.id)}
        style={{
          display: "flex", alignItems: "center", padding: "6px", borderRadius: "6px",
          background: "none", border: "none", cursor: "pointer", transition: "background 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(217,85,85,0.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
      >
        <IconTrash />
      </button>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
interface ArquivosProps {
  arquivos?: Arquivo[];
  onBack?: () => void;
}

const DEMO: Arquivo[] = [
  { id: 1, nome: "Laudo.pdf",        tipo: "pdf",         data: "25 set 2024" },
  { id: 2, nome: "Laudo.png",        tipo: "image",       data: "25 set 2024" },
  { id: 3, nome: "Relatorio.docx",   tipo: "doc",         data: "10 out 2024" },
  { id: 4, nome: "Planilha.xlsx",    tipo: "spreadsheet", data: "12 out 2024" },
  { id: 5, nome: "Consulta.mp4",     tipo: "video",       data: "18 out 2024" },
  { id: 6, nome: "Áudio.mp3",        tipo: "audio",       data: "20 out 2024" },
  { id: 7, nome: "Documentos.zip",   tipo: "zip",         data: "22 out 2024" },
];

export default function Arquivos({ arquivos: initialArquivos = DEMO, onBack }: ArquivosProps) {
  const [lista, setLista] = useState<Arquivo[]>(
    initialArquivos.map((a) => ({ ...a, tipo: a.tipo ?? detectType(a.nome) }))
  );
  const [toDelete, setToDelete] = useState<Arquivo | null>(null);

  const handleDelete = (id: number) => {
    const arq = lista.find((a) => a.id === id) ?? null;
    setToDelete(arq);
  };

  const confirmDelete = () => {
    if (toDelete) setLista((l) => l.filter((a) => a.id !== toDelete.id));
    setToDelete(null);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`*{box-sizing:border-box;}body{margin:0;}@keyframes fadeUp{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ minHeight: "100vh", background: "#F6F4F0", fontFamily: "'Inria Serif', Georgia, serif" }}>

        {toDelete && (
          <ConfirmDelete
            nome={toDelete.nome}
            onConfirm={confirmDelete}
            onCancel={() => setToDelete(null)}
          />
        )}

        <main style={{
          maxWidth: "860px", margin: "0 auto",
          padding: "clamp(20px, 4vw, 40px) clamp(16px, 5vw, 52px) 72px",
          animation: "fadeUp 0.35s ease",
        }}>

          {/* Back button */}
          <button
            aria-label="Voltar"
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "38px", height: "38px",
              background: "transparent",
              border: "1.8px solid rgba(77,161,169,0.5)",
              borderRadius: "8px", cursor: "pointer",
              marginBottom: "20px",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(77,161,169,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <IconBack />
          </button>

          {/* Title */}
          <h1 style={{
            fontWeight: 700, fontSize: "clamp(24px, 4vw, 42px)", color: "#4DA1A9",
            margin: "0 0 clamp(20px, 3vw, 32px)", letterSpacing: "-0.04em", lineHeight: 1.1,
          }}>
            Arquivos
          </h1>

          {/* List */}
          {lista.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px 20px",
              color: "#7aacaf", fontSize: "15px", letterSpacing: "-0.01em",
            }}>
              Nenhum arquivo encontrado.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {lista.map((arq) => (
                <FileRow key={arq.id} arquivo={arq} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}