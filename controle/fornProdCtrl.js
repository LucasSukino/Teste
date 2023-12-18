import FornProd from "../modelo/fornProd.js";

export default class FornProdCtrl{
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            try {
                const dados = requisicao.body;
                const fornecedorData = dados.fornecedor;
                const produtoData = dados.produto;
                if (fornecedorData && produtoData) {
                    const fornecedorProduto = new FornProd(fornecedorData, produtoData);
                    fornecedorProduto.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Associação feita com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, forneça os dados da associação!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar a associação:" + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma associação!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const fornecedorData = dados.fornecedor;
            const produtoData = dados.produto;
            if (fornecedorData && produtoData) {
                const fornecedorProduto = new FornProd(fornecedorData, produtoData);
                fornecedorProduto.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Associação atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a associação:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados necessários da associação!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma associação!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const fornecedorData = dados.fornecedor;
            const produtoData = dados.produto;
            if (fornecedorData && produtoData) {
                const fornecedorProduto = new FornProd(fornecedorData, produtoData);
                fornecedorProduto.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Associação excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a associação:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CNPJ da fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma associação!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || "";
        if(!termo){
            termo = "";
        }
        console.log(termo)
        if (requisicao.method === "GET") {
           
                const fornProd = new FornProd();
                fornProd.consultar(termo).then((listaFornProdutos)=>{
                    resposta.json({
                        status: true,
                        listaFornProdutos
                    });
                })
            .catch ((erro)=>{
                resposta.json({
                
                    status: false,
                    mensagem: "Não foi possível obter as associações: " + erro.message
                }
                );
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar associações!"
            });
        }
    }
}