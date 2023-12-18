import FornProdDAO from "../persistencia/fornProdDAO.js";

export default class FornProd{
    #fornecedor;
    #produto;

    constructor(fornecedor={}, produto={}){
        this.#fornecedor=fornecedor,
        this.#produto = produto
    }

    get fornecedor(){
        return this.#fornecedor;
    }
    set fornecedor(novoFornecedor){
        this.#fornecedor = novoFornecedor;
    }

    get produto(){
        return this.#produto;
    }

    set produto(novoProduto){
        this.#produto=novoProduto;
    }

    toJSON(){
        return{
            fornecedor:this.#fornecedor,
            produto: this.#produto
        }
    }

    async gravar(){
        const fornProdDAO = new FornProdDAO();
        await fornProdDAO.gravar(this);
        }
    
        async excluir(){
        const fornProdDAO = new FornProdDAO();
        await fornProdDAO.excluir(this);
        }
    
        async atualizar(){
        const fornProdDAO = new FornProdDAO();
        await fornProdDAO.atualizar(this);
        }
    
        async consultar(termo){
        const fornProdDAO = new FornProdDAO();
        return await fornProdDAO.consultar(termo);
        }
}