---
title: "Javascript의 배열은 진짜 배열일까?"
date: "2021-06-01"
---

##진짜 배열이 아니다!

결론부터 말하자면 자바스크립트 배열은 일반적으로 말하는 배열이 아니다.
그 이유는 **연속적인 메모리를 사용하지 않기 때문이다.**
일반적인 배열은 연속적인 메모리를 사용한다.
예로 메모리 주소가 1000이고, 각 요소가 8바이트를 사용한다면 인덱스를 이용하여 아래와 같이 접근한다.

```
0: 1000 + 8 * 0 = 1000
1: 1000 + 8 * 1 = 1008
2: 1000 + 8 * 2 = 1016
3: 1000 + 8 * 3 = 1024
```

이처럼 배열은 인덱스를 통해 효율적으로 요소에 접근할 수 있다. 
하지만 특정한 값을 찾는 경우, 모든 배열 요소를 처음부터 값을 발견할 때까지 차례대로 찾아야 한다(시간 복잡도 O(n)).
또 특정 위치에 값을 끼워넣거나 삭제하는 경우에도, 그 이후의 요소들을 미루고 당겨야한다는 단점도 있다.

## 그렇다면 자바스크립트 배열은 무엇일까?

사실 자바스크립트 배열은 객체이다. (해시 테이블로 구현되어 있음)

![스크린샷 2021-06-01 오후 6.00.19](https://tva1.sinaimg.cn/large/008i3skNgy1gr2vfrf5jwj30g303nt9h.jpg)

위 처럼 value에 값을 저장하는 객체일 뿐이다. 그리고 배열의 요소는 단순히 객체의 키로 사용한다.

그렇다면 자바스크립트를 만든 개발자는 왜 배열을 객체로 만들었을까?

## 일반 객체와 자바스크립트 객체의 장단점

- 일반적인 배열은 인덱스를 계산해서 사용하기 때문에 인덱로 빠르게 접근할 수 있다. 하지만 요소를 삽입 또는 삭제하는 경우는 비효율적이다.
- 자바스크립트 배열은 해시 테이블로 구현된 객체이기 때문에 인덱스로 접근할 때 일반적인 배열보다 느리다. 단 특정 요소를 삽입 또는 삭제할 때는 나머지 요소들의 위치를 바꿀 필요가 없으므로 효율적이다.

**즉, 자바스크립트 배열은 인덱스를 사용해서 빠르게 접근할 수 있는 장점을 버리고, 값을 삭제하거나 삽입할 때 효율을 택한 것이다.**

## 만약 일반 배열을 쓰고 싶다면?

자바스크립트에는 ES2017부터 일반적인 배열을 지원한다. Int8Array, Int32Array와 같은 생성자를 사용하면 일반적인 배열으로 사용할 수 있다.

## 테스트

![스크린샷 2021-06-01 오후 6.18.19](https://tva1.sinaimg.cn/large/008i3skNgy1gr2vyi5wgij30ch07mgmp.jpg)

위와 같이 인덱스 접근 성능 테스트를 해보면 일반적인 배열인 Int32Array가 훨씬 빠르다는 것을 알 수 있다.

