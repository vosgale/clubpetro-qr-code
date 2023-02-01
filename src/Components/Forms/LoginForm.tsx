import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContext";
import { ILoginForm } from "./types";
import { LoginValidation } from "./validations";
export const LoginForm = () => {
  const [showPassword, setshowPassword] = useState(false);
  const { Login, signed } = useAuth();

  if (signed) {
    return <Navigate to="/iniciar-sessao" replace />;
  }

  return (
    <Flex flexDir="column" width="100%" height="200px">
      <Formik
        validationSchema={LoginValidation}
        initialValues={{
          document: "",
          password: "",
        }}
        onSubmit={(
          values: ILoginForm,
          { setSubmitting }: FormikHelpers<ILoginForm>
        ) => {
          setSubmitting(true);
          Login(values);

          setTimeout(() => setSubmitting(false), 4000);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Stack spacing={3}>
              <Text fontSize="xl" marginBottom="20px" textAlign="center">
                Bem vindo! Faça o login para gerar seu QRCode!
              </Text>
              <FormControl isInvalid={touched.document && !!errors.document}>
                <FormLabel>Email</FormLabel>
                <Field
                  as={Input}
                  id="document"
                  name="document"
                  variant="primary"
                  placeholder="ex: 1244223"
                />

                <FormErrorMessage>{errors.document}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.password && !!errors.password}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Field
                    as={Input}
                    name="password"
                    id="password"
                    placeholder="******"
                    variant="primary"
                    type={showPassword ? "password" : "text"}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      aria-label="Hide/show password"
                      onClick={() => setshowPassword(!showPassword)}
                    >
                      {!showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
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
