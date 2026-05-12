# 🚀 CosAtelier - 빠른 시작 가이드

코스프레 올인원 지원 앱 **CosAtelier**를 친구들과 공유하세요!

## 📱 앱 소개

**CosAtelier**는 코스프레 제작부터 행사 참가까지 모든 과정을 한곳에서 관리하는 앱입니다.

**주요 기능:**
- 🎭 **캐릭터 체크리스트**: 캐릭터별 제작 과정 단계별 관리
- 📸 **사진 업로드**: 캐릭터 사진 추가 및 공유
- 🌐 **공유 기능**: 친구들과 캐릭터 공유 (코넥트 앱처럼)
- 🛒 **스마트 쇼핑**: 쇼핑 링크 관리
- 🎪 **현장 도우미**: QR 명함, 레퍼런스 뷰어
- 💬 **매칭 채팅**: 사진사/코스어 연결
- 🗺️ **행사장 지도**: 네이버 지도 기반 편의시설 검색
- 📋 **생존 키트**: 행사 필수 준비물 체크리스트
- 🔧 **제작 공정**: 제작 프로젝트 진행률 관리

## 🎨 디자인 특징

- 🌟 **테라코타/주황색 그래디언트** 테마
- 📱 **모바일 최적화**: 스마트폰에서 완벽하게 작동
- ✨ **부드러운 애니메이션**: Framer Motion으로 구현된 프리미엄 UI
- 🌐 **PWA 지원**: 홈 화면에 추가하면 앱처럼 사용 가능
- 📴 **오프라인 지원**: 인터넷 없어도 이전 데이터 사용 가능

## 🚀 배포하기 (친구들과 공유)

### 1단계: GitHub에 코드 올리기

```bash
# GitHub 저장소 생성 후 다음 명령어 실행
cd /home/ubuntu/cosatelier-redesign

git init
git add .
git commit -m "CosAtelier - Cosplay Support App"
git remote add origin https://github.com/YOUR_USERNAME/cosatelier.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel에 배포

1. **vercel.com** 접속
2. GitHub 계정으로 로그인
3. **"Add New" → "Project"** 클릭
4. **cosatelier** 저장소 선택
5. **Deploy** 버튼 클릭
6. 배포 완료 (약 2-3분)

### 3단계: 친구들과 공유

배포 완료 후 생성되는 URL을 친구들에게 공유:
```
https://cosatelier-[random].vercel.app
```

친구들이 이 URL에 접속하면 앱을 사용할 수 있습니다!

## 📖 상세 가이드

더 자세한 배포 방법은 다음 문서를 참고하세요:
- **DEPLOYMENT_GUIDE.md**: 단계별 배포 가이드
- **DEPLOYMENT_CHECKLIST.md**: 배포 전 체크리스트

## 💡 사용 팁

### 홈 화면에 추가 (PWA)
1. 스마트폰 브라우저에서 앱 URL 접속
2. 주소창 아래 "설치" 또는 "홈 화면에 추가" 버튼 클릭
3. 앱처럼 사용 가능!

### 캐릭터 공유하기
1. 체크리스트 페이지에서 캐릭터 추가
2. 사진 업로드 (선택사항)
3. **"공유하기"** 버튼 클릭
4. 다른 사용자들이 "공유 캐릭터" 탭에서 볼 수 있음

### 오프라인 사용
- 한 번 접속한 페이지는 인터넷 없어도 캐시에서 표시됨
- 데이터는 로컬 저장소에 저장되어 오프라인에서도 사용 가능

## 🔧 기술 스택

- **프론트엔드**: React 19 + TypeScript + Vite
- **스타일**: TailwindCSS 4 + Framer Motion
- **라우팅**: Wouter
- **UI 컴포넌트**: shadcn/ui
- **데이터 저장**: localStorage (Firebase 선택적)
- **배포**: Vercel

## 📝 주요 파일

```
cosatelier-redesign/
├── client/
│   ├── src/
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── contexts/       # React Context
│   │   ├── lib/            # 유틸리티
│   │   ├── App.tsx         # 라우팅
│   │   └── index.css       # 전역 스타일
│   ├── public/             # PWA 설정
│   └── index.html          # HTML 진입점
├── DEPLOYMENT_GUIDE.md     # 배포 가이드
├── DEPLOYMENT_CHECKLIST.md # 배포 체크리스트
└── package.json            # 의존성
```

## ❓ 자주 묻는 질문

**Q: 배포 후 코드를 수정하려면?**
A: 로컬에서 수정 후 `git push`하면 Vercel이 자동으로 재배포합니다.

**Q: 친구들의 데이터가 내 기기에 보이나?**
A: 아니요. 각 사용자의 개인 캐릭터는 자신의 기기에만 저장됩니다. 공유 캐릭터만 모두가 볼 수 있습니다.

**Q: 오프라인에서 사용할 수 있나?**
A: 네. 한 번 접속한 페이지는 오프라인에서도 사용 가능합니다. (PWA 기능)

**Q: 커스텀 도메인을 사용할 수 있나?**
A: 네. Vercel에서 유료로 커스텀 도메인을 구매하고 연결할 수 있습니다.

## 🎉 완료!

이제 친구들과 CosAtelier를 함께 사용할 준비가 되었습니다!

배포 과정에서 문제가 생기면 DEPLOYMENT_GUIDE.md의 "문제 해결" 섹션을 참고하세요.

---

**Happy Cosplaying! 🎭✨**
