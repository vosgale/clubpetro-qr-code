import { ChakraProvider, Grid, Img, Flex } from "@chakra-ui/react";
import MainScreen from "../src/Assets/Images/mainScreen.png";
import CpLogo from "../src/Assets/Images/clubpetro-logo.png";
import ClubpetroTheme from "./Styles/chakra-theme";
import { motion } from "framer-motion";
import { AuthProvider } from "./Contexts/authContext";
import Routes from "./Routes";
export const App = () => {
  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={ClubpetroTheme}>
        <Grid
          height="100vh"
          gridTemplateColumns="50% 50%"
          width="100%"
          overflow="hidden"
        >
          <Img
            as={motion.img}
            initial={{ height: "200%" }}
            animate={{ height: "100%" }}
            transition="0.5s linear"
            src={MainScreen}
            height="100%"
          />
          <Flex
            as={motion.div}
            position="relative"
            initial={{ top: "50px", opacity: 0 }}
            animate={{ top: "0", opacity: 1 }}
            transition="0.7s linear"
            direction="column"
            alignItems="center"
            justifyContent="center"
            rowGap="20px"
            padding="50px 100px"
          >
            <Img src={CpLogo} width="300px" />

            <Routes />
          </Flex>
        </Grid>
      </ChakraProvider>
    </AuthProvider>
  );
};
