import Cliente from "../modelo/cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;

            if (cpf && nome && endereco && numero && bairro && cidade && uf && cep) {
                const cliente = new Cliente(cpf, nome, endereco, numero, bairro, cidade, uf, cep);
                // Resolve a promise
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do cliente conforme a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um cliente!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;

            if (cpf && nome && endereco && numero && bairro && cidade && uf && cep) {
                const cliente = new Cliente(cpf, nome, endereco, numero, bairro, cidade, uf, cep);
                // Resolve a promise
                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do cliente conforme a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um cliente!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf) {
                const cliente = new Cliente(cpf);
                // Resolve a promise
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o cpf do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um cliente!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaClientes) => {
                resposta.json(
                    {
                        status: true,
                        listaClientes
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os clientes: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar clientes!"
            });
        }
    }
}
