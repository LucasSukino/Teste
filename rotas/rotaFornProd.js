import { Router } from "express";
import FornProdCtrl from "../controle/fornProdCtrl.js";

const fornProdCtrl = new FornProdCtrl();
const rotaFornProd = new Router();

rotaFornProd
.get('/', fornProdCtrl.consultar)
.get('/:termo', fornProdCtrl.consultar)
.post('/', fornProdCtrl.gravar)
.patch('/', fornProdCtrl.atualizar)
.put('/', fornProdCtrl.atualizar)
.delete('/', fornProdCtrl.excluir);

export default rotaFornProd;