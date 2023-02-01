import {
    extendTheme,
} from '@chakra-ui/react'
import { ButtonStyles as Button } from './ButtonStyles';
import { InputStyles as Input } from './InputStyles';


const ClubpetroTheme = extendTheme(
    {
        colors: {
            primary: "#f2672b",
            secondary: "#f2672b"
        },
        components: {
            Button,
            Input
        }
    },

)

export default ClubpetroTheme;