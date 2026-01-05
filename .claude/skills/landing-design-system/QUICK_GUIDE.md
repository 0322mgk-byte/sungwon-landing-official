# Quick Guide - 빠른 시작 가이드

## 5분 만에 랜딩페이지 만들기

### 1. 프로젝트 설정

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest my-landing --typescript --tailwind --app

# 필요한 패키지 설치
cd my-landing
npm install gsap lucide-react

# shadcn/ui 설정
npx shadcn@latest init
npx shadcn@latest add button
```

### 2. 템플릿 복사

`templates/` 폴더의 파일들을 `src/components/`로 복사:
- `Header.tsx`
- `Hero.tsx`
- `Footer.tsx`

### 3. 페이지에서 사용

```tsx
// src/app/page.tsx
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Footer />
    </main>
  )
}
```

### 4. 커스터마이징

각 컴포넌트 파일 상단의 Config 섹션에서 값만 수정하면 됩니다!

---

## 자주 수정하는 설정들

### 색상 변경
```tsx
// 모든 색상은 rgba 형식
const HEADER_BG = "rgba(0,0,0,0.5)";  // 검정 50% 투명
const HEADER_BG = "rgba(255,255,255,1)";  // 흰색 불투명
const HEADER_BG = "rgba(0,100,200,0.8)";  // 파랑 80% 불투명
```

### 로고 변경
```tsx
const LOGO_SRC = "/my-logo.png";  // public 폴더에 이미지 넣기
const LOGO_SIZE = 150;            // 크기 조절
```

### 네비게이션 메뉴 변경
```tsx
const NAV_ITEMS = [
  { label: "홈", href: "#home" },
  { label: "서비스", href: "#services" },
  { label: "문의", href: "#contact" },
];
```

### 전화번호 변경
```tsx
const CTA_TEXT = "02-1234-5678";  // Header
const PHONE_NUMBER = "02-1234-5678";  // Footer
```

### 히어로 배경 변경
```tsx
// 영상 사용
const HERO_TYPE = "video";
const VIDEO_SRC = "/my-video.mp4";

// 이미지 사용
const HERO_TYPE = "image";
const IMAGE_SRC = "/my-image.jpg";
```

### SNS 링크 변경
```tsx
const SNS_ICONS = [
  { src: "/icons/instagram.png", alt: "인스타그램", href: "https://instagram.com/mypage" },
  { src: "/icons/youtube.png", alt: "유튜브", href: "https://youtube.com/@mychannel" },
];
```

---

## 위치 조절 팁

### 퍼센트(%) 위치
```
0% = 왼쪽/위
50% = 중앙
100% = 오른쪽/아래
```

### 픽셀(px) 미세 조정
```
양수 = 오른쪽/아래로 이동
음수 = 왼쪽/위로 이동
```

### 예시
```tsx
// 로고를 왼쪽에서 15% 위치에 배치하고, 약간 아래로 이동
const LEFT_GROUP_POSITION = 15;  // 왼쪽에서 15% 위치
const LEFT_GROUP_Y = 5;          // 5px 아래로 미세 조정
```

---

## 애니메이션 조절

### 이징 종류
```
power1 = 약한 가속/감속
power2 = 중간 가속/감속
power3 = 강한 가속/감속
power4 = 매우 강한 가속/감속

.in = 천천히 시작
.out = 천천히 끝남
.inOut = 양쪽 다 천천히
```

### 예시
```tsx
const ANIM_EASE = "power2.out";  // 부드럽게 끝나는 애니메이션
const ANIM_DURATION = 0.5;       // 0.5초 동안 재생
```

---

## 문제 해결

### 이미지가 안 보여요
- `public/` 폴더에 이미지가 있는지 확인
- 경로가 `/`로 시작하는지 확인 (예: `/logo.png`)

### 애니메이션이 안 돼요
- `ANIM_ENABLED = true`인지 확인
- gsap 패키지가 설치되었는지 확인

### 모바일에서 깨져요
- 반응형 클래스 확인: `hidden md:flex`, `lg:flex` 등
- 브라우저 개발자 도구에서 모바일 뷰로 테스트
