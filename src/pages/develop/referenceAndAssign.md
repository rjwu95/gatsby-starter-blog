---
title: "참조와 할당"
date: "2019-01-08"
---

Javascript의 data type은 크게 두가지로 나눌 수 있다. 첫번째는 primitive type이고 두번째는 reference type이다. 이 두가지의 가장 큰 차이는 저장되는 공간이다.

primitive type의 값은 stack에 저장이 되어 값이랑 직접적으로 연결이 된다. 하지만 reference type의 값은 heap에 저장이 되고, 변수 자체는 heap에 있는 값의 메모리 주소 값만 바라보고 있어 참조를 하게 되는 것이다. 그래서 나타나는 현상이 다음과 같이 값이 같더라도 실제로는 같지 않은 것들이다.

```javascript
var arr1 = [1, 2, 3]
var arr2 = [1, 2, 3]

console.log(arr1 === arr2) // false
```

여기서 헷갈리는 것이 다음과 같은 경우이다.

```javascript
var myArray = [2, 3, 4, 5]
function doStuff(arr) {
  arr = []
}
doStuff(myArray)
```

이와 같은 경우 myArray의 값은 어떻게 될까? 이 경우는 사실 생각보다 간단한데 myArray는 [2, 3, 4, 5]라는 값을 참조하고 있고 doStuff안의 arr는 []를 참조하고 있으므로 myArray의 값은 그대로 [2, 3, 4, 5]이다.

그럼 여기서 궁금할 수 있는 부분이 myArray에 새로운 array를 assign하면 원래 참조하던 값은 어떻게 될까? 이다. myArray에 다음과 같이 새로운 값을 assing하면 원래의 값에 연결된 주소값이 바뀌면서 연결이 끊어진다. **이때 javascript 엔진은 참조하는 변수가 없는 것을 알면 안전하게 그 값을 heap에서 삭제하게 된다.**

```javascript
var myArray = [2, 3, 4, 5]
myArray = []
// 원래 있던 [2, 3, 4, 5] heap에서 삭제
```
