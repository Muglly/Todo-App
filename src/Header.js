import firebase from "firebase/compat/app";
import { auth, db } from "./Firebase";

const Header = () => {

    let usuario = "";

    // Sistema de login
    const criarConta = (e) => {
        e.preventDefault();

        let email = document.querySelector("[name=email]").value;
        let password = document.querySelector("[name=password]").value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                usuario = userCredential.user;
                document.querySelector(".container").style.display = "block";
                document.querySelector(".login").style.display = "none";
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

        firebase.auth().signOut().then(() => {
            document.querySelector(".container").style.display = "none";
            document.querySelector(".login").style.display = "block";
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    // Sistema de permanencia de login
    auth.onAuthStateChanged((val) => {
        if (val) {
            usuario = val;
            document.querySelector(".container").style.display = "block";
            document.querySelector(".login").style.display = "none";


            db.collection("tarefa").where("userId", "==", usuario.uid).onSnapshot((data) => {

                let list = document.querySelector(".tarefas");
                list.innerHTML = "";
                let tarefas = data.docs;
                tarefas = tarefas.sort((a, b) => {
                    if (a.data().horario < b.data().horario) {
                        return -1;
                    } else {
                        return +1;
                    }
                })

                tarefas.map((val) => {
                    list.innerHTML += `<li>${val.data().tarefa} <a tarefa-id="${val.id}" class="excluir-btn" href="javascript:void(0)">(X)</a></li>`
                })

                // Sistema de excluir tarefas
                let excluirTarefas = document.querySelectorAll(".excluir-btn");

                excluirTarefas.forEach(element => {

                    element.addEventListener('click',function(e){
    
                        e.preventDefault();
    
                        let docId = element.getAttribute('tarefa-id');
    
                        db.collection('tarefa').doc(docId).delete();
    
                    })
    
                });
    
            });
        }
    })

   
    // Sistema de cadastro das tarefas no db
    const cadastroTarefa = (e) => {
        e.preventDefault();

        let tarefa = document.querySelector("[name=tarefa]").value;
        let dateTime = document.querySelector("[name=datetime]").value;

        let dataAtual = new Date().getTime();
        if (dataAtual > new Date(dateTime).getTime()) {
            alert("Informe uma data valida!")
        } else if (tarefa == "" || dateTime == "") {
            alert("Preencha os campos por favor")
        } else {

            try {
                db.collection("tarefa").add({
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
                <h2>Fa??a o Login no App</h2>
                <form className="login-form" onSubmit={(e) => criarConta(e)}>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Senha" />
                    <button type="submit" name="entrar">Entrar</button>
                </form>
            </div>

            <div className="container">
                <div className="container-login">
                    <h2>Ol??, voc?? est?? logado <button onClick={(e) => sair(e)}>sair</button></h2>

                    <form className="form-cadatro-tarefa" onSubmit={(e) => cadastroTarefa(e)}>
                        <textarea name="tarefa" placeholder="Tarefa"></textarea>
                        <input type="datetime-local" name="datetime" />
                        <button type="submit" name="cadastrar">Cadastrar</button>
                    </form>
                </div>

                <div className="tarefas-usuario">
                    <h3>Listagem de tarefas atuais: </h3>
                    <ul className="tarefas"></ul>
                </div>
            </div>  

        </div>
    )

}

export default Header;