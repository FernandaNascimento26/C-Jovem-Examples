import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();


const onsubmit = (data) => {
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
           <h1>Login</h1>

           <form>
            <div>
                <label>Email:</label>
                <input type="email"
                {...register('email',{required: 'Email obrigatório'})}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
                        <div>
                <label>Senha:</label>
                <input type="password"
                {...register('senha',{required: 'Senha obrigatório'})}
                />
                {errors.senha && <span>{errors.senha.message}</span>}
            </div>

            <button onClick={handleSubmit(onsubmit)}>Entrar</button>
           </form>
        </>
    );
}

export default Login;