export const LoginStart =()=>({
type:"LOGIN_START"
});

export const LoginSucces = (user)=>({
  type:"LOGIN_SUCCES",
   payload:user
});

export const LoginFailure = () =>({
    type:"LOGIN_FAILURE"
});

export const LoginOut = ()=>({
   type:"LOGIN_FAILURE"
});
export const ChangeUser = (user) = ({
    type:"CHANGE_USER",
    payload:user
});







