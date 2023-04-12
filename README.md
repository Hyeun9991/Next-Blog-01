# Next 블로그 프로젝트

- Next.js와 Typescript를 이용해서 만든 블로그 프로젝트

<br>
<br>

### 목차

- [개발기간](#개발-기간)
- [개요 및 기획 의도](#개요-및-기획-의도)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [기여한 일](#기여한-일)
- [폴더 구조](#폴더-구조)
- [페이지 경로](#페이지-경로)
- [프로젝트 실행](#프로젝트-실행)
- [프리뷰](#프리뷰)

<br>
<br>

### 개발 기간

- 2023.3.20 ~ 현재

<br>
<br>

### 개요 및 기획 의도

- 기존 React + JS 코드를 Next.js + TS로 업그레이드하고 axios를 이용해서 요청을 보내 생성, 수정, 삭제하는 기능을 구현하기 위해서 프로젝트 시작

<br>
<br>

### 기술 스택

- Next.js
- Typescript (ES6+)
- TailwindCSS
- axios
- json-server
- next themes

<br>
<br>

### 주요 기능

- 게시글 작성, 불러오기, 삭제, 수정
- 게시글 검색 기능
- 토스트 알림

<br>
<br>

### 기여한 일

- 주요 기능 구현
- 웹 사이트 디자인 작업
- 반응형 작업
- 프로젝트 배포

<br>
<br>

### 폴더 구조

| 폴더       | 설명                         |
| ---------- | ---------------------------- |
| components | 컴포넌트 폴더                |
| hooks      | custom toast hook 폴더       |
| pages      | 페이지, 다이나믹 페이지 폴더 |

<br>
<br>

### 페이지 경로

| 페이지        | Path         |
| ------------- | ------------ |
| 홈 화면       | `/`          |
| 관리자 페이지 | `/admin`     |
| 게시글 페이지 | `/blogs/:id` |

<br>
<br>

### 프로젝트 실행

- 패키지 다운: `npm i`
- 서버 실행: `npm run dev` && `npm run db`

<br>
<br>

### 프리뷰

| 설명                       | 프리뷰                                                                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 홈 페이지, 다크 모드       | <img width="50%" src="https://user-images.githubusercontent.com/103477552/231458632-2c4525dc-8172-49f3-aad8-5c650665310a.png" /> |
| 디테일 페이지, 수정 페이지 | <img width="50%" src="https://user-images.githubusercontent.com/103477552/231458654-46f2d3d8-8f17-4a83-b47f-3a576c729a61.png" /> |
| 관리자 페이지              | <img width="50%" src="https://user-images.githubusercontent.com/103477552/231458661-21e67c5d-d191-4080-baeb-d67505048d16.png" /> |
