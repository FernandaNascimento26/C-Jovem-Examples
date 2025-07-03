import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const{register, 
        handleSubmit,
        formState:{errors}
    } = useForm();

    const onSubmit = (data) =>{
        console.log(data);

    if (data.email === "admin@email.com" && data.senha === "123456") {
      alert("Login bem-sucedido!");
      navigate("/");
    } else {
      alert("Credenciais inválidas.");
    }
    }

  return (
    <>
     <div>
        <h1>Login</h1>

        <form>
            <div>
                <label>Email:</label>
                <input
                type="email"
                {...register("email", {required: "Email é obrigatório"})}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
                <label>Senha:</label>
                <input
                type="password"
                {...register("senha", {required: "Senha é obrigatória"})}
                />
                {errors.senha && <span>{errors.senha.message}</span>}
            </div>

            <button onClick={handleSubmit(onSubmit)}>Entrar</button>
        </form>

    </div>
    </>
  );
}

export default Login;