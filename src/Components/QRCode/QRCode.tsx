import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import api from "../../Services/api";

export const QRCode = () => {
  const { currentSessionName } = useAuth();
  if (currentSessionName === null) {
    return <Navigate to="/iniciar-sessao" replace />;
  }
  const getQRCode = () => {
    const response = api.get("/robot/get-qrcode", {
      params: {
        sessionName: currentSessionName,
      },
    });
    console.log(response);
  };
  getQRCode();
  return <p>Tela do qr code</p>;
};
