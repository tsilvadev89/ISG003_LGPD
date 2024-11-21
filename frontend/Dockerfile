# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar apenas os arquivos necessários para o build
COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

# Etapa 2: Configurar o servidor Nginx
FROM nginx:stable-alpine

# Copiar os arquivos construídos para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx no primeiro plano
CMD ["nginx", "-g", "daemon off;"]
