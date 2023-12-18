import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorCtrl {
    
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            console.log(dados)
            const cnpj = dados.cnpj;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            if (cnpj && nome && endereco && endereco && bairro && cidade && uf && cep){
                const fornecedor = new Fornecedor(cnpj, nome, endereco, bairro, cidade, uf, cep);
                //resolver a promise
                fornecedor.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a fornecedor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma categoria!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            if (cnpj && nome && endereco && endereco && bairro && cidade && uf && cep) {
                const fornecedor = new Fornecedor(cnpj, nome, endereco, bairro, cidade, uf, cep);
                //resolver a promise
                fornecedor.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o fornecedor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados necessários do fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma fornecedor!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            if (cnpj) {
                const fornecedor = new Fornecedor(cnpj);
                //resolver a promise
                fornecedor.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a fornecedor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma categoria!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const categoria = new Fornecedor();
            categoria.consultar(termo).then((listaFornecedores)=>{
                resposta.json(
                    {
                        status:true,
                        listaFornecedores
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os fornecedores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar fornecedores!"
            });
        }
    }
}
