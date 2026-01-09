"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"

// 설정값 import (Hero.config.ts에서 값 수정 가능)
import {
  HERO_TYPE,
  VIDEO_SRC,
  IMAGE_SRC,
  YOUTUBE_VIDEO_ID,
  YOUTUBE_SCALE,
  YOUTUBE_X,
  YOUTUBE_Y,
  MOBILE_YOUTUBE_SCALE,
  MOBILE_YOUTUBE_X,
  MOBILE_YOUTUBE_Y,
  HERO_HEIGHT,
  MOBILE_HERO_HEIGHT,
  HERO_BG,
  VIDEO_SCALE,
  VIDEO_X,
  VIDEO_Y,
  IMAGE_SCALE,
  IMAGE_X,
  IMAGE_Y,
  IMAGE_START_SCALE,
  IMAGE_START_X,
  IMAGE_START_Y,
  IMAGE_ANIM_DURATION,
  IMAGE_ANIM_EASE,
} from "./Hero.config"

export default function Hero() {
  const heroRef = useRef(null)
  const heroMediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
      style={{ height: isMobile ? MOBILE_HERO_HEIGHT : HERO_HEIGHT, backgroundColor: HERO_BG }}
      onClick={replayAnimation}
    >
      <div className="absolute inset-0 z-0">
        {HERO_TYPE === "youtube" ? (
          /* 유튜브 영상 배경 - 컨트롤 숨김, 자동재생, 반복 */
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&vq=hd2160`}
              className="pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '16/9',
                border: 'none',
                transform: `scale(${(isMobile ? MOBILE_YOUTUBE_SCALE : YOUTUBE_SCALE) / 100}) translate(${isMobile ? MOBILE_YOUTUBE_X : YOUTUBE_X}%, ${isMobile ? MOBILE_YOUTUBE_Y : YOUTUBE_Y}%)`,
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Hero Video"
            />
          </div>
        ) : HERO_TYPE === "video" ? (
          /* 로컬 영상 배경 */
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
