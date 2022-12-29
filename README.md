![Header](https://capsule-render.vercel.app/api?type=waving&color=auto&width=1800&height=200&section=header)

# 🥄FoCo
현지인이 알려주는 세계 맛집 탐방

## 🥨프로젝트 소개
글로벌 user를 타겟으로 해 영어를 기본 언어로 사용합니다.
사용자가 회원가입 시 지정한 나라에서만 게시글을 작성할 수 있으며 

## 🍕개발기간
2022년 12월 11일 ~ 2022년 12월 29일 (약 3주)
주말 제외 매일 아침 8시 45분 스크럼
![image](/uploads/1a4274a76419ed1e00f0edbf1b7bb801/image.png)

## 🍔멤버구성

| Name | Position | MBTI | Role | 
| ------ | ------ | ----- | ----- |
| 홍희선 | FrontEnd | ENFJ | 팀장, main map, ranking, contents, multiSelectbox, dropdown 등 담당, 모든 페이지 총괄 및 해결 |
| 강민희 | FrontEnd | ENTP | review, post modal, autocomplete 담당 |
| 김혜지 | FrontEnd | ENFJ | bookmark, modal, route 담당 |
| 이화정 | FrontEnd | INFP | user 관련 login, logout, resister, profile, user정보 수정 등 담당 |
| 한승주 | BackEnd | ESTP | Only One, 단 하나의 백엔드 |

## 🍟개발 환경
협업 툴 ![GitLab](https://img.shields.io/badge/gitlab-444444?style=flat&logo=gitlab)
![Notion](https://img.shields.io/badge/notion-444444?style=flat&logo=notion)
![Jira](https://img.shields.io/badge/jira-444444?style=flat&logo=jira)
![Figma](https://img.shields.io/badge/figma-444444?style=flat&logo=figma)

시스템 ![Yarn](https://img.shields.io/badge/yarn-444444?style=flat&logo=yarn)

사용 언어 ![HTML5](https://img.shields.io/badge/html5-444444?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/css3-444444?style=flat&logo=css3)
![TypeScript](https://img.shields.io/badge/typescript-444444?style=flat&logo=typescript)

라이브러리 ![React](https://img.shields.io/badge/react-444444?style=flat&logo=react)
![StyledComponents](https://img.shields.io/badge/styledcomponents-444444?style=flat&logo=styled-components)
![Axios](https://img.shields.io/badge/axios-444444?style=flat&logo=axios)

그 외 ![ESLint](https://img.shields.io/badge/eslint-444444?style=flat&logo=eslint)
![Prettier](https://img.shields.io/badge/prettier-444444?style=flat&logo=prettier)

훅: `useState`, `useEffect`, `useRef`, `useNavigate`, `useParams`, `Cookies` 등

## 🍖개발 규칙
### 커밋컨벤션
- `feat`: 기능 추가
- `fix`: 버그 고친 경우
- `design`: css 등 사용자 UI 디자인 변경
- `docs`: 문서를 수정한 경우
- `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `rename`: 파일 혹은 폴더명 수정하거나 옮기는 경우
- `remove`: 파일을 삭제하는 작업만 수행한 경우
- `refactor`: 코드 리펙토링
### 브랜치
`master`
`dev`
`feature/FE/기능명`
`featrue/BE/기능명`
### 코딩컨벤션
- 변수명 `**camelCase**`
- components 이름은 **`Pascalcase`**

## 🌭주요사항 
### 기능
- **라우트**: ROUTE 모듈화 및 사용
- **Icontent**: 자주 사용되는 변수의 타입 지정 모듈화
- **usefulFunction**: 자주 사용되는 validateNickname, validateEmail, validatePassword 함수 저장
---
#### 회원가입
- **이메일**: 이메일 형식 체크
- **닉네임**: 영어 체크
- **비밀번호**: 글자 수 체크
- **비밀번호 확인**: 비밀번호 일치 체크
- **나라 지정**
---
#### 로그인
###### cookie로 user의 token 확인
- **이메일**: 이메일 형식 체크
- **비밀번호**: 글자 수 체크
- **비밀번호 찾기**: 이메일 확인 후 해당 이메일로 임시 비밀번호 전송
---
#### 회원정보수정
###### localStorage로 userNum 확인
- **메뉴**: click 시 지정 링크로 이동
    - **프로필 변경**
        - 기기 내에 저장된 이미지를 리사이징해 저장 및 프로필 이미지 변경
    - **비밀번호 변경**
        - 현재 비밀번호, 바꾼 비밀번호, 비밀번호 재확인 후 alert
    - **회원탈퇴**: 쿠키로 해당 유저 확인
        - 비밀번호: 비밀번호 확인 후 alert로 탈퇴 재확인
---
#### 회원 상태별 헤더 변경
###### cookie로 user의 token 확인
- **로그인된 유저** ![image](/uploads/1fbc7501d65638d77e3df500b470e2e9/image.png)
- **로그아웃 유저** ![image](/uploads/b8eef8ad0c03c47441ade3a7ecba5ab3/image.png)
---
#### 맵
###### 구글 맵 API 사용, 지도에서 특정 나라 선택 시 지정된 나라 확대
- **Dropdown**
    - geometries 사용
    - 선택된 나라의 저장된 위, 경도를 불러와 해당 나라로 이동 및 확대
- **Marker**: 해당 나라의 등록된 맛집의 위치가 지도에 표시
- **Ranking**
    - 해당 나라의 맛집 정보가 좋아요 순으로 표시
    - 각 게시물의 좋아요 수 확인 가능
- **more**: 해당 나라의 맛집 전체를 확인하는 페이지로 이동
---
#### mutiSelectBox
###### Content, Bookmark에서 활용
- **Content**: 지정 나라와 Dropdown에서 선택한 정보대로 filtering해 content 리턴
- **Bookmark**: 해당 user의 userNum 확인
--- 
#### 상세 컨텐츠 기능(Content)
###### 선택한 나라의 맛집 전체를 확인
- **나라별**: 맵에서 선택한 나라별로 출력되도록 useParams를 사용해 country filtering
- **Dropdown**: user가 원하는 정보만 filtering 가능
    - city, food, mood
- **컨텐츠**
    - 해당 게시글의 좋아요 수 확인 가능 및 hover 시 지역 확인 가능
    - post된 대표 이미지 click 시 모달창으로 이동
---
#### Bookmark
###### user가 bookmark 한 post를 불러와 user에게 표출
- 컨텐츠와 기능적으로 동일하며 bookmark에 대한 필터만 추가
---
#### 모달
###### 서버에서 해당 post 불러와 user에게 표출
- **아이콘 바**
    - 좋아요 상태, 좋아요 수, bookmark 상태 확인
    - 모달 닫기
- **타이틀**
    - 상호명, 위치
    - 평점: Rating 라이브러리 사용해 반올림한 평점값 표출
    - 프로필: 작성자 프로필 이미지
- **이미지박스**: 해당 post의 이미지 나열, 마우스 휠로 가로 scroll 구동
- **텍스트박스**: 해당 post의 태그와 코멘트 
- 모달 밖 배경화면 scroll 금지 
---
#### Post
- **post 작성 모달**: 해당 post의 input 저장 및 서버로 전달
    - 상호명
    - 위치: autocomplete 사용해 상호명 입력 시 위도와 경도 저장
    - 평점: Rating 라이브러리로 평점 input 저장
    - 이미지: 6개 이상 추가 금지 및 각 이미지 또는 전체 이미지 삭제 가능
        - 마우스 휠로 가로 scroll 구동
    - 태그: 각 3개 씩 선택 가능
    - 후기: 글자 수 제한(500자)
- **리뷰**: user가 작성한 리뷰 내역 확인 및 수정, 삭제 가능
    - 수정: post 작성 모달로 이동
    - 삭제: post 삭제 재확인

<!-- ---

### 페이지
회원가입페이지

로그인페이지

회원정보수정페이지
![image](/uploads/4d27886e41dee922a793c35b903077b4/image.png)
비밀번호 변경 페이지
![image](/uploads/6fbb050709a03b0106e285b297a3acfd/image.png)
회원탈퇴 페이지
![image](/uploads/a535081aa44a73f30f117d15c499046e/image.png)
메인페이지
![image](/uploads/f0c89b2a012a867c861669280c10852c/image.png)
나라별 페이지

상세페이지

콘텐츠모달

북마크페이지

리뷰페이지

리뷰모달
 -->

![Footer](https://capsule-render.vercel.app/api?type=waving&color=auto&width=auto&height=200&section=footer)
