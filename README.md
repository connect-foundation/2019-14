# Boost Writer

---

> 서비스 `Boost Writer`는 개발관련 기술 문서를 작성하며, 바로 코드 수행을 통해 과정과 결과를 확인할 수 있게 도와주는 테크니컬 라이팅 서비스 입니다.  
> 문서 작성 시 **Notion**과 같은, 확인 및 테스트 간 **Jupyter Notebook**과 같은 UX를 지원해 기술 문서를 작성하는데 도움을 줍니다.

## Structure

---

### 인프라 구성

- Docker Server : Docker daemon이 가동중인 서버. 유저 터미널 환경을 컨터이너로 관리한다.
- Docker Private Registry : 유저가 만든 터미널 환경을 이미지로 관리한다.
- Production Server : express 서버 및 클라이언트 배포 서버
- DB Server
- Nginx

![infra](https://user-images.githubusercontent.com/4661295/69394024-2c33e580-0d1e-11ea-8c7a-49cec33aeea7.jpg)

## Feature

---

- **WYSIWYG 방식의 마크다운 편집 기능**

  ### Headings

  ```
  # Heading 1
  ## Heading 2
  ### Heading 3
  #### Heading 4
  ##### Heading 5
  ###### Heading 6
  ```

  ## Heading 2

  ***

  ### Unordered List

  ```
  - Unordered List
  + Unordered List
  * Unordered List
  ```

  - Unordered List

  ***

  ### Ordered List

  ```
  1. Ordered List
  2. Ordered List
  3. Ordered List
  ```

  1. Ordered List
  2. Ordered List
  3. Ordered List

  ***

  ### Quoting text

  ```
  > Quote
  ```

  > Quote

  ***

  ### Code

  ````
  ```code
      code
  ````

  ```
  code
  ```

  **주의**: 각 언어의 코드 하이라이팅을 지원하지 않습니다. (구현 예정)

  ***

  ### HR

  ```
  ---
  ***
  ___
  ```

  ***

  **주의**: - - -, \* \* \* 등 띄어쓰기를 입력할 경우 WYSIWYG 지원에 따라 Unordered List로 입력됩니다.

  ### Terminal(Custom)

  ```
  $$$
  ```

  ![terminal]()

---

## **구현 예정입니다.**

### Bold

```
**Bold**
__Bold__
```

**Bold**

---

### Italic

```
*Italic*
_Italic_
```

_Italic_

---

### Strikethrough

```
~~Strikethrough~~
```

~~Strikethrough~~

---

### Quoting code

```
`code`
```

`code`

---

### Link

```
[Link](https://www.naver.com)
```

[Link](uri)

---

### Image

```
![Image](uri)
```

![image](https://recruit.navercorp.com/img/favicon/naver_favicon.ico)

---

- **터미널 환경 설정**

  ### OS

  - Ubuntu
  - CentOS

  ### Programming Language

  - JavaScript
  - C/C++
  - Java
  - Python

  ### Database

  - MySQL
  - MariaDB
  - MongoDB

- **문서 공유**
  - 링크를 통한 작성한 문서 공유 가능

## Team

---

#### 권태욱

[Notion](https://www.notion.so/imurukevol/538cebd586e04ce5ab1c3ee1e5bda02f)

[GitHub](https://github.com/ImuruKevol)

#### 김윤환

[GitHub](https://github.com/DrizzlingCattus)

#### 박다정

[개인 홈페이지](https://dimss.tistory.com/)

[GitHub](https://github.com/dimsssss)

#### 윤준환

[GitHub](https://github.com/RBJH)
