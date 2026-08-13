# ProductSearch

Campo de pesquisa do módulo Produtos.

## Objetivo

Permitir pesquisa por:

- Código
- SKU

## Responsabilidade

Apenas capturar o termo informado pelo usuário.

A regra de pesquisa pertence ao `ProductService`.

## Não deve

- acessar Repository;
- acessar Provider;
- realizar chamadas de API;
- conter regra de negócio.
