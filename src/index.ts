import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const repository = new PrismaClient();

// Listar todos os usuários
app.get("/usuarios", async (req: Request, res: Response) => {
    // 1- entrada
    // nada

    // 2- processamento
    const usuarios = await repository.usuario.findMany();

    // 3- saida
    return res.status(200).send({
        ok: true,
        message: "Usuários listados com sucesso",
        data: usuarios,
    });
});

// BODY, QUERY, ROUTE PARAMS

// HTTP:// localhost:3333/usuarios

// Criar um novo usuário
app.post("/usuarios", async (req: Request, res: Response) => {
    // 1- entrada
    const { nome, sobrenome, tipo } = req.body;

    if (!nome || !sobrenome || !tipo) {
        return res.status(400).send({
            ok: false,
            message: "Preencha todos os campos",
        });
    }

    // 2- processamento
    await repository.usuario.create({
        data: {
            nome,
            sobrenome,
            tipo,
        },
    });

    // 3- saída
    return res.status(201).send({
        ok: true,
        message: "Usuário criado com sucesso",
    });
});

app.listen(3333, () => {
    console.log("API está rodando");
});

// GET  http://localhost:3333/usuarios

// // Select * from usuario

// async function listarUsuarios() {
//     const usuarios = await repository.usuario.findMany();

//     console.log(usuarios);
// }

// listarUsuarios();
