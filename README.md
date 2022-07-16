
# Labenu Music Awards

Nesse projeto foi desenvolvido um sistema para gerenciamento de festival de musica chamado **LAMA**

Foram desenvolvidos os endpoints:

### Cadastro: 
Em que o usuario se loga automaticamente com um token de acesso, o usuário pode ser do tipo Normal ou 
Admin que é reservado aos administradores do sistema

### Login
Permite usuario acessar o sistema com um token de autenticação com prazo definido

### Registrar banda
Permite registar uma banda no sistema, sendo que somente usuarios administradores podem usar esse endpoint
Foram feitos 2 testes unitarios, um de sucesso do registro outro de falha

### Detalhes sobre a banda 
Permite o usuario ter acesso as informações da banda salvos no banco de dados,
precisa informar nome ou id da banda.
Qualquer usuário logado tem acesso

### Adicionar um show a um dia
Permite cadastrar o show em um dos dias dos evento 'Friday' , 'Saturday' or 'Sunday'
não é permitido cadastrar um show em mesmo horario de um show cadastrado anteriormente, considerando horario de inicio e de fim
Serão aceitos show durante o periodo das 8 as 23 horas
Caso o cadastro não atenda aos requesitos retorna uma mensagem de erro.
Foram feitos 2 testes unitarios, um de sucesso do registro outro de falha

### Pegar todos os shows de uma data
Permite ter acesso a lista de shows cadastrados no dia que desejar.

Documentação dos Endpoints criados:
https://documenter.getpostman.com/view/20352107/UzQvsjcc
