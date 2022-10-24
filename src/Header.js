

const Header = () => {

    return(
        <div className="header">
            <div className="login">
                <h2>Faça o Login no App</h2>
                <form>
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Senha"/>
                    <button type="submit" name="entrar">Entrar</button>
                </form>
            </div>
        </div>
    )

}

export default Header;