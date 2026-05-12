@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  /* 아이소메트릭 디자인 - 테라코타/주황색 그래디언트 */
  --primary: oklch(0.65 0.22 40);
  --primary-foreground: oklch(1 0 0);
  --sidebar-primary: oklch(0.60 0.20 38);
  --sidebar-primary-foreground: oklch(1 0 0);
  
  /* 악센트 - 골드/샌드 */
  --accent: oklch(0.75 0.15 60);
  --accent-foreground: oklch(0.2 0.05 40);
  
  /* 차트 색상 */
  --chart-1: oklch(0.65 0.22 40);
  --chart-2: oklch(0.75 0.15 60);
  --chart-3: oklch(0.55 0.18 35);
  --chart-4: oklch(0.70 0.20 45);
  --chart-5: oklch(0.60 0.20 38);
  
  --radius: 0.65rem;
  
  /* 배경 - 진한 그래디언트 */
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 65);
  
  /* 카드 */
  --card: oklch(0.22 0.03 280);
  --card-foreground: oklch(0.95 0.01 65);
  
  /* 팝오버 */
  --popover: oklch(0.22 0.03 280);
  --popover-foreground: oklch(0.95 0.01 65);
  
  /* 보조 색상 */
  --secondary: oklch(0.25 0.04 280);
  --secondary-foreground: oklch(0.90 0.02 65);
  
  /* 음소거 */
  --muted: oklch(0.30 0.03 280);
  --muted-foreground: oklch(0.75 0.02 65);
  
  /* 파괴적 */
  --destructive: oklch(0.65 0.25 25);
  --destructive-foreground: oklch(1 0 0);
  
  /* 테두리 및 입력 */
  --border: oklch(0.35 0.04 280);
  --input: oklch(0.35 0.04 280);
  --ring: oklch(0.65 0.22 40);
  
  /* 사이드바 */
  --sidebar: oklch(0.22 0.03 280);
  --sidebar-foreground: oklch(0.95 0.01 65);
  --sidebar-accent: oklch(0.30 0.03 280);
  --sidebar-accent-foreground: oklch(0.95 0.01 65);
  --sidebar-border: oklch(0.35 0.04 280);
  --sidebar-ring: oklch(0.65 0.22 40);
}

.dark {
  --primary: oklch(0.65 0.22 40);
  --primary-foreground: oklch(1 0 0);
  --sidebar-primary: oklch(0.60 0.20 38);
  --sidebar-primary-foreground: oklch(1 0 0);
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 65);
  --card: oklch(0.22 0.03 280);
  --card-foreground: oklch(0.95 0.01 65);
  --popover: oklch(0.22 0.03 280);
  --popover-foreground: oklch(0.95 0.01 65);
  --secondary: oklch(0.25 0.04 280);
  --secondary-foreground: oklch(0.90 0.02 65);
  --muted: oklch(0.30 0.03 280);
  --muted-foreground: oklch(0.75 0.02 65);
  --accent: oklch(0.75 0.15 60);
  --accent-foreground: oklch(0.2 0.05 40);
  --destructive: oklch(0.65 0.25 25);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.35 0.04 280);
  --input: oklch(0.35 0.04 280);
  --ring: oklch(0.65 0.22 40);
  --chart-1: oklch(0.65 0.22 40);
  --chart-2: oklch(0.75 0.15 60);
  --chart-3: oklch(0.55 0.18 35);
  --chart-4: oklch(0.70 0.20 45);
  --chart-5: oklch(0.60 0.20 38);
  --sidebar: oklch(0.22 0.03 280);
  --sidebar-foreground: oklch(0.95 0.01 65);
  --sidebar-accent: oklch(0.30 0.03 280);
  --sidebar-accent-foreground: oklch(0.95 0.01 65);
  --sidebar-border: oklch(0.35 0.04 280);
  --sidebar-ring: oklch(0.65 0.22 40);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    background: linear-gradient(135deg, oklch(0.12 0.02 280) 0%, oklch(0.18 0.03 300) 100%);
  }
  button:not(:disabled),
  [role="button"]:not([aria-disabled="true"]),
  [type="button"]:not(:disabled),
  [type="submit"]:not(:disabled),
  [type="reset"]:not(:disabled),
  a[href],
  select:not(:disabled),
  input[type="checkbox"]:not(:disabled),
  input[type="radio"]:not(:disabled) {
    @apply cursor-pointer;
  }
}

@layer components {
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .flex {
    min-height: 0;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding-left: 2rem;
      padding-right: 2rem;
      max-width: 1280px;
    }
  }

  /* 아이소메트릭 스타일 */
  .isometric-card {
    @apply rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .isometric-card:hover {
    @apply border-primary/50;
    box-shadow: 0 30px 80px rgba(207, 102, 50, 0.3);
    transform: translateY(-4px);
  }

  /* 그래디언트 텍스트 */
  .gradient-text {
    background: linear-gradient(135deg, oklch(0.65 0.22 40) 0%, oklch(0.75 0.15 60) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* 3D 변환 */
  .perspective-3d {
    perspective: 1200px;
  }

  .transform-3d {
    transform-style: preserve-3d;
  }

  /* 글로우 효과 */
  .glow-primary {
    box-shadow: 0 0 40px rgba(207, 102, 50, 0.3), inset 0 0 40px rgba(207, 102, 50, 0.1);
  }

  .glow-accent {
    box-shadow: 0 0 30px rgba(230, 180, 80, 0.2);
  }
}

/* 애니메이션 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: translateY(-20px) rotateX(2deg) rotateY(2deg);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 40px rgba(207, 102, 50, 0.3);
  }
  50% {
    box-shadow: 0 0 60px rgba(207, 102, 50, 0.5);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 3s infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
