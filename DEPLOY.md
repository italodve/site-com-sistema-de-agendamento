# Deploy na Hostinger VPS

## Pré-requisitos
- VPS Hostinger com Ubuntu 22.04+
- Acesso SSH ao servidor
- Domínio apontando para o IP do VPS (configurar DNS na Hostinger)

---

## 1. Acessar o VPS via SSH

```bash
ssh root@SEU_IP_DO_VPS
```

## 2. Instalar Node.js 20+

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # deve mostrar v20+
```

## 3. Instalar Nginx e PM2

```bash
sudo apt-get install -y nginx
sudo npm install -g pm2
```

## 4. Clonar o projeto

```bash
sudo mkdir -p /var/www
cd /var/www
git clone https://github.com/italodve/site-com-sistema-de-agendamento.git sua-barbearia
cd sua-barbearia
git checkout claude/barbershop-website-template-zRO0u
```

## 5. Instalar dependências e configurar

```bash
npm install
```

### Criar arquivo .env

```bash
nano .env
```

Cole o seguinte conteúdo (substitua os valores):

```env
DATABASE_URL="file:./prisma/prod.db"
MERCADOPAGO_ACCESS_TOKEN="SEU_ACCESS_TOKEN_AQUI"
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="SUA_PUBLIC_KEY_AQUI"
NEXT_PUBLIC_BASE_URL="https://seudominio.com.br"
```

> **Como obter as credenciais do Mercado Pago:**
> 1. Acesse https://www.mercadopago.com.br/developers
> 2. Crie uma aplicação
> 3. Copie o Access Token e a Public Key das credenciais de **produção**

### Configurar banco de dados

```bash
npm run db:setup
```

## 6. Build de produção

```bash
npm run build
```

## 7. Iniciar com PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # seguir as instruções para auto-start no boot
```

### Comandos úteis do PM2:
```bash
pm2 status              # ver status
pm2 logs sua-barbearia  # ver logs
pm2 restart sua-barbearia  # reiniciar
pm2 stop sua-barbearia     # parar
```

## 8. Configurar Nginx

### Copiar configuração

```bash
sudo nano /etc/nginx/sites-available/sua-barbearia
```

Cole o conteúdo do arquivo `nginx.conf.example`, substituindo `seudominio.com.br` pelo seu domínio real.

### Ativar o site

```bash
sudo ln -s /etc/nginx/sites-available/sua-barbearia /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # remover site padrão
sudo nginx -t  # testar configuração
sudo systemctl reload nginx
```

## 9. SSL com Let's Encrypt (HTTPS gratuito)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

O Certbot vai configurar o SSL automaticamente e renovar a cada 90 dias.

## 10. Configurar DNS na Hostinger

No painel da Hostinger:
1. Vá em **Domínios** → seu domínio → **DNS / Nameservers**
2. Adicione um registro **A** apontando para o IP do seu VPS:
   - Tipo: `A`
   - Nome: `@`
   - Valor: `IP_DO_SEU_VPS`
   - TTL: `3600`
3. Adicione outro registro **A** para `www`:
   - Tipo: `A`
   - Nome: `www`
   - Valor: `IP_DO_SEU_VPS`
   - TTL: `3600`

---

## Atualizando o site

Para atualizar após mudanças no código:

```bash
cd /var/www/sua-barbearia
git pull
npm install
npm run build
pm2 restart sua-barbearia
```

---

## Trocar para PostgreSQL (opcional, recomendado para produção)

1. Instalar PostgreSQL:
```bash
sudo apt-get install -y postgresql
sudo -u postgres createuser barbearia
sudo -u postgres createdb barbearia_db -O barbearia
sudo -u postgres psql -c "ALTER USER barbearia PASSWORD 'sua_senha_segura';"
```

2. Alterar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Alterar `.env`:
```env
DATABASE_URL="postgresql://barbearia:sua_senha_segura@localhost:5432/barbearia_db"
```

4. Rodar migrations:
```bash
npm run db:setup
npm run build
pm2 restart sua-barbearia
```
