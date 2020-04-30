---
title: "React navigation: 화면전환과 구성"
date: "2019-03-20"
---

react native를 통해 모바일 어플리케이션을 만들면서 react native app 화면전환에 react navigation이 가장 적합하다는 것을 깨달았고, navigation을 사용하면서 동작하는 원리에 대해 연구해봤다. React navigation을 통한 화면전환과 구성에 대해 이야기 해보자.

### Naviagator

먼저 react navigation에 있는 navigator라는 개념 먼저 얘기해보려 한다.
navigator는 마치 여러개의 화면을 한 보따리에 묶어서 그 안에 있는 화면들끼리 자유롭게 이동할 수 있게 해 주는 도구이다.

그렇다면 navigator는 어떤 종류가 있을까? 아래에 나오는 navigator들이 흔히 쓰이는 종류이다.

첫번째로 **Stack navigator**가 있다. 이 navigator는 아래의 그림처럼 stack과 같이 쌓이는 구조를 갖고 있는데, 이는 화면이 화면 위에 쌓이고, back 버튼을 누르면 위에 있는 화면이 사라진다는 의미이다.
<img src="https://electric-cloud.com/wp-content/uploads/use-case-graphic_full-stack-provisioning.png" width=250  />

다음은 **Bottom tab navigator**이다. 이 navigator는 인스타그램과 같은 어플에서 많이 볼 수 있는데, 화면 하단에 고정된 탭이 생기면서 탭을 누르면 화면이동을 자유롭게 도와주는 역할을 한다.
<img src="https://i2.wp.com/coleandtaffy.com/wp-content/uploads/2016/07/IG-bottom.jpg" />

다음은 **Drawer navigator**이다. 이는 아래의 예와 같이 화면의 왼쪽 또는 오른쪽에 탭이 나오면서 그 안에 있는 화면에서 자유롭게 이동할 수 있는 역할을 한다.
<img src="https://i.imgur.com/VDZJAYq.jpg" height=250 />

보통은 위의 navigator들을 조합하여 쓰는데 먼저 bottom tab navigator와 stack navigator를 조합해서 사용하면 다음과 같이 표현할 수 있다. 여러개의 bottom tab이 있고 각각의 tab에 stack navigator가 있는 구조이다.

![스크린샷, 2019-03-29 17-22-36](https://i.loli.net/2020/04/15/vWj7Gte1EDJhYLc.png)

또 다른 경우는 Drawer navigator와 stack navigator를 조합하여 사용하는 경우이다. 이 같은 경우도 동작원리는 위와 같고 형태만 달라지는 구조이다.

### Navigation의 lifecycle과 lifecycle event

사실 위의 내용보다 이 부분이 더 중요하다고 할 수 있는데, _navigation은 화면을 이동한다고 해서 unmount가 일어나지 않는다._ 이 얘기는 다시 말해서 이전에 봤었던 화면을 다시 본다고 해서 rerendering이 되지 않고, 즉 componentDidMount가 매번 실행되지 않는다는 얘기다.

따라서 어떤 화면에 focus를 맞출 때마다 어떤 함수를 실행시키거나 어떤 동작을 하려면 componentDidMount에서 실행해야 하는 것이 아니라 다른 event를 이용해서 함수를 실행시켜야 한다. 그 때 사용할 수 있는 것이 lifecycle event이다.

lifecycle event는 총 4가지가 있는데, focus될 때와 unfocus될 때로 나뉜다.

각각 경우에 두가지 event가 있다. focus는 onWillFocus와 onDidFocus가 있다.
onWillFocus는 이름에서 알 수 있듯이 화면에 focus가 맞춰지기 바로 전에 실행되는 event이고 onDidFocus는 focus가 맞춰진 바로 직후에 실행되는 event다.

이와 반대로 onWillBlur, onDidBlur는 unfocus되기 직전과 직후 실행되는 event이다.
예시로는 다음과 같이 사용할 수 있다.

```javascript
<NavigationEvents
  onWillFocus={payload => console.log("will focus", payload)}
  onDidFocus={payload => console.log("did focus", payload)}
  onWillBlur={payload => console.log("will blur", payload)}
  onDidBlur={payload => console.log("did blur", payload)}
/>
```

이 4가지 event를 사용하면 lifecycle에 맞춰 실행하고 싶은 함수들을 사용할 수 있다.
