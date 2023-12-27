#!/bin/bash

#if ! docker image inspect petclinic:test &>/dev/null; then
#	git clone https://github.com/spring-projects/spring-petclinic.git
#fi

cd spring-petclinic
git stash push --include-untracked -m "auto stash"
cp ../files/rewrite.yml ../files/versions-rules.xml .
cp ../files/application-o11y.yaml ../files/logback-spring.xml src/main/resources
./mvnw -U org.openrewrite.maven:rewrite-maven-plugin:run -Drewrite.activeRecipes=me.dtem.AddDependencies -Dcheckstyle.skip
./mvnw versions:update-properties -DincludeProperties="zipkin-reporter-brave.version,datasource-micrometer-spring-boot.version,logstash-logback-encoder.version,logbook.version" \
  -Dcheckstyle.skip
./mvnw package spring-boot:build-image -DskipTests -Dspring-boot.build-image.imageName="petclinic":"test" -Dcheckstyle.skip

