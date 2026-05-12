# 소셜 로그인 설정 가이드

CosAtelier에 구글과 카카오 소셜 로그인을 연동하는 방법입니다.

## 📋 현재 상태

- ✅ **로그인 UI**: 구글, 카카오, 익명 로그인 모달 완성
- ✅ **로컬 테스트**: localStorage 기반 로그인 작동
- ⏳ **Firebase 연동**: 실제 배포 시 설정 필요

## 🚀 배포 전 설정

### 1단계: Firebase 프로젝트 생성

1. **firebase.google.com** 접속
2. "프로젝트 만들기" 클릭
3. 프로젝트명: `cosatelier`
4. Google Analytics 활성화 (선택)
5. 프로젝트 생성

### 2단계: Firebase Google 로그인 활성화

1. Firebase 콘솔 → **Authentication** 클릭
2. **Sign-in method** 탭
3. **Google** 클릭
4. **활성화** 토글 ON
5. 프로젝트 지원 이메일 선택
6. **저장** 클릭

### 3단계: 구글 OAuth 2.0 자격증명 생성

1. **Google Cloud Console** 접속 (console.cloud.google.com)
2. Firebase에서 생성한 프로젝트 선택
3. **APIs & Services** → **Credentials**
4. **+ Create Credentials** → **OAuth 2.0 Client IDs**
5. **Application type**: Web application
6. **Authorized JavaScript origins** 추가:
   ```
   http://localhost:3000
   https://cosatelier-xxx.vercel.app
   ```
7. **Authorized redirect URIs** 추가:
   ```
   http://localhost:3000/
   https://cosatelier-xxx.vercel.app/
   ```
8. **Create** 클릭
9. Client ID 복사

### 4단계: 카카오 로그인 설정

1. **developers.kakao.com** 접속
2. **내 애플리케이션** → **애플리케이션 추가**
3. 앱 이름: `CosAtelier`
4. **저장** 클릭
5. **앱 설정** → **일반**
6. **REST API 키** 복사
7. **보안** → **Redirect URI** 추가:
   ```
   http://localhost:3000/
   https://cosatelier-xxx.vercel.app/
   ```

### 5단계: 환경 변수 설정

`.env.local` 파일 생성:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Kakao OAuth
VITE_KAKAO_APP_KEY=your_kakao_rest_api_key
```

### 6단계: Vercel 환경 변수 설정

1. Vercel 프로젝트 설정
2. **Environment Variables** 탭
3. 위의 환경 변수들 추가
4. **Deploy** 클릭

## 🔧 구현 상세

### 로그인 흐름

```
사용자 클릭 "로그인"
    ↓
LoginModal 표시
    ↓
"구글로 로그인" / "카카오로 로그인" / "익명으로 시작" 선택
    ↓
AuthContext에서 해당 함수 실행
    ↓
Firebase Authentication 또는 로컬 저장
    ↓
사용자 정보 localStorage에 저장
    ↓
UserProfile 컴포넌트에 표시
```

### 파일 구조

```
client/src/
├── contexts/
│   └── AuthContext.tsx          # 인증 상태 관리
├── components/
│   ├── LoginModal.tsx           # 로그인 모달 UI
│   └── UserProfile.tsx          # 사용자 프로필 메뉴
└── lib/
    └── firebase.ts              # Firebase 초기화 (선택)
```

## 🧪 로컬 테스트

1. **로그인 버튼 클릭**: 우측 상단 "로그인" 버튼
2. **로그인 방법 선택**: 구글, 카카오, 익명 중 선택
3. **프로필 확인**: 로그인 후 프로필 아이콘 클릭
4. **로그아웃**: 프로필 메뉴에서 "로그아웃" 클릭

## 📱 기능

### 로그인 후

- ✅ 사용자 프로필 표시 (이름, 사진)
- ✅ 여러 기기에서 데이터 동기화
- ✅ 로그아웃 기능
- ✅ 사용자별 캐릭터 저장

### 데이터 동기화

현재는 localStorage 기반이지만, Firebase 연동 후:
- 클라우드에 사용자 데이터 저장
- 여러 기기에서 실시간 동기화
- 오프라인 지원 (캐시)

## 🔐 보안 주의사항

1. **API 키 노출 금지**: `.env` 파일을 `.gitignore`에 추가
2. **HTTPS 필수**: 배포 시 HTTPS 사용 (Vercel 자동)
3. **Redirect URI 정확히**: 정확한 도메인만 등록
4. **클라이언트 ID**: 공개해도 되지만, 시크릿은 절대 공개 금지

## ❓ 문제 해결

### "로그인 실패" 에러
- 환경 변수가 올바르게 설정되었는지 확인
- Firebase 프로젝트가 활성화되었는지 확인
- Redirect URI가 정확한지 확인

### "CORS 에러"
- Authorized JavaScript origins에 현재 도메인 추가
- Vercel 배포 후 새 도메인 추가

### "사용자 정보 표시 안 됨"
- localStorage 확인: DevTools → Application → Local Storage
- 로그인 상태 확인: UserProfile 컴포넌트 렌더링 확인

## 🎉 다음 단계

1. **Firebase 연동**: 실제 인증 구현
2. **사용자 프로필 페이지**: 사용자 정보 수정 페이지
3. **계정 연동**: 여러 소셜 계정 연결
4. **2FA**: 2단계 인증 추가

---

**배포 후 친구들이 쉽게 가입할 수 있습니다!** 🚀
