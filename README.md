# chat-webhook

kakao 같은 챗봇의 웹훅에서는 http post 요청으로 body에 모든 정보를 다 담아서 전달해 준다. 일반적으로 mvc 패턴의 controller에서는 경로를 기준으로 요청을 나누어 구성하지만, 챗봇의 웹훅에서는 요청 경로도 요청 함수도 한정되기 때문에 요청을 나누기 힘들다. 따라서 nest.js를 활용해서 챗봇 요청을 나누는 템플릿을 만들게 되었다.

## 목차

[템플릿 구조](#템플릿-구조)

- [middleware](#middleware)
- [controller](#controller)

[배포방식](#배포-방식)

- [chat-webhook](#chat-webhook)
  - [목차](#목차)
  - [템플릿 구조](#템플릿-구조)
    - [middleware](#middleware)
    - [controller](#controller)
  - [배포 방식](#배포-방식)
    - [빌드](#빌드)
    - [배포](#배포)
      - [이미지 다운로드](#이미지-다운로드)
      - [서버 실행](#서버-실행)
      - [이미지 제거](#이미지-제거)

## 템플릿 구조

카카오에서 post로 body에 block 정보를 보내준다. block에 따라서 요청들을 라우팅 한다.

### middleware

body에 있는 intentId로 url을 변경해서 새로운 경로로 라우팅해준다.

### controller

KakaoController라는 새로운 controller를 생성해서 intentId에 따른 요청을 처리한다.

## 배포 방식

테스트를 위해서 간단하게 약식으로 만들었다.

google cloud platform을 활용해서 docker 이미지를 생성하고 저장한다.

### 빌드

docker 이미지는 goolge cloud platform의 cloudbuild를 사용한다.

    ./build

### 배포

#### 이미지 다운로드

docker pull을 이용해서 google cloud storage에 저장된 docker image를 다운받는다.

    docker pull us-central1-docker.pkg.dev/automatic-opus-355008/default/chat-webhook:latest

#### 서버 실행

docker compose를 이용해서 서버를 실행한다.

    docker-compose up

docker compose를 이용해서 서버를 종료한다.

    docker-compose down

#### 이미지 제거

새로운 이미지를 이용해서 배포하려면 기존에 저장된 이미지를 제거해야한다.

    docker rmi us-central1-docker.pkg.dev/automatic-opus-355008/default/chat-webhook:latest
