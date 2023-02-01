import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Stack,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Formik, Field, Form, FormikHelpers } from "formik";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";

import { ISessionForm } from "./types";
import { SessionValidation } from "./validations";
export const SessionForm = () => {
  const { setSession, currentSessionName } = useAuth();
  if (currentSessionName !== null) {
    return <Navigate to="/" replace />;
  }
  return (
    <Flex flexDir="column" width="100%" height="200px">
      <Formik
        validationSchema={SessionValidation}
        initialValues={{
          sessionName: "",
        }}
        onSubmit={async function (
          { sessionName }: ISessionForm,
          { setSubmitting }: FormikHelpers<ISessionForm>
        ) {
          setSubmitting(true);
          setSession(sessionName);

          setTimeout(() => setSubmitting(false), 4000);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Stack spacing={3}>
              <Text fontSize="xl" marginBottom="20px" textAlign="center">
                Inicie uma sessão
              </Text>
              <FormControl
                isInvalid={touched.sessionName && !!errors.sessionName}
              >
                <FormLabel>Nome da sessão</FormLabel>
                <Field
                  as={Input}
                  id="sessionName"
                  name="sessionName"
                  variant="primary"
                  placeholder="ex: Clubpetro"
                />

                <FormErrorMessage>{errors.sessionName}</FormErrorMessage>
              </FormControl>

              <Stack direction="row" spacing={3} justify="flex-end">
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
