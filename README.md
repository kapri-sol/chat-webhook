# chat-webhook

kakao 같은 챗봇의 웹훅에서는 http post 요청으로 body에 모든 정보를 다 담아서 전달해 준다. 일반적으로 mvc 패턴의 controller에서는 경로를 기준으로 요청을 나누어 구성하지만, 챗봇의 웹훅에서는 요청 경로도 요청 함수도 한정되기 때문에 요청을 나누기 힘들다. 따라서 nest.js를 활용해서 챗봇 요청을 나누는 템플릿을 만들게 되었다.

## 템플릿 구조

카카오에서 post로 body에 block 정보를 보내준다. block에 따라서 요청들을 라우팅 한다.

### middleware

body에 있는 intentId로 url을 변경해서 새로운 경로로 라우팅해준다.

### controller

KakaoController라는 새로운 controller를 생성해서 intentId에 따른 요청을 처리한다.

