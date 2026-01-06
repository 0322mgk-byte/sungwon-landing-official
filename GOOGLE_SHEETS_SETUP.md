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

## 7. 배포 시 주의사항

Vercel 등에 배포할 때:
1. 환경 변수를 배포 플랫폼에 설정
2. `GOOGLE_PRIVATE_KEY`의 `\n`이 제대로 처리되는지 확인
3. 일부 플랫폼에서는 `\n`을 실제 줄바꿈으로 변환해야 할 수 있음
