import express from 'express';
import rotaCategoria from './rotas/rotaCategoria.js';
import rotaFornecedor from './rotas/rotaFornecedor.js';
import rotaProduto from './rotas/rotaProduto.js';
import rotaCliente from './rotas/rotaCliente.js';
import rotaFornProd from './rotas/rotaFornProd.js';
import cors from 'cors';

const host = "0.0.0.0";
const porta = 4000;
//aplicação HTTP pronta, bastando parametrizá-la
const app = express();
app.use(cors({origin:"*"}));
//preparar a app para entender o formato JSON
app.use(cors({origin:'*'}));
app.use(express.json());
app.use('/categoria',rotaCategoria);
app.use('/produto',rotaProduto);
app.use('/fornecedor', rotaFornecedor);
app.use('/cliente',rotaCliente);
app.use('/produtoFornecedor',rotaFornProd);

app.listen(porta,host, ()=>{
    console.log(`API do sistema em execução: ${host}:${porta}`);
});