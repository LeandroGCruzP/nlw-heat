# Backend

As dependencias que o projeto esta sujieto são

### Dependencias
~~~powershell
yarn add express
~~~

~~~powershell
yarn add axios
~~~

~~~powershell
yarn add @prisma/client
~~~

~~~powershell
yarn add dotenv
~~~

~~~powershell
yarn add jsonwebtoken
~~~

~~~powershell
yarn add socket.io
~~~

~~~powershell
yarn add cors
~~~

### Dependencias de desenvolvimento
~~~powershell
yarn add -D @types/express
~~~

~~~powershell
yarn add -D typescript
~~~

~~~powershell
yarn add -D ts-node-dev
~~~

~~~powershell
yarn add -D @types/axios
~~~

~~~powershell
yarn add -D @types/cors
~~~

~~~powershell
yarn add prisma-erd-generator @mermaid-js/mermaid-cli @prisma/generator-helper@^3.0.0
~~~

~~~powershell
yarn add -D @types/socket.io
~~~

~~~powershell
yarn add -D @types/cors
~~~

### Comando para realizar ações no projeto
##### Inicializar typescript
~~~powershell
yarn tsc --init
~~~
##### Inicializar prisma
~~~powershell
yarn prisma init
~~~
##### Criar | Gerar migrate
~~~powershell
yarn prisma migrate dev
~~~
##### Abrir prisma studio
~~~powershell
yarn prisma studio
~~~
##### Criar uma imagem svg da base de dados
~~~powershell
yarn prisma generate
~~~

> Alerta: Para fazer novas instalações de pacotes não pode estar executando o prisma studio no console

### Criar um .env
As variaveis que devem vir aqui são
~~~env
GITHUB_CLIENT_SECRET=teu_github_client_secret (Se gera nas settings do github como dev)
GITHUB_CLIENT_ID=teu_github_client_id (Se procura nas settings do github como dev)

JWT_SECRET=teu_jwt_secret(qualquer combinação de letras e numeros)
~~~
