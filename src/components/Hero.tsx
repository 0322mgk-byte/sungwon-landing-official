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
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 초기 로드 애니메이션
  useEffect(() => {
    if (HERO_TYPE === "image" && heroMediaRef.current && isMobile !== null) {
      gsap.to(heroMediaRef.current, {
        scale: IMAGE_SCALE / 100,
        xPercent: IMAGE_X,
        yPercent: IMAGE_Y,
        duration: IMAGE_ANIM_DURATION,
        ease: IMAGE_ANIM_EASE
      })
    }
  }, [isMobile])

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

  // 초기 로딩 중에는 빈 섹션 렌더링 (hydration mismatch 방지)
  if (isMobile === null) {
    return (
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '100vh', backgroundColor: HERO_BG }}
      />
    )
  }

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
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1`}
              className="pointer-events-none"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: isMobile ? '300%' : '177.78vh',
                height: isMobile ? '300%' : '100vh',
                border: 'none',
                transform: `translate(-50%, -50%) scale(${(isMobile ? MOBILE_YOUTUBE_SCALE : YOUTUBE_SCALE) / 100}) translate(${isMobile ? MOBILE_YOUTUBE_X : YOUTUBE_X}%, ${isMobile ? MOBILE_YOUTUBE_Y : YOUTUBE_Y}%)`,
              }}
              allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
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

      {/* 카피 텍스트 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(-50%) translateY(0px);
          }
          50% {
            transform: translateY(-50%) translateY(-10px);
          }
        }
        @keyframes rotateText {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      {/* 플로팅 박스 - PC에서만 표시 */}
      {!isMobile && (
      <div
        className="absolute z-10 flex flex-col items-center justify-start"
        style={{
          top: '50%',
          left: '10%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3)',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        {/* 메인 이미지 */}
        <Image
          src="/black-main.png"
          alt="군산 성원상떼빌"
          width={isMobile ? 220 : 320}
          height={0}
          style={{
            width: isMobile ? '220px' : '320px',
            height: 'auto',
            marginTop: isMobile ? '30px' : '40px',
          }}
        />
        {/* 중간 좌측 텍스트 */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? '30px' : '45px',
            top: '48%',
            transform: 'translateY(-50%)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 1)',
              lineHeight: 1.4,
            }}
          >
            월 30만원대
          </div>
          <div
            style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 800,
              color: 'rgb(243, 115, 32)',
              lineHeight: 1.4,
            }}
          >
            내집마련!
          </div>
        </div>
        {/* 좌측 하단 원형 배지 */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? '35%' : '29%',
            transform: 'translateX(-50%)',
            top: isMobile ? '57%' : '61%',
            width: isMobile ? '100px' : '130px',
            height: isMobile ? '100px' : '130px',
          }}
        >
          {/* 회전하는 텍스트 */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'rotateText 10s linear infinite',
            }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              />
            </defs>
            <text
              style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '8px',
              }}
            >
              <textPath href="#circlePath" startOffset="0%">
                <tspan style={{ fill: 'rgba(120, 120, 120, 1)' }}>{"  "}·{"  "}</tspan>
                <tspan style={{ fill: 'rgb(243, 115, 32)' }}>군산지곡</tspan>
                <tspan style={{ fill: 'rgba(120, 120, 120, 1)' }}>{"    "}성원상떼빌{"    "}더프라임</tspan>
              </textPath>
            </text>
          </svg>
          {/* 중앙 원형 배지 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '60px' : '80px',
              height: isMobile ? '60px' : '80px',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div
              style={{
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 700,
                color: 'rgb(243, 115, 32)',
                lineHeight: 1.3,
              }}
            >
              선착순
            </div>
            <div
              style={{
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 1)',
                lineHeight: 1.3,
              }}
            >
              동호수지정
            </div>
          </div>
        </div>
        {/* 하단 캐릭터 이미지 */}
        <Image
          src="/visual-man.png"
          alt="캐릭터"
          width={isMobile ? 100 : 150}
          height={0}
          style={{
            width: isMobile ? '110px' : '160px',
            height: 'auto',
            position: 'absolute',
            bottom: '0',
            right: isMobile ? '10px' : '20px',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))',
          }}
        />
      </div>
      )}

    </section>
  )
}
