# Usamos Node.js 18 como base
FROM node:18

# Cambiamos a un usuario no root para evitar problemas de permisos con el puerto 80
USER root

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm y instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Vite en modo desarrollo con el puerto 80
CMD ["npm", "run", "dev"]