import LoreviaLogo from "../../assets/lorevia-logo.png";
import "./App.scss";

function App() {
  return (
    <main className="container">
      <h1>Lorevia</h1>
      <h2 contentEditable={true}>Donde tu lore tiene una via</h2>

      <div className="row">
        <a href="https://lorevia.net" target="_blank">
          <img src={LoreviaLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="row">
        <button>Iniciar</button>
      </div>
    </main>
  );
}

export default App;
