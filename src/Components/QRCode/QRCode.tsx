import { Button, Flex, Image, Spinner, useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import api from "../../Services/api";
import { useState } from "react";
import { Text } from "@chakra-ui/react";

export const QRCode = () => {
  const toast = useToast();
  const [loadingStatus, setLoadingStatus] = useState<undefined | string>(
    undefined
  );
  const [image, setImage] = useState<undefined | string>(undefined);
  const { destroySession, currentSessionName } = useAuth();

  const handleQRCode = (data: any) => {
    const b64encoded = btoa(String.fromCharCode(...new Uint8Array(data)));
    setImage(b64encoded);
  };
  const getQRCODE = async () => {
    if (currentSessionName) {
      const response = await api.get(`/robot/get-qrcode/${currentSessionName}`);
      if (
        (response.data.data === null &&
          response.data.sessionStatus === "waitForLogin") ||
        response.data.sessionStatus === "initWhatsapp"
      ) {
        if (response.data.sessionStatus === "waitForLogin") {
          setLoadingStatus("Esperando pelo login...");
        }
        setTimeout(() => getQRCODE(), 2000);
      } else if (response.data.sessionStatus !== "Not Logged") {
        handleQRCode(response.data.data.data);
        setTimeout(() => getQRCODE(), 5000);
      } else if (response.data.sessionStauts === "successChat") {
        return (
          destroySession(),
          toast({
            title: "QR Code utilizado com sucesso!",
            description: "Crie uma nova sessão para obter um novo QR-CODE",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        );
      } else
        return (
          destroySession(),
          toast({
            title: "Sessão expirada",
            description: "Crie uma nova sessão para obter um novo QR-CODE",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        );
    }
  };

  if (currentSessionName === null) {
    return <Navigate to="/iniciar-sessao" replace />;
  }

  // successChat

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
          direction="column"
          width="250px"
          alignItems="center"
          justifyContent="center"
          rowGap="15px"
        >
          {!image ? (
            loadingStatus ? (
              <>
                <Spinner size="xl" color="primary" />
                <Text>{loadingStatus}</Text>
              </>
            ) : (
              <p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setLoadingStatus("iniciando o Whatsapp");
                    getQRCODE();
                  }}
                >
                  Gerar QRCODE
                </Button>
              </p>
            )
          ) : (
            <>
              <Image
                width="200px"
                height="200px"
                src={`data:image/png;base64,${image}`}
                alt="QRCODE"
              />
              <Text>Seu QR-CODE está pronto!</Text>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
