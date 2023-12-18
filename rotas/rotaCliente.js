import { Router } from "express";
import ClienteCtrl from "../controle/clienteCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const cliCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente
.get('/',cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)
.post('/',cliCtrl.gravar)
.patch('/',cliCtrl.atualizar)
.put('/',cliCtrl.atualizar)
.delete('/',cliCtrl.excluir);

export default rotaCliente;