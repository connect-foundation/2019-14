# Boost Writer

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.5.0-red.svg?cacheSeconds=2592000" />
  <img alt="Version" src="https://img.shields.io/node/v/react" />
  <img src="https://user-images.githubusercontent.com/7288322/32581402-b7e79c80-c54e-11e7-8650-ba6a944ada4b.png" alt="" style="max-width:100%;">
  <br>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-black?logo=Node.js&logoColor=green" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-black?logo=Docker&logoColor=1488C6" />
  <img alt="React" src="https://img.shields.io/badge/React.js-black?logo=React&logoColor=61DAFB" />
  <br>
  <img alt="SocketIO" src="https://img.shields.io/badge/Socket.io-black?logo=socket.io" />
  <img alt="MySQL" src="https://img.shields.io/badge/Mysql-black?logo=mysql" />
  
</p>

[Boost Writer Homepage](https://boostwriter.stenrine.com)

`Boost Writer`는 기술 문서를 작성하며 바로 코드 수행을 통해 과정과 결과를 확인할 수 있게 도와주는 테크니컬 라이팅 서비스 입니다.  
문서 작성 시에는 *Notion*, 확인 및 테스트 시에는 *실제 터미널*과 같은 UX를 지원해 기술 문서를 작성하는데 도움을 줍니다.

---

## Structure

### 인프라 구성

- Docker Server : Docker daemon이 가동중인 서버. 유저 터미널 환경을 컨테이너로 관리한다.
- Production Server : express 서버 및 클라이언트 배포 서버
- DB Server
- Nginx

![infra](https://user-images.githubusercontent.com/26639508/71149453-f2e58b80-2271-11ea-8c84-5437226f4cd0.jpg)


---

## Usage

### **Shortcut**

|기능|윈도우 단축키|맥OS 단축키
|-|-|-|
| 모든 셀 선택 | Ctrl + A | ⌘ + A
| 범위 선택 | Shift + ↑ | ⇧ + ↑
| 범위 선택 | Shift + ↓ | ⇧ + ↓
| 범위 잘라내기 | Ctrl + X | ⌘ + X
| 범위 복사 | Ctrl + C | ⌘ + C
| 범위 붙여넣기 | Ctrl + V | ⌘ + V
| 깊이 증가(List) | Tab | ⇥
| 깊이 감소(List) | Shift + Tab | ⇧ + ⇥
| 터미널 셀 삭제 | Shift + Backspace | ⇧ + ⌫
| 터미널 셀, 코드 셀 위로 탈출 | Ctrl + ↑ | ⌥ + ⌘ + ↑
| 터미널 셀, 코드 셀 아래로 탈출 | Ctrl + ↓ | ⌥ + ⌘ + ↓

### **Markdown**

### Terminal(Custom)

```
$$$
```

![terminal](https://user-images.githubusercontent.com/26639508/71147099-0a6d4600-226b-11ea-93a3-86c1fdecc73f.gif)


### Headings

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

![Headings](https://user-images.githubusercontent.com/26639508/71147100-0a6d4600-226b-11ea-89b2-77fb66a861df.gif)

### Unordered List

```
- Unordered List
+ Unordered List
* Unordered List
```

![ul](https://user-images.githubusercontent.com/26639508/71147107-0f31fa00-226b-11ea-90e3-8cc31c09bade.gif)

**Tip**: (Shift+)Tab을 눌러 깊이를 조정할 수 있습니다.

### Ordered List

```
1. Ordered List
2. Ordered List
3. Ordered List
```

![ol](https://user-images.githubusercontent.com/26639508/71147105-0f31fa00-226b-11ea-897e-5cb2038113fb.gif)

**Tip**: (Shift+)Tab을 눌러 깊이를 조정할 수 있습니다.

### Quoting text

```
> Quote
```

![Quote](https://user-images.githubusercontent.com/26639508/71147110-10632700-226b-11ea-834d-9c6d164fe878.gif)

### Code

````
```code
    code
````

![Code](https://user-images.githubusercontent.com/26639508/71147109-0fca9080-226b-11ea-9e5a-c5b1f8efca1e.gif)

**Warning**: 각 언어의 코드 하이라이팅을 지원하지 않습니다.

---

## Feature

### **1. WYSIWYG 방식의 마크다운 편집 기능**

### **2. 터미널 환경 설정**

  ### OS

  - Ubuntu
  - CentOS

  ### Programming Environment

  - NodeJS
  - Python

  ### Database

  - MySQL
  - MongoDB

### **3. 문서 공유**
  - 공유 UUID를 통한 작성한 문서 공유 가능

---

## Team

#### 권태욱

[Notion](https://www.notion.so/imurukevol/538cebd586e04ce5ab1c3ee1e5bda02f)

[GitHub](https://github.com/ImuruKevol)

#### 김윤환

[GitHub](https://github.com/DrizzlingCattus)

#### 박다정

[Blog](https://dimss.tistory.com/)

[GitHub](https://github.com/dimsssss)

#### 윤준환

[GitHub](https://github.com/RBJH)
