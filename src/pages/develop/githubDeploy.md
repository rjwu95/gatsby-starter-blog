---
title: "Gatsby js deploy하는 방법(netlify, github page)"
date: "2019-03-25"
---

### Gatsby js

![](https://cdn-images-1.medium.com/max/1200/1*G9aVAI3aezHLw_JsiCfB1Q.jpeg)
먼저 Gatsby js가 낯선 사람들을 위한 간단한 소개를 하면, Gatsby js는 웹페이지를 만들 수 있는 아주 강력한 framework로 react를 사용하여 페이지를 빠르게 만들 수 있어 react에 익숙한 사람이면 매우 추천하는 tool이다. jekyll이라는 강력한 tool도 있지만 이는 ruby로 이루어져 있어 익숙치 않았다. 그래서 필자는 익숙하게 사용할 수 있는 Gatsby js를 선택하여 blog를 만들어 보기로 했다.

### deploy

Gatsby JS를 deploy하는 데에는 Gatsby 홈페이지에서 추천하는 여러가지 방법들이 있지만, 그 중에서도 사용한 방법들만 소개해 보기로 하겠다.

먼저 가장 편한 **Netlify**다.

Netlify는 솔직히 놀라울 정도로 편했다.

1. 홈페이지에 들어가서 본인의 Git 계정을 연결한다.
   ![](https://cdn.netlify.com/6cc161f3ced8f060296bc8aeacd7fb39e5159274/743e1/img/blog/create_link_repo.png)

2. 웹사이트로 만들고 싶은 repo를 정한다.
   ![](https://cdn.netlify.com/cd1582720ed9ca7c74d47fcb3a5330ef4e210633/813a3/img/blog/choose_repo.png)

3. 정적 페이지로 띄울 branch를 지정해주기만 하면 바로 새로운 도메인을 주고 deploy가 된다.
   ![](https://cdn.netlify.com/ca977361e618e38b818f045fc0fcbf856ec1124b/7dc39/img/blog/deploy_settings.png)

이렇게 간단한 Netlify의 장점이 한가지가 더 있었는데, 그것은 배포를 할 때 따로 build를 할 필요가 없다는 것이었다. 다른 tool은 배포를 할 때마다 build를 해야만 했는데 Netlify 같은 경우는 본인이 지정한 github repo branch에 push만 하면 자동으로 배포가 되는 시스템이었다. 어떤 원리로 동작하는지 아직은 모르겠지만 build를 하지 않는다는 점이 필자에겐 큰 충격이었다.

이런 Netlify에서 단점을 한가지만 꼽자면 도메인이 https://suspicious-pare-a66702.netlify.com/ 이처럼 예쁘게 나오지 않는다는 점이다.
그래서 한 번 시도해 본것이 github page이다.

**github pages**는 장점먼저 얘기하자면 다음과 같이 도메인이 github repo처럼 깔끔하게 나온다는 점이다. (https://rjwu95.github.io/gatsby-starter-blog/)

하지만 Netlify와 동작하는 모습이 매우 달랐는데,
먼저 github page를 사용하려면 다음과 같이 module을 하나 install 해야 한다.

```
npm install gh-pages --save-dev
```

다음으로는 package.json에 deploy를 만들어줘야 한다.

```JSON
{
  "scripts": {
    "deploy": "gatsby build --prefix-paths && gh-pages -d public"
  }
}
```

마지막으로 gatsby-config.js에 다음과 같이 reponame을 넣어주면 준비는 끝난다.

```javascript
module.exports = {
  pathPrefix: "/reponame",
}
```

위의 경우 동작하는 원리가 코드를 작성한 후 deploy를 하면 gatsby build가 실행되면서 public이라는 폴더가 생기고 그 곳에 정적 페이지가 만들어진다. 그리고 gh-pages라는 branch가 remote에 생기게 되는데 이 때 public에 있는 모든 내용물들이 gh-pages branch로 복사된다. 그 후 github repo의 source branch가 자동으로 gh-pages로 지정이되고 배포가 완료되는 구조이다.

필자는 build를 따로 하지 않아도 remote의 master branch를 알아서 웹사이트로 바꿔주는 Netlify와 build를 하고 정적 파일들을 gh-pages 라는 branch에 넣어서 보여주는 Github page에 색다름을 느낄 수 있었다.

_개인적으로는 따로 파일을 만들어내지 않고 코드를 push하기만 하면 deploy되는 **Netlify**가 더 편한 것 같다._
