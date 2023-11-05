import AppRouter from "./Router/Router";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
