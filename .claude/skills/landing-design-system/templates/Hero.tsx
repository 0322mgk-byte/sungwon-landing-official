"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

// ============================================
// 🎯 히어로 미디어 설정
// ============================================
// "video" 또는 "image" 중 선택
const HERO_TYPE: "video" | "image" = "video"

// 미디어 파일 경로 (public 폴더 기준)
const VIDEO_SRC = "/hero-video.mp4"
const IMAGE_SRC = "/hero-image.jpg"

// ============================================
// 🎬 영상 조절 설정 (HERO_TYPE = "video" 일 때)
// ============================================
const VIDEO_SCALE = 100      // 확대/축소 (%) - 100 = 원본 크기
const VIDEO_X = 0            // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
const VIDEO_Y = 0            // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// ============================================
// 🖼️ 이미지 조절 설정 (HERO_TYPE = "image" 일 때)
// ============================================
// 최종 위치 (애니메이션 끝점)
const IMAGE_SCALE = 100      // 확대/축소 (%) - 100 = 원본 크기
const IMAGE_X = 0            // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
const IMAGE_Y = 0            // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// 애니메이션 시작점 (처음 보이는 상태)
const IMAGE_START_SCALE = 120   // 시작 확대/축소 (%)
const IMAGE_START_X = 0         // 시작 좌우 이동 (%)
const IMAGE_START_Y = -5        // 시작 상하 이동 (%)

// 애니메이션 설정
const IMAGE_ANIM_ENABLED = true        // 이미지 애니메이션 사용 여부
const IMAGE_ANIM_DURATION = 3          // 애니메이션 시간 (초)
const IMAGE_ANIM_EASE = "power3.inOut" // 이징: power1~4 + .in / .out / .inOut
const IMAGE_CLICK_REPLAY = true        // 클릭 시 애니메이션 재생 여부

// ============================================
// 📐 히어로 섹션 레이아웃
// ============================================
const HERO_HEIGHT = "100vh"             // 히어로 섹션 높이 - vh(화면비율) 또는 px
const HERO_BG = "rgba(0,0,0,1)"         // 배경색 - rgba(R,G,B,투명도 0~1)

// ============================================
// 📝 오버레이 텍스트 설정 (선택사항)
// ============================================
const OVERLAY_ENABLED = false           // 오버레이 텍스트 사용 여부
const OVERLAY_TITLE = "Welcome"         // 메인 타이틀
const OVERLAY_SUBTITLE = "Your subtitle here" // 서브 타이틀
const OVERLAY_TITLE_SIZE = 64           // 타이틀 크기 (px)
const OVERLAY_TITLE_COLOR = "rgba(255,255,255,1)" // 타이틀 색상
const OVERLAY_SUBTITLE_SIZE = 24        // 서브타이틀 크기 (px)
const OVERLAY_SUBTITLE_COLOR = "rgba(255,255,255,0.8)" // 서브타이틀 색상

// ============================================

export default function Hero() {
  const heroRef = useRef(null)
  const heroMediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)

  // 초기 로드 애니메이션
  const playInitialAnimation = () => {
    if (HERO_TYPE === "image" && IMAGE_ANIM_ENABLED && heroMediaRef.current) {
      gsap.to(heroMediaRef.current, {
        scale: IMAGE_SCALE / 100,
        xPercent: IMAGE_X,
        yPercent: IMAGE_Y,
        duration: IMAGE_ANIM_DURATION,
        ease: IMAGE_ANIM_EASE
      })
    }
  }

  // 클릭 시 애니메이션 재생
  const replayAnimation = () => {
    if (HERO_TYPE === "image" && IMAGE_CLICK_REPLAY && heroMediaRef.current) {
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: HERO_HEIGHT,
        backgroundColor: HERO_BG,
        cursor: IMAGE_CLICK_REPLAY && HERO_TYPE === "image" ? "pointer" : "default"
      }}
      onClick={replayAnimation}
    >
      {/* 미디어 배경 */}
      <div className="absolute inset-0 z-0">
        {HERO_TYPE === "video" ? (
          <video
            ref={heroMediaRef as React.RefObject<HTMLVideoElement>}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
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
            alt="Hero"
            fill
            priority
            className="object-cover"
            style={{
              transform: `scale(${IMAGE_START_SCALE / 100}) translate(${IMAGE_START_X}%, ${IMAGE_START_Y}%)`,
            }}
          />
        )}
      </div>

      {/* 오버레이 텍스트 */}
      {OVERLAY_ENABLED && (
        <div className="relative z-10 text-center">
          <h1
            style={{
              fontSize: `${OVERLAY_TITLE_SIZE}px`,
              color: OVERLAY_TITLE_COLOR,
              fontWeight: 700
            }}
          >
            {OVERLAY_TITLE}
          </h1>
          <p
            style={{
              fontSize: `${OVERLAY_SUBTITLE_SIZE}px`,
              color: OVERLAY_SUBTITLE_COLOR,
              marginTop: "16px"
            }}
          >
            {OVERLAY_SUBTITLE}
          </p>
        </div>
      )}
    </section>
  )
}
