# APP

GymPass style app.

## Requisitos Funcionais
São as funcionalidades da aplicação, o que o usuário poderá fazer na aplicação

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível o validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## Regras de Negócio
São os caminhos que cada requisito pode tomar, sempre estará associado a um requisito funcional

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## Requisitos Não Funcionais
São os requisitos que não partem do cliente, são muito mais técnicos em nível de funcionalidade

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam esstar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por JWT (JSON Web Token)