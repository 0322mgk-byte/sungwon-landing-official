name: Landing Design System
description: Next.js 랜딩페이지 Config 패턴 디자인 시스템 - Header, Hero, Footer 템플릿 제공
dependencies: gsap, lucide-react, @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge
---

# Landing Page Design System

Next.js 기반 랜딩페이지의 Config 패턴 디자인 시스템입니다.
비개발자도 쉽게 수정할 수 있도록 모든 설정값을 파일 상단에 상수로 정의합니다.

## 트리거

사용자가 다음과 같이 요청할 때 이 skill을 사용합니다:
- "랜딩페이지 만들어줘"
- "헤더/히어로/푸터 컴포넌트 만들어줘"
- "Config 패턴 랜딩페이지"
- "/landing-design-system"

## 핵심 원칙

### 1. Config 패턴
- 모든 커스터마이징 가능한 값은 파일 상단에 `const`로 정의
- 한글 주석으로 각 설정값의 용도와 사용법 설명
- 섹션별로 이모지와 구분선으로 시각적 분리

### 2. 색상 시스템
- 모든 색상은 `rgba(R,G,B,투명도)` 형식 사용
- 투명도: 0(투명) ~ 1(불투명)
- 예시: `rgba(0,0,0,0.1)` = 검정 10% 불투명

### 3. 위치 시스템
- px: 절대 위치 (픽셀 단위)
- %: 상대 위치 (부모 기준 비율)
- 음수: 왼쪽/위로, 양수: 오른쪽/아래로

## 기술 스택

- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS
- GSAP (애니메이션)
- Lucide React (아이콘)
- shadcn/ui (UI 컴포넌트)

## 사용법

### 새 프로젝트에 적용하기

1. 필요한 패키지 설치:
```bash
npm install gsap lucide-react
npx shadcn@latest init
npx shadcn@latest add button
```

2. 템플릿 파일 복사:
- `templates/Header.tsx` → `src/components/Header.tsx`
- `templates/Hero.tsx` → `src/components/Hero.tsx`
- `templates/Footer.tsx` → `src/components/Footer.tsx`

3. `page.tsx`에서 컴포넌트 import:
```tsx
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

4. 각 컴포넌트의 상단 Config 섹션에서 원하는 값 수정

## Config 패턴 구조

```tsx
// ============================================
// 🎨 섹션명 설정
// ============================================

// 그룹명
const SETTING_NAME = value;              // 설명 - 사용법/예시

// ============================================
```

## 컴포넌트 설명

### Header.tsx
- 로고, 네비게이션, CTA 버튼 포함
- 호버 시 배경색 변경
- GSAP 자간 애니메이션
- 반응형 모바일 메뉴

### Hero.tsx
- 비디오/이미지 배경 지원
- GSAP 확대/축소 애니메이션
- 클릭 시 애니메이션 재생

### Footer.tsx
- 로고, 회사 정보, 카피라이트
- 대표번호, SNS 링크
- 유연한 정렬 시스템

## 파일 구조

```
.claude/skills/landing-design-system/
├── Skill.md                # 이 문서
├── QUICK_GUIDE.md          # 빠른 시작 가이드
└── templates/
    ├── Header.tsx          # 헤더 컴포넌트 템플릿
    ├── Hero.tsx            # 히어로 섹션 템플릿
    └── Footer.tsx          # 푸터 컴포넌트 템플릿
```
