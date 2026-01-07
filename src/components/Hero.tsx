"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

// 설정값 import (Hero.config.ts에서 값 수정 가능)
import {
  HERO_TYPE,
  VIDEO_SRC,
  IMAGE_SRC,
  HERO_HEIGHT,
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
