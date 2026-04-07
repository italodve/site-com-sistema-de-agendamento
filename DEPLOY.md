# Deploy no Railway

## Passo a passo

### 1. Criar conta no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **"Login"** e entre com sua conta do **GitHub**

### 2. Criar novo projeto

1. No dashboard, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Autorize o Railway a acessar seus repositórios
4. Escolha o repositório **`italodve/site-com-sistema-de-agendamento`**
5. O Railway vai detectar automaticamente que é um projeto Node.js

### 3. Adicionar banco de dados PostgreSQL

1. Dentro do projeto, clique em **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. O Railway cria o banco e define automaticamente a variável `DATABASE_URL`
3. Não precisa configurar nada manualmente!

### 4. Configurar variáveis de ambiente

1. Clique no **serviço do seu app** (não no banco)
2. Vá na aba **"Variables"**
3. Adicione as seguintes variáveis:

| Variável | Valor |
|---|---|
| `MERCADOPAGO_ACCESS_TOKEN` | Seu Access Token do Mercado Pago |
| `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` | Sua Public Key do Mercado Pago |
| `NEXT_PUBLIC_BASE_URL` | `https://seu-app.up.railway.app` (atualizar depois com o domínio real) |

> **Credenciais do Mercado Pago:**
> 1. Acesse [mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
> 2. Crie uma aplicação
> 3. Copie o Access Token e a Public Key das credenciais de **produção**

> **Nota:** A variável `DATABASE_URL` já é configurada automaticamente pelo Railway quando você adiciona o PostgreSQL. Não precisa adicionar manualmente.

### 5. Deploy automático

O Railway faz o deploy automaticamente após configurar as variáveis. O processo de build executa:

1. `npm install` - instala dependências
2. `prisma generate` - gera o client do Prisma
3. `prisma db push` - cria as tabelas no PostgreSQL
4. `next build` - compila o Next.js
5. `tsx prisma/seed.ts` - popula o banco com dados iniciais (só na primeira vez)

Aguarde o build finalizar (1-2 minutos).

### 6. Acessar o site

1. Vá na aba **"Settings"** do serviço
2. Em **"Networking"** → **"Public Networking"**, clique em **"Generate Domain"**
3. O Railway gera uma URL tipo `seu-app.up.railway.app`
4. Acesse a URL e seu site estará no ar!

### 7. Domínio personalizado (opcional)

1. Na aba **"Settings"** → **"Public Networking"**
2. Clique em **"+ Custom Domain"**
3. Digite seu domínio (ex: `suabarbearia.com.br`)
4. O Railway mostra um registro **CNAME** para configurar no DNS do seu domínio
5. Configure o CNAME no painel do seu registrador de domínio
6. Após propagação do DNS (~5 min), o Railway gera SSL automaticamente
7. Atualize `NEXT_PUBLIC_BASE_URL` para `https://suabarbearia.com.br`

---

## Deploy automático a cada push

O Railway faz **deploy automático** toda vez que você faz push na branch principal. Não precisa fazer nada manual.

Para alterar a branch de deploy:
1. Aba **"Settings"** → **"Source"**
2. Mude a branch para `claude/barbershop-website-template-zRO0u` ou `main`

---

## Monitoramento

- **Logs**: Clique no serviço → aba **"Logs"** para ver logs em tempo real
- **Métricas**: Aba **"Metrics"** mostra uso de CPU, memória e rede
- **Deployments**: Aba **"Deployments"** mostra histórico de deploys

---

## Custos

- **Trial**: US$5 de crédito grátis (sem cartão)
- **Starter**: US$5/mês com US$5 de crédito incluso
- **Este projeto** consome aprox. US$2-4/mês (app + PostgreSQL)
