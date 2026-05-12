# Firebase 설정 가이드

CosAtelier에서 기기 간 데이터 동기화를 위해 Firebase를 사용합니다.

## 1단계: Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `cosatelier`)
4. 프로젝트 생성 완료

## 2단계: 웹 앱 등록

1. Firebase 프로젝트 대시보드에서 "</>" (웹) 아이콘 클릭
2. 앱 이름 입력 (예: `CosAtelier Web`)
3. "앱 등록" 클릭
4. Firebase SDK 설정 정보 복사

## 3단계: Realtime Database 설정

1. Firebase 콘솔 좌측 메뉴에서 "Realtime Database" 선택
2. "데이터베이스 만들기" 클릭
3. 위치 선택 (예: `asia-southeast1` - 싱가포르)
4. 보안 규칙 선택: **테스트 모드** (개발용)
   ```json
   {
     "rules": {
       "users": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       }
     }
   }
   ```
5. "데이터베이스 만들기" 클릭

## 4단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

Firebase 콘솔의 "프로젝트 설정" → "앱" → "웹 앱 설정"에서 값을 복사하세요.

## 5단계: 익명 인증 활성화

1. Firebase 콘솔에서 "Authentication" 선택
2. "Sign-in method" 탭 클릭
3. "Anonymous" 활성화
4. "저장" 클릭

## 6단계: 테스트

앱을 실행하면 자동으로:
- 익명 사용자로 로그인
- 기존 로컬 데이터를 Firebase에 동기화
- 실시간 데이터 동기화 시작

## 데이터 구조

Firebase Realtime Database의 데이터 구조:

```
users/
  {userId}/
    characters/
      data: [...]
      timestamp: "2026-05-12T..."
    survivalKit/
      data: [...]
      timestamp: "2026-05-12T..."
    craftProjects/
      data: [...]
      timestamp: "2026-05-12T..."
    shoppingLinks/
      data: [...]
      timestamp: "2026-05-12T..."
    matchingProfiles/
      data: [...]
      timestamp: "2026-05-12T..."
    venueBookmarks/
      data: [...]
      timestamp: "2026-05-12T..."
```

## 보안 규칙 (프로덕션)

프로덕션 배포 전에 보안 규칙을 업데이트하세요:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['characters', 'survivalKit', 'craftProjects'])"
      }
    }
  }
}
```

## 트러블슈팅

### 데이터가 동기화되지 않음
- Firebase 콘솔에서 Realtime Database 연결 확인
- 환경 변수가 올바르게 설정되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 익명 인증 오류
- Firebase 콘솔에서 Anonymous 인증 활성화 확인
- 프로젝트 ID가 올바른지 확인

### 오프라인 모드
- 인터넷 연결이 없으면 로컬 스토리지에서만 작동
- 연결 복구 시 자동으로 동기화

## 비용

Firebase는 무료 계획(Spark Plan)에서:
- 동시 연결: 100개
- 저장소: 1GB
- 다운로드: 1GB/월

CosAtelier 같은 소규모 앱은 무료 계획으로 충분합니다.
