import * as Yup from 'yup';
import { isValidCpf } from '../../Utils/cpf-validation';
import { cellPhoneRegexExp } from '../../Utils/validations-regex';
export const LoginValidation = Yup.object().shape({
    document: Yup.string().required('Insira seu e-mail'),
    password: Yup.string().required('Insira sua senha'),

});

export const SessionValidation = Yup.object().shape({
    sessionName: Yup.string().required('Insira o nome da sessão'),
    userName: Yup.string().required('Insira seu nome'),
    userEmail: Yup.string().required('Insira seu e-mail'),
    userCPF: Yup.string()
        .required("Campo obrigatório")
        .test("cpf", "CPF inválido", (value) => {
            if (value) {
                return isValidCpf(value);
            }
            return true;
        }),
    userWhatsApp: Yup.string()
        .required('insira o numero')
        .matches(cellPhoneRegexExp, 'numero de celular invalido'),
    dailyMessagesLimit: Yup.string().required('Insira o máximo de mensagens diárias'),

});