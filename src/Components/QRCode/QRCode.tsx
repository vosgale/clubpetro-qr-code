import { Button, Flex, Image, Spinner } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import api from "../../Services/api";
import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

export const QRCode = () => {
  const [loadingStatus, setLoadingStatus] = useState("Iniciando Whatsapp...");
  const [image, setImage] = useState<undefined | string>(undefined);
  const { destroySession, currentSessionName } = useAuth();

  const handleQRCode = (data: any) => {
    const b64encoded = btoa(String.fromCharCode(...new Uint8Array(data)));
    setImage(b64encoded);
  };

  const getQRCODE = async () => {
    const response = await api.get(`/robot/get-qrcode/${currentSessionName}`);
    if (
      response.data.data === null &&
      response.data.sessionStatus !== "Not Logged"
    ) {
      if (response.data.sessionStatus === "waitForLogin") {
        setLoadingStatus("Esperando pelo login...");
      }
      setTimeout(() => getQRCODE(), 2000);
    } else {
      handleQRCode(response.data.data.data);
    }
  };
  useEffect(() => {
    getQRCODE();
  }, []);

  if (currentSessionName === null) {
    return <Navigate to="/iniciar-sessao" replace />;
  }

  return (
    <>
      <Button
        position="absolute"
        top="25px"
        right="90px"
        variant="link"
        color="primary"
        onClick={() => destroySession()}
      >
        Encerrar sessão
      </Button>
      <Flex direction="column">
        <Flex
          height="250px"
          width="250px"
          direction="column"
          alignItems="center"
          justifyContent="center"
          rowGap="15px"
        >
          {!image ? (
            <>
              <Spinner size="xl" color="primary" />
              <Text>{loadingStatus}</Text>
            </>
          ) : (
            <Image
              width="200px"
              height="200px"
              src={`data:image/png;base64,${image}`}
              alt=""
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};
