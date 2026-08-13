# Módulo Produtos

## Objetivo

Este módulo é responsável por todo o gerenciamento dos produtos cadastrados no Moderna ERP.

Inicialmente utilizará dados simulados (Mock).

Posteriormente será integrado ao Excel.

No futuro utilizará SQLite e poderá sincronizar com APIs externas.

---

## Responsabilidades

- Cadastro
- Pesquisa
- Atualização
- Exclusão
- Histórico
- Status do fluxo
- Integração com Marketplaces

---

## Estrutura

components/

Componentes específicos do módulo.

---

pages/

Páginas do módulo.

---

services/

Regras de negócio.

---

repositories/

Comunicação com a origem dos dados.

---

providers/

Implementação da origem dos dados.

---

types/

Interfaces e modelos.

---

data/

Dados simulados.

---

## Fluxo

Página

↓

Service

↓

Repository

↓

Provider

↓

Fonte de Dados

---

## Evolução

v0.1

Mock

v0.2

Excel

v0.3

SQLite

v1.0

API
