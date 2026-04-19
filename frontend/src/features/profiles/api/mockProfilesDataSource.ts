import {
    MonitorScreenData,
    PatientScreenData,
    ProfessorScreenData,
    ReportItem,
    StudentTile,
} from "../types";
import { ProfilesDataSource } from "./profilesDataSource.ts";
import capaLivroExample from "../../../shared/images/capa_livro_example.jpg";

const MOCK_LATENCY_MS = 220;

function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const professorScreenData: ProfessorScreenData = {
    perfil: {
        id: 2,
        nome: "Nome do Professor(a)",
        cadastroEm: "28 maio 2024",
        telefone: "(89) 99400-0000",
        email: "fulano@mail.com",
        tipo: "Professor(a)",
    },
    detalhes: [
        { rotulo: "Genero", valor: "Feminino" },
        { rotulo: "Aniversario", valor: "2 Setembro 2005" },
        { rotulo: "Periodo de monitoria", valor: "2024.1" },
        { rotulo: "Curso", valor: "Psicologia" },
        { rotulo: "Fim do periodo de monitoria", valor: "2024.2" },
        { rotulo: "Professor responsavel", valor: "Fulano de tal" },
    ],
    materiais: [
        { id: 101, capa: capaLivroExample, titulo: "MEU FILHO E AUTISTA E AGORA?", subtitulo: "livro de apoio", paginas: 189, destaque: "1" },
        { id: 102, capa: capaLivroExample, titulo: "MEU FILHO E AUTISTA E AGORA?", subtitulo: "livro de apoio", paginas: 189, destaque: "2" },
        { id: 103, capa: capaLivroExample, titulo: "MEU FILHO E AUTISTA E AGORA?", subtitulo: "livro de apoio", paginas: 189, destaque: "3" },
        { id: 104, capa: capaLivroExample, titulo: "MEU FILHO E AUTISTA E AGORA?", subtitulo: "livro de apoio", paginas: 189, destaque: "4" },
    ],
    eventos: [
        { id: 1, titulo: "Evento1", meta: "23 horas - Administrador" },
        { id: 2, titulo: "Evento1", meta: "23 horas - Administrador" },
        { id: 3, titulo: "Evento3", meta: "4hs atras - Catarina" },
    ],
};

const monitorStudents: StudentTile[] = [
    { id: 11, nome: "Amanda" },
    { id: 12, nome: "Bruno" },
    { id: 13, nome: "Carlos" },
    { id: 14, nome: "Diana" },
    { id: 15, nome: "Enzo" },
    { id: 16, nome: "Fernanda" },
];

const monitorScreenData: MonitorScreenData = {
    perfil: {
        id: 3,
        nome: "Nome do Monitor(a)",
        cadastroEm: "28 maio 2024",
        telefone: "(89) 99400-0000",
        email: "fulano@mail.com",
        tipo: "Monitor(a)",
    },
    detalhes: [
        { rotulo: "Genero", valor: "Feminino" },
        { rotulo: "Aniversario", valor: "2 Setembro 2005" },
        { rotulo: "Periodo de monitoria", valor: "2024.1" },
        { rotulo: "Curso", valor: "Psicologia" },
        { rotulo: "Fim do periodo de monitoria", valor: "2024.2" },
        { rotulo: "Professor responsavel", valor: "Fulano de tal" },
    ],
    alunos: monitorStudents,
};

type MockPatientRecord = {
    data: PatientScreenData;
    relatorios: ReportItem[];
};

const patientCatalog: Record<number, MockPatientRecord> = {
    11: {
        data: {
            perfil: {
                id: 11,
                nome: "Amanda",
                cadastroEm: "28 maio 2024",
                telefone: "(89) 99400-0000",
                email: "fulano@mail.com",
                tipo: "Paciente",
            },
            suporte: {
                nivelSuporte: "N1",
                comodidades: "TDAH",
                medicacao: "Metilfenidato",
                atividadeFisica: "Futebol",
                estereotipia: "Balancar o corpo repetidamente, bater ou sacudir as maos e rodar objetos de forma insistente.",
                responsaveis: "Nome completo da mae e/ou pai (ou responsavel legal)",
                reforcadorPositivo: "A crianca ganha um elogio ou doce ao guardar os brinquedos.",
                reforcadorNegativo: "A pessoa coloca o cinto de seguranca e o som irritante do carro para.",
            },
            relatorios: [],
        },
        relatorios: [
            { id: 501, titulo: "Relatorio de Dezembro", data: "25 set 2024" },
            { id: 502, titulo: "Relatorio de Dezembro", data: "25 set 2024" },
            { id: 503, titulo: "Relatorio de Dezembro", data: "25 set 2024" },
        ],
    },
    12: {
        data: {
            perfil: {
                id: 12,
                nome: "Bruno",
                cadastroEm: "31 maio 2024",
                telefone: "(89) 99401-0001",
                email: "bruno@mail.com",
                tipo: "Paciente",
            },
            suporte: {
                nivelSuporte: "N2",
                comodidades: "TEA",
                medicacao: "Risperidona",
                atividadeFisica: "Natacao",
                estereotipia: "Andar em circulos e repeticao verbal em momentos de ansiedade.",
                responsaveis: "Joana Souza e Carlos Souza",
                reforcadorPositivo: "Recebe pontos extras ao concluir atividades da rotina.",
                reforcadorNegativo: "Interrompe uma tarefa aversiva ao seguir a instrucao combinada.",
            },
            relatorios: [],
        },
        relatorios: [
            { id: 504, titulo: "Relatorio de Janeiro", data: "10 jan 2025" },
            { id: 505, titulo: "Relatorio de Fevereiro", data: "10 fev 2025" },
            { id: 506, titulo: "Relatorio de Marco", data: "10 mar 2025" },
        ],
    },
};

function withPatientReports(record: MockPatientRecord): PatientScreenData {
    return {
        ...record.data,
        relatorios: [...record.relatorios],
    };
}

function resolvePatient(studentId?: number): PatientScreenData {
    if (studentId && patientCatalog[studentId]) {
        return withPatientReports(patientCatalog[studentId]);
    }

    const fallback = patientCatalog[11];
    return withPatientReports(fallback);
}

export const mockProfilesDataSource: ProfilesDataSource = {
    async getProfessorScreenData(): Promise<ProfessorScreenData> {
        await wait(MOCK_LATENCY_MS);

        return {
            ...professorScreenData,
            detalhes: [...professorScreenData.detalhes],
            materiais: [...professorScreenData.materiais],
            eventos: [...professorScreenData.eventos],
        };
    },

    async getMonitorScreenData(): Promise<MonitorScreenData> {
        await wait(MOCK_LATENCY_MS);

        return {
            ...monitorScreenData,
            detalhes: [...monitorScreenData.detalhes],
            alunos: [...monitorScreenData.alunos],
        };
    },

    async getPatientScreenData(studentId?: number): Promise<PatientScreenData> {
        await wait(MOCK_LATENCY_MS);
        return resolvePatient(studentId);
    },
};
