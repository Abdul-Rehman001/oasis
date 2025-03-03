FROM restarauntwebsite:latest
WORKDIR /app
COPY . .

RUN npm install serve@14.2.4

EXPOSE 3000
CMD ["npx", "serve", "out"]


