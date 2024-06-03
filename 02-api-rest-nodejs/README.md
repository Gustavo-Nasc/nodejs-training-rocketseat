# Aplicação
Aplicação de Controle de Transações pessoais, podendo ser de débito, crédito

## Requisitos Funcionais
- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

## Regras de Negócio
- [x] A transação pode ser do tipo crédito, que somará ao valor total, ou débito, que subtrairá;
- [ ] Deve ser possível identificarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações o qual ele criou;

## Testes
### Testes Unitários
Testar, exclusivamente, uma unidade da aplicação, uma pequena parte, de forma isolada. Exemplo:
- Testar uma função cuja função seja realizar a formatação de uma data, onde você passa um parâmetro e nela você realiza a formatação da data

### Testes de Integração
Testar a comunicação entre duas ou mais unidades, testar como vários pedaços da aplicação trabalham juntos

### Testes E2E (Ponta a ponta)
Simulam um usuário operando na aplicação, como se a aplicação estivesse em produção, não dependem de tecnologia

#### Pirâmide de Testes
É recomendado que se tenha mais testes unitários e testes de integração do que testes E2E
