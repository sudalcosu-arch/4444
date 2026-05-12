# PWA & 오프라인 지원 가이드

CosAtelier는 이제 **Progressive Web App (PWA)** 기능과 완벽한 **오프라인 지원**을 제공합니다.

## 🎯 주요 기능

### 1. PWA (Progressive Web App)

#### 홈 화면에 추가
- **iOS**: Safari 메뉴 → "홈 화면에 추가"
- **Android**: Chrome 메뉴 → "앱 설치" 또는 "홈 화면에 추가"
- **데스크톱**: Chrome 주소창 우측 설치 버튼

#### 설치 후
- 앱 아이콘으로 빠르게 실행
- 풀스크린 모드 (상단 주소창 없음)
- 앱처럼 부드러운 애니메이션
- 앱 전환기에 표시

### 2. 오프라인 지원

#### Service Worker
- 모든 정적 파일 자동 캐싱
- 인터넷 없을 때도 앱 작동
- 네트워크 복구 시 자동 동기화

#### 캐싱 전략
- **정적 자산** (JS, CSS, 이미지): 캐시 우선
- **HTML 페이지**: 네트워크 우선, 실패 시 캐시
- **API 요청**: 네트워크 우선, 폴백 캐시

## 📱 사용자 경험

### 설치 프롬프트
앱 첫 방문 시 설치 제안 알림이 표시됩니다.
- "설치" 버튼: 홈 화면에 추가
- "나중에" 버튼: 프롬프트 닫기

### 업데이트 알림
새 버전이 준비되면 업데이트 알림이 표시됩니다.
- "업데이트" 버튼: 새 버전 적용
- "나중에" 버튼: 다음에 업데이트

### 오프라인 모드
인터넷이 없을 때:
- 캐시된 페이지 자동 표시
- localStorage 데이터 정상 작동
- 네트워크 복구 시 자동 동기화

## 🔧 기술 구현

### manifest.json
- 앱 이름, 설명, 아이콘 정의
- 앱 테마 색상 설정
- 바로가기 메뉴 정의

### Service Worker (sw.js)
```javascript
// 캐싱 전략
- CACHE_NAME: 정적 자산 캐시
- RUNTIME_CACHE: 런타임 캐시
- API_CACHE: API 응답 캐시
```

### PWA 메타 태그 (index.html)
```html
<meta name="theme-color" content="#c91f7e" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="manifest" href="/manifest.json" />
```

## 📊 캐시 크기

- **정적 자산**: ~1MB (JS, CSS, 폰트)
- **런타임 캐시**: 동적 (페이지 방문 시 추가)
- **API 캐시**: 동적 (API 호출 시 추가)

브라우저 설정에서 캐시 관리 가능:
- Chrome DevTools → Application → Cache Storage
- 개별 캐시 삭제 가능

## 🚀 배포 체크리스트

- [x] manifest.json 생성
- [x] Service Worker 구현
- [x] PWA 메타 태그 추가
- [x] 설치 프롬프트 UI 추가
- [x] HTTPS 배포 (필수)
- [ ] 앱 스토어 등록 (선택)

## ⚠️ 주의사항

### HTTPS 필수
- Service Worker는 HTTPS에서만 작동
- localhost에서는 개발 목적으로 HTTP 허용

### 캐시 관리
- 정기적으로 오래된 캐시 삭제
- 사용자가 수동으로 캐시 삭제 가능

### 브라우저 호환성
| 기능 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| PWA 설치 | ✅ | ⚠️ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| 오프라인 | ✅ | ✅ | ✅ | ✅ |

## 🔍 테스트 방법

### 로컬 개발
```bash
pnpm dev
# localhost:3000에서 테스트
# Service Worker는 localhost에서만 작동
```

### 오프라인 테스트
1. Chrome DevTools 열기 (F12)
2. Network 탭 → "Offline" 체크
3. 페이지 새로고침
4. 캐시된 콘텐츠 표시 확인

### 설치 테스트
1. Chrome 주소창 우측 설치 버튼 클릭
2. 또는 개발자 도구 → Application → Manifest 확인

## 📚 참고 자료

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 🐛 트러블슈팅

### Service Worker가 등록되지 않음
- HTTPS 확인
- 브라우저 콘솔에서 에러 확인
- 캐시 삭제 후 재시도

### 오프라인에서 작동 안 함
- 페이지 한 번 방문 후 오프라인 테스트
- 캐시 크기 확인 (브라우저 저장소 한계)
- Service Worker 활성화 확인

### 설치 프롬프트가 표시 안 됨
- PWA 설치 조건 확인 (HTTPS, manifest.json)
- 이미 설치된 경우 표시 안 됨
- 브라우저 설정에서 앱 설치 허용 확인
