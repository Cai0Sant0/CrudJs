import { useEffect, useState, useRef } from "react";
import "./style.css";
import ImgLixo from "../../assets/lixo.svg";
import api from "../../services/api";

function Home() {
  let [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          type="text"
          name="nome"
          id="nomeUsu"
          placeholder="Nome"
          autoComplete="off"
          ref={inputName}
        />
        <input
          type="number"
          name="idade"
          id="idadeUsu"
          placeholder="Idade"
          autoComplete="off"
          ref={inputAge}
        />
        <input
          type="email"
          name="email"
          id="emailUsu"
          placeholder="Email"
          autoComplete="off"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade:<span> {user.age}</span>
            </p>
            <p>
              Email:<span> {user.email}</span>
            </p>
          </div>
           <button onClick={() => deleteUsers(user.id)}> {/*faz isso porque se não trava a função porque ela tem parametro */}
            <img src={ImgLixo} alt="imagem de lixeira" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
