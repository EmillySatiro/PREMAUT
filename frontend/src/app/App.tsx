import HealthPanel from "../features/health/components/HealthPanel";
import CadastroEvento from "./imports/CadastroEvento";
import EditarEvento from "./imports/EditarEvento";
import ArquivoPasciente from "./imports/ArquivosPaciente";

function App() {
  return (
    <>
      {/* <CadastroEvento /> */}
      <ArquivoPasciente />
      <EditarEvento />
    </>
  );

}

export default App;