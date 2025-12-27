const PROGRESS_KEY = "rotech-learning-progress";

export interface UserProgress {
  completedLevels: number[];
  currentLevel: number;
  lastVisited: string;
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { completedLevels: [], currentLevel: 1, lastVisited: new Date().toISOString() };
  }
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error reading progress:", e);
  }
  return { completedLevels: [], currentLevel: 1, lastVisited: new Date().toISOString() };
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      ...progress,
      lastVisited: new Date().toISOString(),
    }));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("rotech-progress-updated", { detail: progress }));
  } catch (e) {
    console.error("Error saving progress:", e);
  }
}

export function markLevelComplete(levelId: number): UserProgress {
  const progress = getProgress();
  
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
    progress.completedLevels.sort((a, b) => a - b);
  }
  
  const nextLevel = levelId + 1;
  if (nextLevel <= 8 && nextLevel > progress.currentLevel) {
    progress.currentLevel = nextLevel;
  }
  
  saveProgress(progress);
  return progress;
}

export function isLevelUnlocked(levelId: number, progress: UserProgress): boolean {
  if (levelId === 1) return true;
  return progress.completedLevels.includes(levelId - 1);
}

export function isLevelCompleted(levelId: number, progress: UserProgress): boolean {
  return progress.completedLevels.includes(levelId);
}

export function getNextUnlockedLevel(progress: UserProgress): number {
  for (let i = 1; i <= 8; i++) {
    if (isLevelUnlocked(i, progress) && !isLevelCompleted(i, progress)) {
      return i;
    }
  }
  return progress.completedLevels.length === 8 ? 8 : 1;
}
