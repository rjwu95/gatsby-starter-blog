---
title: "Serverless아키텍쳐와 FrameWork "
date: "2020-06-08"

---

### Serverless 아키텍쳐

Serverless 아키텍쳐란 직역하면 서버가 없다는 뜻이지만 실제로는 개발자가 서버를 따로 구축하지 않아도 되는 형태이다. 이 말은 클라우드 컴퓨팅에서 서버를 만들어서 돌려준다는 의미이기도 하다. 그 중에서도 **FaaS**(Function as a Service)는 우리가 원하는 기능을 함수의 형태로만 만들어서 등록해놓으면 해당 함수가 작동하는 형태이다. FaaS의 가장 큰 장점은 비용이 적다는 것인데 그 이유는 보통의 서버는 기능을 동작하게 할 때 항상 서버를 작동시켜놓아야 하지만, FaaS는 특정 함수에 대한 요청이 들어오면 특정 함수에 대한 요청만 처리하고 계속 돌고 있지 않기 때문이다.

백엔드를 직접 구축하지 않아도 된다는 장점과 비용이 적게 든다는 이 두가지의 장점으로 인해 Serverless에 관심을 갖게 되었다. 그래서 FaaS를 사용할 수 있는 가장 쉬운 방법을 찾아보다가 우리에게 친숙한 AWS에서 나온 Lambda라는 서비스에 관심을 갖게 되었다. 이 서비스는 Go, Java, Node, Python, Ruby 등 많은 Runtime을 제공하고 있기 때문에 누구든지 접근할 수 있었다. 다음의 이미지처럼 함수를 만들어서 등록하기만 하면 엔드포인트를 생성해준다. 그럼 그 엔드포인트에 요청을 날려보면 끝!

 ![스크린샷 2020-06-21 오후 10.47.13](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg08y33s9wj31r80ty0y4.jpg)

이처럼 백엔드를 구축하지 않아도 함수 등록만으로 REST API를 구축할 수 있는게 편했다. 하지만 완전히 함수를 다 만들어 놓고 요청을 날려보는 것은 내게 한계로 느껴졌고 로컬에서 충분히 테스트한 후 함수를 등록하고 싶은 욕구가 생겼다. 그래서 Serverless Framework를 사용해 보았다.

### Serverless Framework

Serverless Framework는 AWS, Azure, Google Cloud Platfrom 등 다양한 클라우드 서비스로 함수들을 업로드할 수 있는 Framework이다. 지원하는 플러그인에 따라 다양한 기능을 추가하여 테스트를 한 후 클라우드에 올릴 수 있다는 장점이 있다. 

사용하는 방법에 대해서 간단히 알아보면 serverless cli를 통해 프로젝트를 초기 셋팅하고 serverless.yml을 다음과 같이 수정하고 실행시키고 싶은 함수를 js파일에 다음과 같이 만들어주면 코드에 대한 부분은 끝난다. 보는 것과 같이 코드의 구성이 매우 간단하다.![스크린샷 2020-06-21 오후 11.01.38](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg09k5e1hqj30ou0i6wgc.jpg)![스크린샷 2020-06-21 오후 11.01.51](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg09k76291j30x40rgtc0.jpg)

이 때 주목해야 할 부분이 serverless.yml에 plugins이라는 부분인데, 앞서 말했듯이 serverless에 플러그인을 추가해서 기능을 확장시킬 수 있다. 'serverless-offline'라는 module을 설치하여 serverless cli의 `serverless offline` 을 사용하면 로컬에 서버를 띄워 만들어 놓은 함수를 테스트할 수 있다. 이게 내가 생각하는 serverless의 가장 큰 장점이다. 그 후 AWS IAM user를 이용하여 ~/.aws/credentials 파일에 access_key와 secret_key를 저장한 후 Lambda에 배포할 수 있다.

### 후기

Serverless의 장점에 끌려 시작해보았는데 진입장벽이 높지 않아 쉽게 배울 수 있었다. 이번에는 REST API를 구축하는 것에 그쳤지만 GraphQL과도 같이 쓸 수 있는 방법이 있다고 하니 그 방법으로도 서버를 대신하여 프로젝트를 진행해 보고 싶은 욕심이 생겼다.
