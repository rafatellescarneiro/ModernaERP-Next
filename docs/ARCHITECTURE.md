# Moderna ERP - Arquitetura do Sistema

## Objetivo

O Moderna ERP é uma plataforma modular para gerenciamento do processo de cadastro de produtos para e-commerce e marketplaces.

O sistema deve ser independente da tecnologia de armazenamento, permitindo utilizar Google Sheets, Excel, SQLite, PostgreSQL ou APIs sem alterar as regras de negócio.

---

# Princípios

## 1. Separação de Responsabilidades

Cada módulo possui apenas uma responsabilidade

Nenhuma classe poderá possuir responsabilidades de outro módulo.

---

## 2. Independência do Banco de Dados

Nenhuma regra de negócio poderá acessar diretamente:

- Google Sheets
- Excel
- SqLite
- PostgreSQL
- APIs

Tood acesso deverá ocorrer através de Repositories.

---

## 3. Independência da Interface

O sistema poderá funcionar em:

- Desktop
- Navegador
- Linha de Comando
- API

As regras de negócio nunca dependerão da interface

---

## 4. Arquitetura Modular

Cada módulo deverá ser independente

Exemplos:

- Produto
- Operação
- Marketplace
- Pesquisa
- Dashboard
- IA
- Imagem
- Procode

---

- Produto
- Operação
- Pesquisa
- Dashboard
- IA
- Imagem
- Procode

---

## 5. Testabilidade

Toda regra de negócio deverá possuir testes unitarios.

---

## 6. Baixo Acoplamento

Nenhum módulo poderá depender diretamente de outro módulo.

Toda comunicação deverá ocorrer através de interfaces ou eventos.

---

## 7. Escabilidade

Novos módulos deverão ser adicionados sem alterar módulos existentes.

---

## 8. Código Limpo

Todo código deverá seguir os princípios:

- SOLID
- Clean Code
- Clean Architecture

---

# Fluxo de Aplicação

UI

↓

Presentation

↓

Application

↓

Domain

↓

Infrastructure

↓

Banco de Dados

Nunca será permitido pular uma camada.

---

# Tecnologias

Linguagem:
- TypeScript

Build:
- Vite

Desktop:
- Electron (futuro)

Testes:
- Viteste

Bancos futuros:
- Excel
- SQLite
- PostgreSQL

Integrações:
- Python
- APIs




