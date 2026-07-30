# Dockerfile — Backend Spring Boot Java 17 (TechMind)
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copiar configuración Maven y código fuente
COPY backend/api/mvnw .
COPY backend/api/.mvn .mvn
COPY backend/api/pom.xml .
COPY backend/api/src src

# Sanitizar saltos de línea de Windows (CRLF -> LF), dar permisos de ejecución y compilar jar
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw && ./mvnw package -DskipTests

# Etapa 2 — Imagen liviana de ejecución
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
