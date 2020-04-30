---
title: "Http connection"
date: "2019-01-16"
---

## http connection between server and client

**이번 Sprint(채팅 웹페이지)에서 서버의 역할**

1. 메시지를 저장 - 클라이언트의 요청에 의해 서버에 저장
2. 저장된 메세지를 뿌려줌 - 요청에 대한 응답 표시

**이번 Sprint에서 클라이언트의 역할**

1. 터미널의 역할을 수행
2. 사용자 입력을 주로 수행
3. 서버에 대한 응답을 화면에 표시

전통적인 http 통신은 요청이 있어야만 응답이 있다.
그리고 요청이 성공을 했든 실패를 했든 응답은 준다.
발전된 http는 요청여러개에 응답여러개도 줄 수가 있다.

\*_참고_: push technollogy라는 것이 있는데, 우리가 일반적으로 사용하는 전송요청이 클라이언트에서 시작되는 pull technollogy와 상반되는 개념이다. 이는 중앙 서버에서 전송 요청이 시작되는 정보 전달 방식이다.

#### http request methods

- GET은 정보를 가져오는 것을 요청하는 method
- POST는 정보를 쓰는 것을 요청하는 method
- PUT은 정보를 업데이트 하는 것을 요청하는 method
- DELETE는 정보의 삭제를 요청하는 method

_참고_: PUT과 PATCH의 차이는 PUT은 DB에 새로운 row를 추가하는 것이라면 PATCH는 row의 한 값만을 update하는 method이다.

post는 payload가 담김
400번대 에러는 클라이언트의 에러
500번대는 서버의 잘못으로 에러

#### http request 확인 방법

- 특정 route에 대해서 get요청을 확인해보고 싶으면 브라우저에서 특정 endpoint로 접속해보면 get요청이 server로 가게 되고 확인할 수 있다.
- http 요청 테스트는 postman 이라는 tool로 확인을 할 수가 있다.

_fetch 사용하는 방법은 mdn 참고하기_
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
