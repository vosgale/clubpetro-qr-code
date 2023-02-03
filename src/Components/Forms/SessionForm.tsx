import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Stack,
  Button,
  FormErrorMessage,
  Grid,
} from "@chakra-ui/react";

import { Formik, Field, Form, FormikHelpers } from "formik";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import { PatternFormat } from "react-number-format";
import { ISessionForm } from "./types";
import { SessionValidation } from "./validations";

export const SessionForm = () => {
  const { setSession, currentSessionName } = useAuth();
  if (currentSessionName !== null) {
    return <Navigate to="/" replace />;
  }

  const PatternInput = ({ ...props }: any) => {
    return <PatternFormat {...props} customInput={Input}></PatternFormat>;
  };
  return (
    <Flex flexDir="column" width="100%" minHeight="200px">
      <Formik
        validationSchema={SessionValidation}
        initialValues={{
          sessionName: "",
          userName: "",
          userEmail: "",
          userCPF: "",
          userWhatsApp: "",
          dailyMessagesLimit: "",
        }}
        onSubmit={async function (
          values: ISessionForm,
          { setSubmitting }: FormikHelpers<ISessionForm>
        ) {
          setSubmitting(true);
          setSession(values);

          setTimeout(() => setSubmitting(false), 4000);
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              <Text fontSize="xl" marginBottom="20px" textAlign="center">
                Inicie uma sessão
              </Text>
              <Grid gridTemplateColumns="48% 48%" gridGap="20px">
                <FormControl
                  isInvalid={touched.sessionName && !!errors.sessionName}
                >
                  <FormLabel>Nome da sessão</FormLabel>
                  <Field
                    as={Input}
                    id="sessionName"
                    name="sessionName"
                    variant="primary"
                  />

                  <FormErrorMessage>{errors.sessionName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.userName && !!errors.userName}>
                  <FormLabel>Nome do usuário</FormLabel>
                  <Field
                    as={Input}
                    id="userName"
                    name="userName"
                    variant="primary"
                  />

                  <FormErrorMessage>{errors.userName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={touched.userEmail && !!errors.userEmail}
                >
                  <FormLabel>E-mail</FormLabel>
                  <Field
                    as={Input}
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    variant="primary"
                  />

                  <FormErrorMessage>{errors.userEmail}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.userCPF && !!errors.userCPF}>
                  <FormLabel>CPF</FormLabel>
                  <Field
                    component={PatternInput}
                    id="userCPF"
                    format="###.###.###-##"
                    name="userCPF"
                    variant="primary"
                    onChange={(e: any) =>
                      setFieldValue("userCPF", e.target.value)
                    }
                  />

                  <FormErrorMessage>{errors.userCPF}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={touched.userWhatsApp && !!errors.userWhatsApp}
                >
                  <FormLabel>WhatsApp</FormLabel>
                  <Field
                    component={PatternInput}
                    format={"(##) # ####-####"}
                    id="userWhatsApp"
                    name="userWhatsApp"
                    variant="primary"
                    onChange={(e: any) =>
                      setFieldValue("userWhatsApp", e.target.value)
                    }
                  />

                  <FormErrorMessage>{errors.userWhatsApp}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    touched.dailyMessagesLimit && !!errors.dailyMessagesLimit
                  }
                >
                  <FormLabel>Limite de mensagens diárias</FormLabel>
                  <Field
                    as={Input}
                    id="dailyMessagesLimit"
                    name="dailyMessagesLimit"
                    variant="primary"
                  />

                  <FormErrorMessage>
                    {errors.dailyMessagesLimit}
                  </FormErrorMessage>
                </FormControl>
              </Grid>

              <Stack direction="row" justify="flex-end">
                <Button
                  isLoading={isSubmitting}
                  disabled
                  type="submit"
                  variant="primary"
                  minW="100px"
                >
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};
