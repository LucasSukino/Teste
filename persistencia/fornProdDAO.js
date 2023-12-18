import FornProd from "../modelo/fornProd.js";
import conectar from "./conexao.js";

export default class FornProdDAO {
    async gravar(fornProd) {
        try {
            if (fornProd instanceof FornProd) {
                console.log(fornProd.fornecedor.cnpj,fornProd.produto.codigo)
                const sql = `INSERT INTO fornecedor_produto(forn_cnpj, prod_codigo) VALUES(?,?)`;
                const parametros = [fornProd.fornecedor.cnpj, fornProd.produto.codigo];
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error('Erro ao gravar associação fornecedor-produto:', erro.message);
            throw erro;
        }
    }

    async atualizar(fornProd) {
        try {
            if (fornProd instanceof FornProd) {
                const sql = `UPDATE fornecedor_produto SET prod_codigo = ? WHERE forn_cnpj = ?`;
                const parametros = [fornProd.produto.codigo, fornProd.fornecedor.cnpj];
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error('Erro ao atualizar associação fornecedor-produto:', erro.message);
            throw erro;
        }
    }

    async excluir(fornProd) {
        try {
            if (fornProd instanceof FornProd) {
                const sql = "DELETE FROM fornecedor_produto WHERE forn_cnpj = ? AND prod_codigo = ?";
                const parametros = [fornProd.fornecedor.cnpj, fornProd.produto.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error('Erro ao excluir associação fornecedor-produto:', erro.message);
            throw erro;
        }
    }

    async consultar(parametroConsulta) {
        try {
            
            let sql = '';
            let parametros = [];
            if(parametroConsulta != ''){
            if (/^\{14}$/.test(parametroConsulta)) {
                // Consultar pelo CNPJ do fornecedor
                sql = 'SELECT * FROM fornecedor_produto WHERE forn_cnpj = ? ORDER BY forn_nome';
                parametros = [parametroConsulta];
            } else if (!isNaN(parseInt(parametroConsulta))) {
                // Consultar pelo código do produto
                sql = 'SELECT * FROM fornecedor_produto WHERE prod_codigo = ? ORDER BY prod_codigo';
                parametros = [parametroConsulta];
            }
        }else{
            sql = "SELECT * FROM fornecedor_produto"
        }
            const conexao = await conectar();
            const [registros, campos] = await conexao.execute(sql, parametros);
            let listaFornProdutos = [];
            for (const registro of registros) {
                const uso={
                    fornecedor:{
                        cnpj:registro.forn_cnpj
                    },
                    produto:{
                        codigo:registro.prod_codigo
                    }
                }
                const fornProd = new FornProd(uso.fornecedor,uso.produto);
                listaFornProdutos.push(fornProd);
            }
            return listaFornProdutos;
        } catch (erro) {
            console.error('Erro ao consultar associação fornecedor-produto:', erro.message);
            throw erro;
        }
    }
}