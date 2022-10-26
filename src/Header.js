import { auth, db } from "./Firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { collection, addDoc, doc, onSnapshot, where } from "firebase/firestore";

const Header = () => {

    let usuario = "";
    const docCol = collection(db, "tarefa");

    // Sistema de login
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

    // Sistema de logaut
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

    // Sistema de permanencia de login
    onAuthStateChanged(auth, (val) => {
        if (val) {
            usuario = val;
            alert("Bem-vindo de volta " + usuario.email);
            document.querySelector(".container-login").style.display = "block";
            document.querySelector(".login").style.display = "none";
        }

        onSnapshot( docCol, where("userId","==", usuario.uid),(doc) => {
            console.log("Current data: ", doc.docs);
        });

    })

    // Sistema de cadastro das tarefas no db
    const cadastroTarefa = async (e) => {
        e.preventDefault();

        let tarefa = document.querySelector("[name=tarefa]").value;
        let dateTime = document.querySelector("[name=datetime]").value;

        let dataAtual = new Date().getTime();
        if(dataAtual > new Date(dateTime).getTime()){
            alert("Informe uma data valida!")
        }else if(tarefa == "" || dateTime == ""){
            alert("Preencha os campos por favor")
        }else{

            try {
                const docRef = await addDoc(docCol, {
                    tarefa: tarefa,
                    horario: dateTime,
                    userId: usuario.uid
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
    
            let limpar = document.querySelector(".form-cadatro-tarefa").reset(); 
            alert("Cadastrado com sucesso!")

        }

    }


    return (
        <div className="header">
            <div className="login">
                <h2>Faça o Login no App</h2>
                <form className="login-form" onSubmit={(e) => criarConta(e)}>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Senha" />
                    <button type="submit" name="entrar">Entrar</button>
                </form>
            </div>

            <div className="container-login">
                <h2>Olá, você está logado <button onClick={(e) => sair(e)}>sair</button></h2>

                <form className="form-cadatro-tarefa" onSubmit={(e) => cadastroTarefa(e)}>
                    <textarea name="tarefa"></textarea>
                    <input type="datetime-local" name="datetime" />
                    <button type="submit" name="cadastrar">Cadastrar</button>
                </form>

                <div className="tarefas-usuario">
                    <h3>Listagem de tarefas atuais: </h3>
                </div>

            </div>

        </div>
    )

}

export default Header;