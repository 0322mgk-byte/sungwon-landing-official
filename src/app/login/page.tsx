"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// ============================================
// 🔐 로그인 페이지 설정
// ============================================
const SECTION_BG = "rgba(255,255,255,1)"     // 배경색
const SECTION_PADDING_TOP = 150;             // 헤더 아래 여백 (px)
const SECTION_PADDING_BOTTOM = 80;           // 섹션 하단 여백 (px)

// 폼 컨테이너 설정
const FORM_MAX_WIDTH = 400;                  // 폼 최대 너비 (px)
const FORM_PADDING = 0;                      // 폼 내부 패딩 (px)

// 라벨 설정
const LABEL_SIZE = 14;                       // 라벨 글자 크기 (px)
const LABEL_COLOR = "rgba(60,60,60,1)";      // 라벨 색상
const LABEL_WEIGHT = 400;                    // 라벨 굵기
const LABEL_MARGIN_BOTTOM = 8;               // 라벨 하단 여백 (px)

// 입력 필드 설정
const INPUT_HEIGHT = 50;                     // 입력 필드 높이 (px)
const INPUT_BORDER_COLOR = "rgba(220,220,220,1)"; // 테두리 색상
const INPUT_BORDER_RADIUS = 4;               // 테두리 둥글기 (px)
const INPUT_FONT_SIZE = 15;                  // 입력 글자 크기 (px)
const INPUT_PLACEHOLDER_COLOR = "rgba(180,180,180,1)"; // placeholder 색상
const INPUT_PADDING_X = 16;                  // 좌우 패딩 (px)
const INPUT_GAP = 24;                        // 입력 필드 간 간격 (px)

// 체크박스 & 링크 영역 설정
const CHECKBOX_SIZE = 16;                    // 체크박스 크기 (px)
const CHECKBOX_LABEL_SIZE = 14;              // 체크박스 라벨 글자 크기 (px)
const CHECKBOX_LABEL_COLOR = "rgba(100,100,100,1)"; // 체크박스 라벨 색상
const LINK_COLOR = "rgba(100,100,100,1)";    // 링크 색상
const LINK_SIZE = 14;                        // 링크 글자 크기 (px)

// 로그인 버튼 설정
const BUTTON_HEIGHT = 56;                    // 버튼 높이 (px)
const BUTTON_BG = "rgba(30,30,30,1)";        // 버튼 배경색
const BUTTON_COLOR = "rgba(255,255,255,1)";  // 버튼 글자색
const BUTTON_FONT_SIZE = 16;                 // 버튼 글자 크기 (px)
const BUTTON_FONT_WEIGHT = 500;              // 버튼 글자 굵기
const BUTTON_BORDER_RADIUS = 4;              // 버튼 둥글기 (px)
const BUTTON_MARGIN_TOP = 32;                // 버튼 상단 여백 (px)

// ============================================

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [saveId, setSaveId] = useState(false)
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 관리자 계정 확인
    if (userId === "cospick2019" && password === "vmfl597784!") {
      // 로그인 성공 - 관리자 페이지로 이동
      window.location.href = "/admin"
    } else {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.")
    }
  }

  return (
    <main className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: SECTION_BG }}>
      <Header />

      {/* 로그인 섹션 */}
      <section
        className="relative flex flex-col items-center flex-1"
        style={{
          backgroundColor: SECTION_BG,
          paddingTop: `${SECTION_PADDING_TOP}px`,
          paddingBottom: `${SECTION_PADDING_BOTTOM}px`,
        }}
      >
        {/* 로그인 폼 컨테이너 */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col"
          style={{
            maxWidth: `${FORM_MAX_WIDTH}px`,
            padding: `${FORM_PADDING}px`,
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          {/* 아이디 입력 */}
          <div className="flex flex-col" style={{ marginBottom: `${INPUT_GAP}px` }}>
            <label
              style={{
                fontSize: `${LABEL_SIZE}px`,
                color: LABEL_COLOR,
                fontWeight: LABEL_WEIGHT,
                marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
              }}
            >
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full outline-none transition-colors focus:border-gray-400"
              style={{
                height: `${INPUT_HEIGHT}px`,
                border: `1px solid ${INPUT_BORDER_COLOR}`,
                borderRadius: `${INPUT_BORDER_RADIUS}px`,
                fontSize: `${INPUT_FONT_SIZE}px`,
                paddingLeft: `${INPUT_PADDING_X}px`,
                paddingRight: `${INPUT_PADDING_X}px`,
              }}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col" style={{ marginBottom: `${INPUT_GAP}px` }}>
            <label
              style={{
                fontSize: `${LABEL_SIZE}px`,
                color: LABEL_COLOR,
                fontWeight: LABEL_WEIGHT,
                marginBottom: `${LABEL_MARGIN_BOTTOM}px`,
              }}
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none transition-colors focus:border-gray-400"
                style={{
                  height: `${INPUT_HEIGHT}px`,
                  border: `1px solid ${INPUT_BORDER_COLOR}`,
                  borderRadius: `${INPUT_BORDER_RADIUS}px`,
                  fontSize: `${INPUT_FONT_SIZE}px`,
                  paddingLeft: `${INPUT_PADDING_X}px`,
                  paddingRight: '48px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>
          </div>

          {/* 아이디 저장 & 아이디·비밀번호 찾기 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                checked={saveId}
                onChange={(e) => setSaveId(e.target.checked)}
                className="accent-gray-600"
                style={{
                  width: `${CHECKBOX_SIZE}px`,
                  height: `${CHECKBOX_SIZE}px`,
                }}
              />
              <span
                style={{
                  fontSize: `${CHECKBOX_LABEL_SIZE}px`,
                  color: CHECKBOX_LABEL_COLOR,
                }}
              >
                아이디 저장
              </span>
            </label>
            <a
              href="/find-account"
              className="hover:underline"
              style={{
                fontSize: `${LINK_SIZE}px`,
                color: LINK_COLOR,
              }}
            >
              아이디 · 비밀번호 찾기
            </a>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p style={{ color: 'rgba(220,50,50,1)', fontSize: '14px', marginTop: '16px' }}>
              {error}
            </p>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full transition-opacity hover:opacity-90"
            style={{
              height: `${BUTTON_HEIGHT}px`,
              backgroundColor: BUTTON_BG,
              color: BUTTON_COLOR,
              fontSize: `${BUTTON_FONT_SIZE}px`,
              fontWeight: BUTTON_FONT_WEIGHT,
              borderRadius: `${BUTTON_BORDER_RADIUS}px`,
              marginTop: `${BUTTON_MARGIN_TOP}px`,
            }}
          >
            로그인
          </button>
        </form>
      </section>

      <Footer />
    </main>
  )
}
