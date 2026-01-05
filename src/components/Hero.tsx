"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

// ============================================
// 🎯 히어로 미디어 설정
// ============================================
// "video" 또는 "image" 중 선택
const HERO_TYPE: "video" | "image" = "video"

// 미디어 파일 경로
const VIDEO_SRC = "/hero-section-video.mp4"
const IMAGE_SRC = "/pickso-batang.png"

// ============================================
// 🎬 영상 조절 설정 (HERO_TYPE = "video" 일 때)
// ============================================
const VIDEO_SCALE = 132    // 확대/축소 (%) - 100 = 원본 크기
const VIDEO_X = 0        // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
const VIDEO_Y = -10        // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// ============================================
// 🖼️ 이미지 조절 설정 (HERO_TYPE = "image" 일 때)
// ============================================
// 최종 위치 (애니메이션 끝점 = 원점)
const IMAGE_SCALE = 120    // 확대/축소 (%) - 100 = 원본 크기
const IMAGE_X = 0          // 좌우 이동 (%) - 음수: 왼쪽, 양수: 오른쪽
const IMAGE_Y = 2         // 상하 이동 (%) - 음수: 위로, 양수: 아래로

// 애니메이션 시작점 (처음 보이는 상태)
const IMAGE_START_SCALE = 150   // 시작 확대/축소 (%)
const IMAGE_START_X = 0         // 시작 좌우 이동 (%)
const IMAGE_START_Y = -8       // 시작 상하 이동 (%)

// 애니메이션 설정
const IMAGE_ANIM_DURATION = 3   // 애니메이션 시간 (초)
const IMAGE_ANIM_EASE = "power3.inOut"  // 이징: power1~4 + .in / .out / .inOut

// 히어로 섹션 레이아웃
const HERO_HEIGHT = "90vh"      // 히어로 섹션 높이
const HERO_BG = "rgba(0,0,0,1)" // 배경색 - rgba(R,G,B,투명도 0~1)
// ============================================

export default function Hero() {
  const heroRef = useRef(null)
  const heroMediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)

  // 초기 로드 애니메이션: CSS에서 이미 시작점이 설정되어 있으므로 끝점으로만 애니메이션
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

  // 클릭 시 애니메이션: 시작점→끝점 전체 애니메이션
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
    // 초기 애니메이션 실행
    playInitialAnimation()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden cursor-pointer"
      style={{ height: HERO_HEIGHT, backgroundColor: HERO_BG }}
      onClick={replayAnimation}
    >
      <div className="absolute inset-0 z-0">
        {HERO_TYPE === "video" ? (
          /* 영상 배경 */
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
          /* 이미지 배경 - CSS로 시작점 즉시 표시, GSAP가 애니메이션 담당 */
          <Image
            ref={heroMediaRef as React.RefObject<HTMLImageElement>}
            src={IMAGE_SRC}
            alt="성원상떼빌 전경"
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
