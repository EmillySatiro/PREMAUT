export type ScreenId = "professor" | "monitor" | "paciente";

export type PersonCard = {
  id: number;
  nome: string;
  cadastroEm: string;
  telefone: string;
  email: string;
  tipo: string;
};

export type DetailPair = {
  rotulo: string;
  valor: string;
};

export type MaterialCard = {
  id: number;
  capa: string;
  titulo: string;
  subtitulo: string;
  paginas: number;
  destaque: string;
};

export type EventItem = {
  id: number;
  titulo: string;
  meta: string;
};

export type StudentTile = {
  id: number;
  nome: string;
};

export type PatientSupportData = {
  nivelSuporte: string;
  comodidades: string;
  medicacao: string;
  atividadeFisica: string;
  estereotipia: string;
  responsaveis: string;
  reforcadorPositivo: string;
  reforcadorNegativo: string;
};

export type ReportItem = {
  id: number;
  titulo: string;
  data: string;
};

export type ProfessorScreenData = {
  perfil: PersonCard;
  detalhes: DetailPair[];
  materiais: MaterialCard[];
  eventos: EventItem[];
};

export type MonitorScreenData = {
  perfil: PersonCard;
  detalhes: DetailPair[];
  alunos: StudentTile[];
};

export type PatientScreenData = {
  perfil: PersonCard;
  suporte: PatientSupportData;
  relatorios: ReportItem[];
};
