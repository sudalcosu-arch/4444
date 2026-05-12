# CosAtelier 배포 가이드

친구들과 앱을 공유하기 위해 Vercel에 배포하는 방법을 안내합니다.

## 📋 사전 준비

1. **GitHub 계정** (없으면 github.com에서 가입)
2. **Vercel 계정** (없으면 vercel.com에서 가입)

## 🚀 배포 단계

### 1단계: GitHub에 코드 올리기

#### 1-1. GitHub 저장소 생성
- github.com에 로그인
- 우측 상단 `+` → `New repository` 클릭
- Repository name: `cosatelier` (또는 원하는 이름)
- Public 선택 (친구들이 접속할 수 있도록)
- `Create repository` 클릭

#### 1-2. 로컬에서 코드 푸시
터미널에서 다음 명령어 실행:

```bash
cd /home/ubuntu/cosatelier-redesign

# Git 초기화 (이미 되어있으면 스킵)
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "CosAtelier - Cosplay Support App"

# GitHub 저장소 연결 (YOUR_USERNAME을 자신의 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/cosatelier.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 2단계: Vercel에 배포

#### 2-1. Vercel 로그인
- vercel.com에 로그인
- GitHub 계정으로 로그인하면 더 편함

#### 2-2. 프로젝트 임포트
- Vercel 대시보드에서 `Add New...` → `Project` 클릭
- `Import Git Repository` 선택
- GitHub에서 `cosatelier` 저장소 선택

#### 2-3. 프로젝트 설정
- **Project Name**: `cosatelier` (또는 원하는 이름)
- **Framework Preset**: `Other` 선택
- **Root Directory**: `./` (기본값)
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`

#### 2-4. 배포 시작
- `Deploy` 버튼 클릭
- 배포 진행 (약 2-3분 소요)
- 완료되면 공개 URL 제공됨

### 3단계: 친구들과 공유

배포 완료 후 생성된 URL을 친구들에게 공유:
```
https://cosatelier-[random].vercel.app
```

친구들이 이 URL에 접속하면 앱을 사용할 수 있습니다!

## ⚙️ 환경 변수 설정 (Firebase 사용 시)

Firebase를 사용하려면:

1. Vercel 프로젝트 설정 → `Environment Variables`
2. 다음 변수 추가:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## 🔄 코드 업데이트

로컬에서 코드를 수정한 후:

```bash
git add .
git commit -m "설명"
git push origin main
```

Vercel이 자동으로 감지하여 재배포합니다!

## 📱 친구들이 앱 사용하기

1. 공유받은 URL에 접속
2. "시작하기" 버튼 클릭
3. 캐릭터 추가, 사진 업로드 등 사용 가능
4. 공유 캐릭터로 추가하면 다른 사람도 볼 수 있음

## 💡 팁

- **PWA 설치**: 스마트폰 브라우저에서 "홈 화면에 추가" 선택하면 앱처럼 사용 가능
- **오프라인 지원**: 인터넷 끊겨도 이전에 본 데이터는 캐시에서 표시
- **커스텀 도메인**: Vercel에서 유료로 커스텀 도메인 구매 가능

## ❓ 문제 해결

**배포 실패:**
- `pnpm install` 오류 → `pnpm install --legacy-peer-deps` 시도
- 빌드 오류 → Vercel 로그 확인

**앱이 느림:**
- 첫 로드 시 느릴 수 있음 (정상)
- 새로고침 후 빨라짐

**데이터 공유 안 됨:**
- 공유 캐릭터로 저장했는지 확인
- 브라우저 캐시 삭제 후 새로고침

## 🎉 완료!

이제 친구들과 CosAtelier를 함께 사용할 수 있습니다!
