name: hero-section
description: 히어로 섹션 생성 - GSAP 애니메이션 + 이미지/비디오 배경 지원

# Hero Section Skill

Next.js + GSAP 기반 히어로 섹션을 생성합니다.
이미지와 비디오 배경을 모두 지원하며, 확대/축소 애니메이션이 포함됩니다.

## 트리거

사용자가 다음과 같이 요청할 때 이 skill을 사용합니다:
- "히어로 섹션 만들어줘"
- "랜딩페이지 히어로 추가해줘"
- "GSAP 애니메이션 히어로"
- "/hero-section"

## 기술 스택

- Next.js (App Router)
- TypeScript
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- next/image

## 필수 의존성

```bash
npm install gsap
```

## 코드 구조

### 1. 설정 변수 (파일 상단)

```typescript
// ============================================
// 🎯 히어로 미디어 설정
// ============================================
// "video" 또는 "image" 중 선택
const HERO_TYPE = "image"

// 미디어 파일 경로 (public 폴더 기준)
const VIDEO_SRC = "/hero-video.mp4"
const IMAGE_SRC = "/hero-image.png"

// ============================================
// 🎬 영상 조절 설정 (HERO_TYPE = "video" 일 때)
// ============================================
const VIDEO_SCALE = 132    // 확대/축소 (%) - 100 = 원본 크기
const VIDEO_X = 0          // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
const VIDEO_Y = -10        // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// ============================================
// 🖼️ 이미지 조절 설정 (HERO_TYPE = "image" 일 때)
// ============================================
// 최종 위치 (애니메이션 끝점 = 원점)
const IMAGE_SCALE = 120    // 확대/축소 (%) - 100 = 원본 크기
const IMAGE_X = 0          // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
const IMAGE_Y = 2          // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// 애니메이션 시작점 (처음 보이는 상태)
const IMAGE_START_SCALE = 150   // 시작 확대/축소 (%)
const IMAGE_START_X = 0         // 시작 좌우 이동 (%)
const IMAGE_START_Y = -8        // 시작 상하 이동 (%)

// 애니메이션 설정
const IMAGE_ANIM_DURATION = 3   // 애니메이션 시간 (초)
const IMAGE_ANIM_EASE = "power3.inOut"  // 이징 함수
// ============================================
```

### 2. 컴포넌트 기본 구조

```typescript
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export default function HeroSection() {
  const heroRef = useRef(null)
  const heroMediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)

  // 초기 로드 애니메이션
  const playInitialAnimation = () => {
    if (HERO_TYPE === "image" && heroMediaRef.current) {
      gsap.to(heroMediaRef.current, {
        scale: IMAGE_SCALE / 100,
        xPercent: IMAGE_X,
        yPercent: IMAGE_Y,
        duration: IMAGE_ANIM_DURATION,
        ease: IMAGE_ANIM_EASE
      })
    }
  }

  // 클릭 시 리플레이 애니메이션
  const replayAnimation = () => {
    if (HERO_TYPE === "image" && heroMediaRef.current) {
      gsap.fromTo(heroMediaRef.current,
        {
          scale: IMAGE_START_SCALE / 100,
          xPercent: IMAGE_START_X,
          yPercent: IMAGE_START_Y
        },
        {
          scale: IMAGE_SCALE / 100,
          xPercent: IMAGE_X,
          yPercent: IMAGE_Y,
          duration: IMAGE_ANIM_DURATION,
          ease: IMAGE_ANIM_EASE
        }
      )
    }
  }

  useEffect(() => {
    playInitialAnimation()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black cursor-pointer"
      onClick={replayAnimation}
    >
      <div className="absolute inset-0 z-0">
        {HERO_TYPE === "video" ? (
          <video
            ref={heroMediaRef as React.RefObject<HTMLVideoElement>}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
            style={{
              transform: `scale(${VIDEO_SCALE / 100}) translate(${VIDEO_X}%, ${VIDEO_Y}%)`,
            }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <Image
            ref={heroMediaRef as React.RefObject<HTMLImageElement>}
            src={IMAGE_SRC}
            alt="Hero Image"
            fill
            priority
            className="object-contain"
            style={{
              transform: `scale(${IMAGE_START_SCALE / 100}) translate(${IMAGE_START_X}%, ${IMAGE_START_Y}%)`,
            }}
          />
        )}
      </div>
    </section>
  )
}
```

## GSAP 이징 함수 가이드

| 이징 | 효과 |
|------|------|
| `power1.out` | 부드러운 감속 (약함) |
| `power2.out` | 부드러운 감속 (중간) |
| `power3.out` | 부드러운 감속 (강함) |
| `power3.inOut` | 시작/끝 느림, 중간 빠름 |
| `power3.in` | 시작 느림, 끝 빠름 |

## CSS와 GSAP 단위 매핑

| CSS | GSAP | 기준 |
|-----|------|------|
| `translate(X%, Y%)` | `xPercent`, `yPercent` | 요소 자체 크기 |
| `scale()` | `scale` | - |
| `top`, `left` | `top`, `left` | 부모 컨테이너 |

**주의**: CSS `translate`와 GSAP `xPercent/yPercent`는 동일한 기준(요소 크기)을 사용합니다.

## 히어로 섹션 높이 설정

```css
h-[90vh]  /* 뷰포트 높이의 90% */
```

| 값 | 설명 |
|----|------|
| `h-screen` 또는 `h-[100vh]` | 전체 화면 높이 |
| `h-[90vh]` | 화면의 90% (하단 콘텐츠 힌트용) |
| `h-[80vh]` | 화면의 80% |
| `h-[50vh]` | 화면의 절반 |

**팁**: `90vh`를 사용하면 사용자가 아래에 더 많은 콘텐츠가 있다는 것을 인지할 수 있습니다.

## 이미지 비율 유지 (object-fit)

```css
object-contain  /* 원본 비율 유지, 잘림 없음 */
object-cover    /* 영역 채움, 일부 잘림 */
```

| 속성 | 동작 | 적합한 경우 |
|------|------|-------------|
| `object-contain` | 이미지 전체가 보이도록 축소/확대, **여백 발생 가능** | 로고, 제품 이미지, 전체가 보여야 하는 경우 |
| `object-cover` | 영역을 꽉 채움, **이미지 일부 잘림** | 배경 사진, 분위기 이미지, 잘려도 되는 경우 |

**이 템플릿에서는 `object-contain`을 사용합니다:**
- 이미지/비디오 전체가 보여야 할 때 적합
- 확대/축소 애니메이션과 함께 사용 시 원본 비율 유지
- 여백은 `bg-black`으로 자연스럽게 처리

**`object-cover`로 변경하려면:**
```tsx
// object-contain → object-cover 로 변경
className="object-cover"
```

## 사용 시 주의사항

1. **검정 화면 방지**: CSS로 시작점을 먼저 설정하고, GSAP는 끝점으로만 애니메이션
2. **클릭 리플레이**: `gsap.fromTo()`로 시작점→끝점 전체 애니메이션
3. **미디어 파일**: `public` 폴더에 위치, `/파일명`으로 접근
4. **반응형**: `object-contain`으로 이미지 비율 유지 (잘림 없음)

## 파일 위치

```
src/
├── app/
│   └── page.tsx          # 히어로 섹션 포함
public/
├── hero-image.png        # 배경 이미지
└── hero-video.mp4        # 배경 비디오
```
