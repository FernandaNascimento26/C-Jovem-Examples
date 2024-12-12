adicionarItem('Arroz', 2, 5.5);
adicionarItem('Feijão', 1, 7.0);
adicionarItem('Arroz', 1, 5.5);

exibirCarrinho();
/* 
Saída:
1. Arroz - Quantidade: 3, Preço Unitário: R$ 5.50, Subtotal: R$ 16.50
2. Feijão - Quantidade: 1, Preço Unitário: R$ 7.00, Subtotal: R$ 7.00
Valor Total: R$ 23.50
*/

removerItem('Feijão');
exibirCarrinho();
/* 
Saída:
1. Arroz - Quantidade: 3, Preço Unitário: R$ 5.50, Subtotal: R$ 16.50
Valor Total: R$ 16.50
*/

aplicarDesconto('DESC10');
/* 
Saída:
Desconto de 10% aplicado. Novo valor total: R$ 14.85
*/
