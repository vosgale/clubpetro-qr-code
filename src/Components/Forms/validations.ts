import * as Yup from 'yup';
export const LoginValidation = Yup.object().shape({
    document: Yup.string().required('Insira seu e-mail'),
    password: Yup.string().required('Insira sua senha'),

});

export const SessionValidation = Yup.object().shape({
    sessionName: Yup.string().required('Insira o nome da sessão'),


});