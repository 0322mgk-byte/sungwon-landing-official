# Google Sheets 방문자 추적 시스템 설정 가이드

## 1. Google Cloud Console 설정

### 1.1 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단의 프로젝트 선택 → "새 프로젝트" 클릭
3. 프로젝트 이름 입력 (예: sungwon-landing-analytics)
4. "만들기" 클릭

### 1.2 Google Sheets API 활성화
1. 좌측 메뉴 → "API 및 서비스" → "라이브러리"
2. "Google Sheets API" 검색
3. "사용" 버튼 클릭

### 1.3 서비스 계정 생성
1. 좌측 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "서비스 계정"
3. 서비스 계정 이름 입력 (예: sheets-tracker)
4. "완료" 클릭
5. 생성된 서비스 계정 클릭
6. "키" 탭 → "키 추가" → "새 키 만들기"
7. "JSON" 선택 → "만들기"
8. JSON 파일이 다운로드됨 (잘 보관하세요!)

---

## 2. Google Spreadsheet 설정

### 2.1 스프레드시트 생성
1. [Google Sheets](https://sheets.google.com/) 접속
2. "새 스프레드시트" 생성
3. 이름 변경 (예: 성원상떼빌 방문자 분석)

### 2.2 시트 구조 설정

**시트 1: Sessions** (시트 이름을 정확히 "Sessions"로 변경)
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| sessionId | ip | city | region | country | device | browser | referrer | startTime |

첫 번째 행에 위 헤더를 입력하세요.

**시트 2: PageViews** (새 시트 추가 후 이름을 "PageViews"로 변경)
| A | B | C | D | E |
|---|---|---|---|---|
| sessionId | page | enterTime | exitTime | duration |

첫 번째 행에 위 헤더를 입력하세요.

### 2.3 서비스 계정에 권한 부여
1. 다운로드한 JSON 파일을 열어 `client_email` 값 복사
2. 스프레드시트에서 "공유" 버튼 클릭
3. 복사한 이메일 주소 입력
4. 권한을 "편집자"로 설정
5. "보내기" 클릭

### 2.4 Spreadsheet ID 확인
스프레드시트 URL에서 ID 확인:
```
https://docs.google.com/spreadsheets/d/[이 부분이 SPREADSHEET_ID]/edit
```

---

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
# 다운로드한 JSON 파일에서 client_email 값
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@your-project.iam.gserviceaccount.com

# 다운로드한 JSON 파일에서 private_key 값 (따옴표 포함, \n 그대로)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"

# 스프레드시트 URL에서 확인한 ID
GOOGLE_SPREADSHEET_ID=1234567890abcdefghijklmnop
```

### 주의사항
- `GOOGLE_PRIVATE_KEY`는 JSON 파일의 `private_key` 값을 **그대로** 복사
- 줄바꿈(`\n`)을 실제 줄바꿈으로 변환하지 마세요
- `.env.local` 파일은 절대 git에 커밋하지 마세요

---

## 4. 테스트

### 4.1 개발 서버 실행
```bash
npm run dev
```

### 4.2 동작 확인
1. http://localhost:3001 접속
2. 여러 페이지 탐색
3. Google Spreadsheet에서 데이터 확인
4. http://localhost:3001/admin 에서 통계 확인

---

## 5. 수집되는 데이터

### Sessions 시트
| 필드 | 설명 |
|------|------|
| sessionId | 고유 세션 식별자 |
| ip | 방문자 IP 주소 |
| city | 도시 (ip-api.com 기반) |
| region | 지역/도 |
| country | 국가 코드 |
| device | mobile / desktop |
| browser | Chrome, Safari 등 |
| referrer | 유입 경로 |
| startTime | 세션 시작 시간 |

### PageViews 시트
| 필드 | 설명 |
|------|------|
| sessionId | 세션 식별자 |
| page | 페이지 경로 |
| enterTime | 페이지 진입 시간 |
| exitTime | 페이지 이탈 시간 |
| duration | 체류 시간 (초) |

---

## 6. 문제 해결

### "통계 데이터를 불러올 수 없습니다" 오류
1. 환경 변수가 올바르게 설정되었는지 확인
2. 서비스 계정 이메일이 스프레드시트에 공유되었는지 확인
3. 시트 이름이 정확히 "Sessions", "PageViews"인지 확인
4. 개발 서버 재시작

### 데이터가 저장되지 않음
1. 브라우저 개발자 도구 → Network 탭에서 /api/track 요청 확인
2. 서버 콘솔에서 에러 메시지 확인
3. Google Sheets API 할당량 확인

---

## 7. Vercel 배포 시 환경 변수 설정

Vercel에 배포할 때 환경 변수를 설정하는 방법입니다.

### 7.1 Vercel 대시보드에서 설정 (권장)

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 (예: sungwon-landing-official)
3. 상단 탭에서 **"Settings"** 클릭
4. 좌측 메뉴에서 **"Environment Variables"** 클릭
5. 다음 환경 변수를 하나씩 추가:

#### GOOGLE_SERVICE_ACCOUNT_EMAIL
| 항목 | 값 |
|------|-----|
| Name | `GOOGLE_SERVICE_ACCOUNT_EMAIL` |
| Value | `your-service@your-project.iam.gserviceaccount.com` |
| Environment | Production, Preview, Development 모두 체크 |

**"Add"** 버튼 클릭

#### GOOGLE_PRIVATE_KEY
| 항목 | 값 |
|------|-----|
| Name | `GOOGLE_PRIVATE_KEY` |
| Value | (아래 참고) |
| Environment | Production, Preview, Development 모두 체크 |

**Value 입력 방법:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFA...
(중간 키 내용)
...xyzABC123==
-----END PRIVATE KEY-----
```

> **중요:** Vercel에서는 `\n`을 실제 줄바꿈으로 변환하여 입력해야 합니다.
> JSON 파일의 `private_key` 값에서 `\n`을 실제 Enter로 바꿔서 입력하세요.

**"Add"** 버튼 클릭

#### GOOGLE_SPREADSHEET_ID
| 항목 | 값 |
|------|-----|
| Name | `GOOGLE_SPREADSHEET_ID` |
| Value | `1234567890abcdefghijklmnop` |
| Environment | Production, Preview, Development 모두 체크 |

**"Add"** 버튼 클릭

### 7.2 Vercel CLI로 설정

터미널에서 직접 환경 변수를 설정할 수도 있습니다.

```bash
# Vercel CLI 설치 (이미 설치되어 있다면 생략)
npm i -g vercel

# 프로젝트 디렉토리에서 로그인
vercel login

# 환경 변수 추가
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
# 값 입력 후 Enter, Production/Preview/Development 선택

vercel env add GOOGLE_PRIVATE_KEY
# 값 입력 (여러 줄인 경우 따옴표로 감싸기)

vercel env add GOOGLE_SPREADSHEET_ID
# 값 입력 후 Enter
```

### 7.3 환경 변수 설정 후 재배포

환경 변수를 추가한 후에는 **재배포**가 필요합니다.

**방법 1: Vercel 대시보드에서**
1. 프로젝트 → "Deployments" 탭
2. 가장 최근 배포 우측의 **"..."** 클릭
3. **"Redeploy"** 선택

**방법 2: CLI로**
```bash
vercel --prod
```

**방법 3: Git Push**
```bash
git add .
git commit -m "trigger redeploy"
git push
```

### 7.4 환경 변수 확인

배포 후 환경 변수가 제대로 적용되었는지 확인:

1. Vercel 대시보드 → 프로젝트 → "Settings" → "Environment Variables"
2. 설정한 3개의 변수가 모두 표시되는지 확인
3. 각 변수 옆의 **눈 아이콘**을 클릭하면 값 확인 가능

### 7.5 PRIVATE_KEY 문제 해결

Vercel에서 `GOOGLE_PRIVATE_KEY` 관련 오류가 발생하면:

#### 오류: "error:1E08010C:DECODER routines::unsupported"
- `\n`이 문자열 그대로 들어간 경우
- 해결: 실제 줄바꿈으로 변환하여 다시 입력

#### 오류: "Invalid PEM formatted message"
- 키 형식이 잘못된 경우
- 해결: JSON 파일에서 `private_key` 값을 정확히 복사

#### 테스트 방법
배포된 사이트에서:
1. 브라우저 개발자 도구 (F12) → Network 탭
2. 페이지 새로고침
3. `/api/track` 요청 확인
4. 응답이 `{"success":true}` 이면 정상
5. `{"success":true,"skipped":true}` 이면 환경 변수 미설정

---

## 8. 요약 체크리스트

배포 전 확인사항:

- [ ] Google Cloud Console에서 프로젝트 생성
- [ ] Google Sheets API 활성화
- [ ] 서비스 계정 생성 및 JSON 키 다운로드
- [ ] Google Spreadsheet 생성 (Sessions, PageViews 시트)
- [ ] 서비스 계정 이메일에 스프레드시트 편집 권한 부여
- [ ] 로컬 `.env.local`에 환경 변수 설정 및 테스트
- [ ] Vercel 환경 변수 설정 (3개)
- [ ] 재배포 후 트래킹 동작 확인
