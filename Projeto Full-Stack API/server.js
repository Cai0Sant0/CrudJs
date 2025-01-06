import express, { query } from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Avisando que vou usar Json na aplicação

app.use(cors()) //Configurando front-end para acessar a aplicação nesse caso de cors está livre para total acesso

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {

    let usuarios = []

    if(req.query){
        usuarios = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    }
    else{
        usuarios = await prisma.user.findMany();
    }
  res.status(200).json(usuarios);
});

app.put("/usuarios/:id", async (req, res) => {
  console.log(req);

  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ mensagem: "Usuário deletado com sucesso !" });
});

app.listen(3000); // escolhendo a porta que o servidor irá rodar

/*

    config das rotas

    1- tipo de rota;
    2- endpoint para a rota;

    ---Métodos HTTP---

    get - lista;
    post - cria;
    put - edita vários;
    patch - edita UM;
    delete - deleta;

*/
