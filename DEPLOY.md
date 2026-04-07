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
5. Selecione a branch **`claude/barbershop-website-template-zRO0u`**

### 3. Adicionar banco de dados PostgreSQL

> **IMPORTANTE:** Faça isso ANTES do primeiro deploy para que o build tenha acesso ao banco.

1. Dentro do projeto, clique em **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. O Railway cria o banco e define automaticamente a variável `DATABASE_URL`
3. Clique no **serviço PostgreSQL** → aba **"Variables"** → copie o valor de `DATABASE_URL`
4. Clique no **serviço do app** → aba **"Variables"** → adicione `DATABASE_URL` com o valor copiado

> **Ou mais fácil:** No serviço do app, em "Variables", clique "Add Variable Reference" e selecione o banco PostgreSQL. Isso vincula o `DATABASE_URL` automaticamente.

### 4. Configurar variáveis de ambiente

No **serviço do app** (não no banco), aba **"Variables"**, adicione:

| Variável | Valor |
|---|---|
| `DATABASE_URL` | (vinculada automaticamente do PostgreSQL - veja passo 3) |
| `MERCADOPAGO_ACCESS_TOKEN` | Seu Access Token do Mercado Pago |
| `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` | Sua Public Key do Mercado Pago |
| `NEXT_PUBLIC_BASE_URL` | `https://seu-app.up.railway.app` (atualizar com a URL gerada no passo 6) |
| `PORT` | `3000` |

> **Credenciais do Mercado Pago:**
> 1. Acesse [mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
> 2. Crie uma aplicação
> 3. Copie o Access Token e a Public Key das credenciais de **produção**
>
> Se não quiser pagamento agora, pode deixar como `TEST` - o site funciona, só redireciona para a página de sucesso direto.

### 5. Como o deploy funciona

O `railway.json` na raiz do projeto configura tudo automaticamente:

**Build (executa uma vez a cada deploy):**
1. `npm install` → instala dependências
2. `prisma generate` → gera o client do Prisma
3. `next build` → compila o Next.js (modo standalone)
4. `prisma db push` → cria/atualiza tabelas no PostgreSQL
5. `tsx prisma/seed.ts` → popula dados iniciais (só na 1ª vez, pula se já tem dados)

**Start (executa para servir o site):**
1. `node .next/standalone/server.js` → inicia o servidor Node.js

### 6. Gerar URL pública

1. Vá na aba **"Settings"** do serviço do app
2. Em **"Networking"** → **"Public Networking"**, clique em **"Generate Domain"**
3. O Railway gera uma URL tipo `seu-app.up.railway.app`
4. **Atualize** a variável `NEXT_PUBLIC_BASE_URL` com essa URL
5. O Railway fará redeploy automaticamente após alterar a variável
6. Acesse a URL - seu site estará no ar!

### 7. Domínio personalizado (opcional)

1. Na aba **"Settings"** → **"Public Networking"**
2. Clique em **"+ Custom Domain"**
3. Digite seu domínio (ex: `suabarbearia.com.br`)
4. O Railway mostra um registro **CNAME** para configurar
5. Configure o CNAME no painel do seu registrador de domínio
6. Após propagação do DNS (~5 min), o Railway gera SSL automaticamente
7. Atualize `NEXT_PUBLIC_BASE_URL` para `https://suabarbearia.com.br`

---

## Deploy automático

O Railway faz **deploy automático** toda vez que você faz push na branch configurada.

Para alterar a branch de deploy:
1. Aba **"Settings"** → **"Source"**
2. Mude para a branch desejada

---

## Troubleshooting

### Erro: "Can't reach database server"
- Verifique se o PostgreSQL foi adicionado ao projeto
- Verifique se `DATABASE_URL` está nas variáveis do serviço do app
- Clique em "Redeploy" após adicionar a variável

### Erro: "relation does not exist"
- O `prisma db push` pode não ter rodado. Vá em **"Deployments"** → clique no deploy → veja os logs de build
- Se necessário, abra o terminal do Railway e execute: `npx prisma db push && npx tsx prisma/seed.ts`

### Site carrega mas sem serviços/barbeiros
- O seed pode não ter rodado. Verifique nos logs de build se aparece `[seed] Created X services`
- Se não, abra o terminal do Railway e execute: `npx tsx prisma/seed.ts`

### Pagamento não funciona
- Verifique se `MERCADOPAGO_ACCESS_TOKEN` está configurado com o token real (não o de teste)
- Verifique se `NEXT_PUBLIC_BASE_URL` está correto (com https://)

---

## Monitoramento

- **Logs**: Clique no serviço → aba **"Logs"** para ver logs em tempo real
- **Métricas**: Aba **"Metrics"** mostra uso de CPU, memória e rede
- **Deployments**: Aba **"Deployments"** mostra histórico de deploys

---

## Custos

- **Trial**: US$5 de crédito grátis (sem cartão de crédito)
- **Starter**: US$5/mês com US$5 de crédito incluso
- **Este projeto** consome aprox. US$2-4/mês (app + PostgreSQL)

---

## Desenvolvimento local

Para rodar localmente com Docker:

```bash
docker compose up -d                    # inicia PostgreSQL local
cp .env.example .env                    # cria arquivo de configuração
# edite .env com: DATABASE_URL="postgresql://barbearia:barbearia123@localhost:5432/barbearia"
npm install                             # instala dependências
npm run db:setup                        # cria tabelas + dados iniciais
npm run dev                             # inicia em http://localhost:3000
```
