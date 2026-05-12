# Firebase 통합 가이드

## 개요

CosAtelier는 이제 **Firebase Realtime Database**를 사용하여 기기 간 데이터 동기화를 지원합니다.

### 주요 기능

✅ **기기 간 동기화**: 한 기기에서 수정한 데이터가 다른 기기에 실시간으로 반영
✅ **오프라인 지원**: 인터넷이 없을 때도 로컬 스토리지에서 작동
✅ **자동 동기화**: 앱 시작 시 로컬 데이터와 클라우드 데이터 자동 병합
✅ **익명 로그인**: 회원가입 없이 자동으로 익명 계정 생성

## 구현된 기능

### 1. Firebase 인증 (FirebaseContext.tsx)

```typescript
// 앱 시작 시 자동으로 익명 사용자로 로그인
- 기존 세션 확인
- 없으면 새로운 익명 계정 생성
- Firebase 연결 상태 확인
- 로컬 데이터와 Firebase 동기화
```

### 2. 데이터 동기화 훅 (useFirebaseSync.ts)

```typescript
// 기존 useLocalStorage 대신 사용
const [data, setData, syncState] = useFirebaseSync(
  'characters',           // 로컬 스토리지 키
  initialValue,           // 초기값
  'characters'            // Firebase 경로
);

// syncState 객체:
// - isSyncing: 동기화 중인지 여부
// - lastSyncTime: 마지막 동기화 시간
// - syncError: 동기화 에러 메시지
```

### 3. 동기화 상태 표시 (SyncStatus.tsx)

헤더에 표시되는 동기화 상태 UI:
- 🟢 **클라우드 동기화**: Firebase 연결됨
- ⚫ **로컬 모드**: 오프라인 상태
- ⚠️ **동기화 오류**: 연결 문제 발생

### 4. Firebase 유틸리티 (firebase.ts)

```typescript
// 주요 함수들
signInAnonymousUser()           // 익명 로그인
onUserStateChanged(callback)    // 사용자 상태 모니터링
saveDataToFirebase(path, data)  // 데이터 저장
getDataFromFirebase(path)       // 데이터 조회
subscribeToFirebaseData(path)   // 실시간 구독
syncLocalStorageWithFirebase()  // 로컬-클라우드 동기화
```

## 적용된 페이지

### ChecklistPage
- `characters`: 캐릭터 데이터
- `survivalKit`: 생존 키트 체크리스트
- `craftProjects`: 제작 공정 기록

### 다른 페이지들
- 향후 ShoppingPage, FieldPage, MatchingPage, VenuePage에도 적용 가능

## 설정 방법

### 1단계: Firebase 프로젝트 생성

[FIREBASE_SETUP.md](./FIREBASE_SETUP.md) 참고

### 2단계: 환경 변수 설정

`.env.local` 파일 생성:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

### 3단계: 앱 실행

```bash
pnpm dev
```

앱이 자동으로:
1. 익명 사용자로 로그인
2. Firebase 연결 확인
3. 로컬 데이터 동기화
4. 실시간 구독 시작

## 데이터 흐름

```
┌─────────────────────────────────────────────────────┐
│                   CosAtelier App                     │
├─────────────────────────────────────────────────────┤
│                                                       │
│  useFirebaseSync Hook                               │
│  ├─ 로컬 스토리지에서 읽기/쓰기                       │
│  ├─ Firebase에 비동기 저장                           │
│  └─ 실시간 변경 구독                                 │
│                                                       │
├─────────────────────────────────────────────────────┤
│                 Firebase Realtime DB                 │
│  ├─ users/{userId}/characters                       │
│  ├─ users/{userId}/survivalKit                      │
│  ├─ users/{userId}/craftProjects                    │
│  └─ ...                                              │
└─────────────────────────────────────────────────────┘
```

## 오프라인 동작

1. **온라인 상태**: 모든 변경사항이 즉시 Firebase에 저장
2. **오프라인 상태**: 로컬 스토리지에만 저장
3. **복구 시**: 자동으로 Firebase와 동기화

## 보안 고려사항

### 현재 (개발 모드)
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

### 프로덕션 배포 전
- 데이터 유효성 검증 추가
- 속도 제한 설정
- 데이터 암호화 고려

## 트러블슈팅

### 데이터가 동기화되지 않음
```bash
# 1. 브라우저 콘솔 확인
# 2. Firebase 콘솔에서 Database 확인
# 3. 환경 변수 재확인
# 4. 앱 새로고침
```

### 익명 인증 오류
```bash
# Firebase 콘솔 > Authentication > Sign-in method
# Anonymous 활성화 확인
```

### 느린 동기화
```bash
# 1. 인터넷 연결 확인
# 2. Firebase 리전 확인 (asia-southeast1 권장)
# 3. 데이터 크기 확인
```

## 향후 개선 사항

- [ ] 사용자 계정 시스템 (이메일/소셜 로그인)
- [ ] 데이터 백업/복원
- [ ] 다중 기기 간 충돌 해결
- [ ] 데이터 암호화
- [ ] 오프라인 우선 모드
- [ ] 실시간 협업 기능

## 참고 자료

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
