FROM gradle:8.11.1-jdk-21-and-23-jammy AS build
WORKDIR /usr/app/

COPY build.gradle settings.gradle /gradle ./
COPY src ./src

RUN gradle clean build -x test

FROM eclipse-temurin:21-jre AS runtime

ENV APP_HOME=/usr/app/
ENV JAR_NAME=app.jar

WORKDIR $APP_HOME

COPY --from=build $APP_HOME/build/libs/*.jar $JAR_NAME

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]