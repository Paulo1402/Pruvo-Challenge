# Páginas

* Páginas com (login required) devem redirecionar para /login caso usuário não esteja autenticado

## / (login required) 
Listar provas do usuário

## /login
Autenticar usuário

## /novo (login required)
Criar nova prova

## /atualizar/:id (login required)
Atualizar prova

## /prova/:id (login required)
Ver prova

# Firestore

## Estrutura
- users (collection)
  - [USER_ID] (document)
    - tests (subcollection)
      - [TEST_ID] (document)
        - name: string
        - content: string
        - createdAt: timestamp
        - updatedAt: timestamp
