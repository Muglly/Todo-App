import { auth } from "./Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"


const Header = () => {

    let usuario = null;

    const criarConta = (e) => {
        e.preventDefault();

        let email = document.querySelector("[name=email]").value;
        let password = document.querySelector("[name=password]").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                document.querySelector(".container-login").style.display = "block";
                document.querySelector(".login").style.display = "none";
                alert("logado com sucesso!" + user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });

    }

    const sair = (e) => {
        e.preventDefault()


        signOut(auth).then(() => {
            alert("Deslogado");
            document.querySelector(".container-login").style.display = "none";
            document.querySelector(".login").style.display = "block";
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="header">
            <div className="login">
                <h2>Faça o Login no App</h2>
                <form onSubmit={(e) => criarConta(e)}>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Senha" />
                    <button type="submit" name="entrar">Entrar</button>
                </form>
            </div>

            <div className="container-login">
                <h2>Olá, você está logado</h2>
                <button onClick={(e) => sair(e)}>sair</button>

            </div>

        </div>
    )

}

export default Header;