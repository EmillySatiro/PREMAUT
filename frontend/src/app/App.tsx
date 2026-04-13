import HealthPanel from "../features/health/components/HealthPanel";


function App() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">PREMAUT</p>
        <h1>Ambiente React + FastAPI + PostgreSQL</h1>
        <p className="muted">Esta tela valida a conexao com o backend e o banco.</p>
        <HealthPanel />
      </section>
    </main>
  );
}


export default App;