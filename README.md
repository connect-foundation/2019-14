# 2019-14.

# Boost Writer

---

> 문서를 작성하며 직접 코드를 돌려보고, 그 과정과 결과까지 알 수 있게 도와주는 테크니컬 라이팅 서비스 입니다.
노션과 비슷한 문서 작성 경험을 제공하고 주피터와 비슷한 터미널을 지원하여 기술 문서를 작성하는데 도움을 줍니다.


## Structure

---

### 구성

- Docker Server : Docker daemon이 가동중인 서버. 유저 터미널 환경을 컨터이너로 관리한다.
- Docker Private Registry : 유저가 만든 터미널 환경을 이미지로 관리한다.
- Production Server : express 서버 및 클라이언트 배포 서버
- DB Server
- Nginx

![infra](https://user-images.githubusercontent.com/4661295/69349455-1b9e5380-0cbb-11ea-8f7b-98b71e443f2d.jpg)

## Feature

---

- 위지윅 방식의 마크다운 편집 기능

  - Heading

  ```
  ## Heading
  ```

  ## Heading

  ---

  - Unordered List

  ```
  - Unordered List
  + Unordered List
  * Unordered List
  ```

  - Unordered List

  ---

  - Ordered List

  ```
  1. Ordered List
  2. Ordered List
  3. Ordered List
  ```

  1. Ordered List
  2. Ordered List
  3. Ordered List

  ---

  - Blockquote

  ```
  > Blockquote
  ```

  > Blockquote

- 터미널 환경 설정 기능(미구현)

  - OS
  - Linux Utility
  - Programming Language
  - Database

- 마크다운에 터미널 문법 지원(미구현)

  - Terminal (구현 예정)

  ```
  $$$ Terminal
  ```

  ![]()

- 작성한 문서 공유 기능
  - 링크를 통한 문서 공유 기능

## Team

---

#### 권태욱

[개인 홈페이지]()

[깃헙](https://github.com/ImuruKevol)

#### 김윤환

[개인 홈페이지]()

[깃헙](https://github.com/DrizzlingCattus)

#### 박다정

[개인 홈페이지](https://dimss.tistory.com/)

[깃헙](https://github.com/dimsssss)

#### 윤준환

[개인 홈페이지]()

[깃헙]()
