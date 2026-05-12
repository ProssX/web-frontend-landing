# Etapa 1: Construcción (Build)
FROM node:22-alpine AS build

WORKDIR /app

# Copiamos solo los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Forzamos la instalación limpia para Linux
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos la aplicación para producción
RUN npm run build

# Etapa 2: Producción (Serve)
FROM nginx:alpine

# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos generados en la etapa anterior (desde /app/dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]