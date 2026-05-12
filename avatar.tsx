/**
 * SyncStatus Component
 * Firebase 동기화 상태를 표시하는 UI (로컬 모드 포함)
 */

import { useFirebase } from '@/contexts/FirebaseContext';
import { Cloud, CloudOff, AlertCircle, Loader2, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SyncStatus() {
  const { isLoading, isConnected, syncError, isLocalMode } = useFirebase();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
        <Loader2 size={14} className="animate-spin text-primary" />
        <span className="text-xs font-medium text-muted-foreground">초기화 중...</span>
      </div>
    );
  }

  if (isLocalMode) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
        <HardDrive size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">로컬 모드</span>
      </div>
    );
  }

  if (syncError) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/30">
        <AlertCircle size={14} className="text-destructive" />
        <span className="text-xs font-medium text-destructive">동기화 오류</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300',
        isConnected
          ? 'bg-primary/10 border-primary/30'
          : 'bg-muted/50 border-border/50'
      )}
    >
      {isConnected ? (
        <>
          <Cloud size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary">클라우드 동기화</span>
        </>
      ) : (
        <>
          <CloudOff size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">로컬 모드</span>
        </>
      )}
    </div>
  );
}

export default SyncStatus;
