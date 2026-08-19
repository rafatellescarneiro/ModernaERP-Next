# Button

## Objetivo

Componente padrão de botão utilizado em todo o Moderna ERP.

Este componente centraliza o comportamento visual e funcional dos botões da aplicação, garantindo consistência entre todos os módulos.

---

## Localização

src/shared/components/Button

---

## Propriedades

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| children | ReactNode | Sim | Conteúdo do botão |
| variant | "primary" \| "secondary" \| "danger" | Não | Define o estilo do botão |
| loading | boolean | Não | Exibe estado de carregamento |
| disabled | boolean | Não | Desabilita o botão |

---

## Variantes

### Primary

Botão principal do sistema.

Utilizado para:

- Salvar
- Confirmar
- Criar
- Avançar

---

### Secondary

Botão de ações secundárias.

Utilizado para:

- Cancelar
- Voltar
- Editar

---

### Danger

Utilizado apenas para ações destrutivas.

Exemplo:

- Excluir
- Remover
- Limpar dados

---

## Exemplo

```tsx
<Button>

Salvar

</Button>

<Button variant="secondary">

Cancelar

</Button>

<Button
variant="danger">

Excluir

</Button>
