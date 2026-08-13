# ADR-004

## Título

Arquitetura do módulo Produtos

---

## Status

Aceita

---

## Contexto

O módulo Produtos será o primeiro módulo operacional do Moderna ERP.

Ele servirá como modelo para os demais módulos.

---

## Decisão

Todo acesso aos produtos ocorrerá através de:

UI

↓

Service

↓

Repository

↓

Provider

↓

Data Source

---

## Consequências

- desacoplamento da interface

- facilidade para trocar a origem dos dados

- maior facilidade para testes

- reutilização da regra de negócio
