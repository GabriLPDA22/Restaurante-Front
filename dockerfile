# Usamos Node.js 18 como base
FROM node:18

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm y instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto de Vite (5173 por defecto)
EXPOSE 5173

# Comando para ejecutar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
