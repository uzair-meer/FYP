import AppRouter from "./Router/Router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ServicesProvider } from "./context/UserContext.jsx";
function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ServicesProvider>
          <AppRouter />
        </ServicesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
