# Spring Examples

Este repositório contém exemplos práticos de microsserviços utilizando o ecossistema Spring Cloud, com foco em comunicação entre serviços, tolerância a falhas, rastreamento distribuído e service discovery.

## 📁 Projetos incluídos

### 1. `spring-boot-eureka-ribbon-server-config`
Exemplo de aplicação com:
- Spring Boot
- Eureka (Service Discovery)
- Ribbon (Client-Side Load Balancer)
- Spring Cloud Config Server

### 2. `spring-boot-sleuth-zipkin-hystrix` *(realocado)*
Demonstra:
- Spring Cloud Sleuth para rastreamento de requisições
- Zipkin para visualização de traces
- Hystrix para circuit breaker (resiliência)

### 3. `spring-cloud-openfeign/rest-feign` *(realocado)*
Integração com:
- OpenFeign para chamadas REST entre microsserviços
- Estrutura RESTful com suporte a fallback

> **Nota:** Os projetos 2 e 3 foram realocados, veja as instruções dentro de cada pasta para o novo local (se aplicável).

---

## ✅ Pré-requisitos

- Java 8 ou superior
- Maven 3.x
- Docker (caso deseje subir Zipkin ou outros serviços de apoio)

## ▶️ Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/DenisSMoreira/spring-examples.git
   cd spring-examples
