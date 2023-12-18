import Fornecedor from "../modelo/fornecedor.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class FornecedorDAO{
    async gravar(fornecedor){
        if (fornecedor instanceof Fornecedor){
        const sql = "INSERT INTO fornecedor(forn_cnpj, forn_nome, forn_endereco, forn_bairro,forn_cidade, forn_uf, forn_cep) VALUES(?,?,?,?,?,?,?)";
                const parametros = [
                    fornecedor.cnpj,
                    fornecedor.nome,
                    fornecedor.endereco,
                    fornecedor.bairro,
                    fornecedor.cidade,
                    fornecedor.uf,
                    fornecedor.cep
                ];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const sql = "UPDATE fornecedor SET forn_nome = ?, forn_endereco = ?, forn_bairro = ?,forn_cidade = ?, forn_uf = ?, forn_cep = ? WHERE forn_cnpj = ?"; 
            const parametros = [fornecedor.nome, fornecedor.endereco, fornecedor.bairro, fornecedor.cidade,
            fornecedor.uf, fornecedor.cep, fornecedor.cnpj];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const sql = "DELETE FROM fornecedor WHERE forn_cnpj = ?"; 
            const parametros = [fornecedor.cnpj];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    
    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        
        if (/^\d{14}$/.test(parametroConsulta)) {
            // Consultar pelo CNPJ do fornecedor
            sql = 'SELECT * FROM fornecedor WHERE forn_cnpj = ? ORDER BY forn_nome';
            parametros = [parametroConsulta];
        } else {
            // Consultar pelo nome do fornecedor
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = 'SELECT * FROM fornecedor WHERE forn_nome LIKE ? ORDER BY forn_nome';
            parametros = ['%' + parametroConsulta + '%'];
        }
    
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const registro of registros) {
            const fornecedor = new Fornecedor(
                
                registro.forn_cnpj,
                registro.forn_nome,
                registro.forn_endereco,
                registro.forn_bairro,
                registro.forn_cidade,
                registro.forn_uf,
                registro.forn_cep
            );
            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }  

}