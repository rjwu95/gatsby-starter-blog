---


title: "Vue 초기 렌더링 속도 개선하기"
date: "2020-05-25"
---

최근 회사의 모바일 어플리케이션을 개발하고 있는 중에 초기 렌더링 속도의 개선에 대해 큰 필요성을 느꼈다.
우리 회사는 Native에서 프론트에 Webview를 요청하면 webpack으로 빌드되어 있는 파일들을 보내 앱 내에서 띄우는 형식인데,
Webview를 요청한 후 꽤 오랜 시간 White page가 노출되고 있었기 때문에 번들 파일을 불러오는 시간이라고 밖에 결론낼 수 없었다.
그래서 크게 두가지를 수정함으로써 초기 렌더링 속도를 개선할 수 있었는데, 그 방법을 소개하고자 한다.

#### 1. Webpack 번들 크기 줄이기

첫번째 방법은 Webpack으로 빌드하는 파일의 크기 자체를 줄여버리는 것이다. 파일의 크기가 줄어드니 로딩하는 속도가 감소한다는 말은 당연하다.
번들 크기를 줄이기 위해선 먼저 어떤 모듈이 불필요하게 큰 메모리를 차지하고 있는지 알아야한다.
`webpack-bundle-analyzer`를 사용하면 다음과 같이 어떤 모듈이 얼만큼의 크기를 갖는지를 알 수 있다.

![스크린샷 2020-03-11 오후 4.23.53](https://tva1.sinaimg.cn/large/007S8ZIlgy1gf50ppfqy6j31hs0u0twm.jpg)

우리의 앱 같은 경우에는 위와 같이 `aws-sdk`라는 npm 모듈이 가장 큰 부피를 차지하고 있었는데 이를 줄이기 위한 방법을 찾았다.
그 방법은 모듈안에서 꼭 필요한 부분만을 import해서 사용하는 방법이다. 코드와 같이 이해해보자.

```javascript
import Aws from 'aws-sdk'

const s3 = Aws.S3({ options })
```

처음에 코드는 위와 같이 aws-sdk 전체를 import한 후에 그 안에서 S3를 가져오는 형식이었다. 이와 같은 형태라면 S3를 제외한 나머지의 내용들을 불필요하게 가져오는 것이므로 파일이 커질 수 밖에 없다. 따라서 아래와 같이 변경하면 번들의 크기가 줄어드는 것을 확인할 수 있다.

```javascript
import S3 from 'aws-sdk/clients/s3'

const s3 = S3({ options })
```

![스크린샷 2020-03-11 오후 4.36.34](https://tva1.sinaimg.cn/large/007S8ZIlgy1gf50vgqv44j31hm0u0avh.jpg)

뿐만아니라 사용하지 않는 모듈들까지도 legacy 코드들을 정리하면서 제거하여 번들의 크기를 눈에 띄게 줄일 수 있었고 최종적으로는 두번째 사진처럼 chunk 크기의 합이 `4.5MB -> 2.29MB`거의 1/2 정도로 줄어든 것을 확인할 수 있었다.

#### 2. 코드 스플리팅

두번째 방법은 코드 스플리팅이다. 코드 스플리팅의 원래 의미는 일정의 코드를 한번에 불러오는 것이 아니라 필요할 때 불러온다는 것이다. Vue에서 제공하는 기능 중에 이와 딱 들어맞는 것이 비동기 컴포넌트이다.

보통은 아래의 코드처럼 컴포넌트를 가져와서 바로 넣어주는 것이 일반적이다. 

```javascript
router.js

import MyComponent from './MyComponent.vue'

new Vue({
  // ...
  components: {
    'my-component': MyComponent
  }
})
```

이와 같은 방식으로 코드를 작성하면 router 파일이 로딩될 때 모든 컴포넌트들을 한번에 import 해오므로 초기 렌더링 시간이 많이 걸릴 수 밖에 없다. 그래서 이를 비동기 컴포넌트로 해결한다면 다음과 같다.

```javascript
router.js

new Vue({
  // ...
  components: {
    'my-component': () => import('./MyComponent.vue')
  }
})
```

이 형태로 바꿔준다면 비동기 컴포넌트로 작성된 컴포넌트들은 router 파일이 읽힐때가 아닌 해당 컴포넌트가 렌더링 될 때 import된다. 따라서 초기 렌더링 속도를 개선할 수 있었다.



#### 결과

결과적으로 초기 렌더링 속도는 눈에 띄게 개선되었고 이를 수치로 나타내보고 싶었던 나는 얼마나 달라졌는지 측정을 해보았다. Native에서 webview를 요청할 때 가장 먼저 로딩되는 파일은 index.html 파일이고 이 시점부터 시작해서 App.vue(가장 상위 컴포넌트)의 created(전체 코드가 로딩이 다 된 lifecycle)까지 걸리는 시간을 측정했다.

![스크린샷 2020-03-11 오후 4.28.57](https://tva1.sinaimg.cn/large/007S8ZIlgy1gf51ara9ztj319a0t4aig.jpg)

![스크린샷 2020-03-11 오후 4.29.04](https://tva1.sinaimg.cn/large/007S8ZIlgy1gf51csgcibj30u003omxy.jpg)

![스크린샷 2020-03-11 오후 4.29.04](https://tva1.sinaimg.cn/large/007S8ZIlgy1gf51cpur2xj30tc05ygly.jpg)

![스크린샷 2020-03-11 오후 4.43.47](https://tva1.sinaimg.cn/large/007S8ZIlgy1gf51copjftj31ke06g3zl.jpg)

콘솔 창에 찍힌 수치로 보았을 때 평균적으로 약 1450ms 에서 750ms 의 시간으로 개선되었고 약 2배 정도의 초기 렌더링 속도 개선을 할 수 있었다.

