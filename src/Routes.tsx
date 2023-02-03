import { Button } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from "react-router-dom";

import { LoginForm } from "./Components/Forms/LoginForm";
import { SessionForm } from "./Components/Forms/SessionForm";
import { QRCode } from "./Components/QRCode/QRCode";
import { useAuth } from "./Contexts/authContext";
interface ProtectedRoutes {
  children: React.ReactElement;
}

function Routes() {
  const { signed, isLoading, logOut } = useAuth();

  const ProtectedRoute = ({ children }: ProtectedRoutes) => {
    if (!signed && !isLoading) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return isLoading ? (
    <p>Carregando</p>
  ) : (
    <Router>
      {signed && (
        <Button
          variant="outline"
          color="primary"
          borderColor="primary"
          position="absolute"
          top="15px"
          right="15px"
          onClick={() => logOut()}
        >
          Sair
        </Button>
      )}

      <Switch>
        <Route path="/login" element={<LoginForm />} />
        <Route
          element={
            <ProtectedRoute>
              <SessionForm />
            </ProtectedRoute>
          }
          path="/iniciar-sessao"
        />
        <Route
          element={
            <ProtectedRoute>
              <QRCode />
            </ProtectedRoute>
          }
          path="/"
        />
      </Switch>
    </Router>
  );
}
export default Routes;
