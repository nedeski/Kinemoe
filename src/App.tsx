import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./assets/context/UserContext/UserProvider";
import { MainRouter } from "./routes/MainRouter";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <MainRouter />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
