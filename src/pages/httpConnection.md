---
title: "Http connection"
date: "2019-01-16"
---

## http connection between server and client

twittler는 client앱이었다.

chatterbox는 하나의 서버에 여러개의 클라이언트가 있는 앱

서버의 역할

1. 메시지를 저장 - 클라이언트의 요청에 의해 서버에 저장
2. 저장된 메세지를 뿌려줌 - 요청에 대한 응답 표시

클라이언트

1. 터미널의 역할을 수행
2. 사용자 입력을 주로 수행
3. 서버에 대한 응답을 화면에 표시

전통적인 http통신은 요청이 있어야만 응답이 있다.

그리고 요청이 성공을 했든 실패를 했든 응답은 준다.

발전된 http는 요청여러개에 응답여러개도 준다.

push technollogy까지도 찾아보기

http request methods

GET은 정보를 가져오는 것을 요청하는 method

POST는 정보를 쓰는 것을 요청하는 method

PUT은 정보를 업데이트 하는 것을 요청하는 method

- PUT과 PATCH의 차이는 PUT은 DB에 새로운 row를 추가하는 것이라면 PATCH는 row의 한 값만을 update하는 method이다.

DELETE는 정보의 삭제를 요청하는 method

post는 payload가 담김

400번대 에러는 클라이언트의 에러

500번대는 서버의 잘못으로 에러

get요청 확인은 주소창에서 확인가능

http 요청 테스트는 postman 이라는 tool로 확인을 할 수가 있다.

fetch 사용하는 방법은 mdn 참고하기

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
