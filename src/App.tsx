import { useEffect } from 'react';
import { TileMap } from '@/components/TileMap';
import { dummyMap, tileAtlas, logicGrid } from '@/data/dummyMap';
import { usePlayerStore } from '@/stores/playerStore';
import { getCameraTopLeft } from '@/utils/camera';
import { isWalkable } from '@/utils/mapUtils';

const VIEWPORT_W = 20;
const VIEWPORT_H = 20;

function App() {
  const { x, y, move } = usePlayerStore();

  // 카메라 위치 계산
  const { cameraX, cameraY } = getCameraTopLeft(
    x, y, dummyMap.width, dummyMap.height, VIEWPORT_W, VIEWPORT_H
  );

  // 키보드 이동 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key); // 디버깅용 로그
      
      let dx = 0, dy = 0;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;
      
      if (dx !== 0 || dy !== 0) {
        const nx = x + dx;
        const ny = y + dy;
        console.log(`Trying to move to: (${nx}, ${ny})`); // 디버깅용 로그
        
        if (isWalkable(dummyMap, logicGrid, nx, ny)) {
          console.log(`Move successful to: (${nx}, ${ny})`); // 디버깅용 로그
          move(dx, dy);
        } else {
          console.log(`Move blocked to: (${nx}, ${ny})`); // 디버깅용 로그
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [x, y, move]);

  console.log('App render:', { player: `(${x}, ${y})`, camera: `(${cameraX}, ${cameraY})` }); // 디버깅용 로그

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
      <h1 className="text-2xl font-bold text-white mb-4">TileMap Demo (MDN 기반)</h1>
      <TileMap
        map={dummyMap}
        logicGrid={logicGrid}
        tileAtlas={tileAtlas}
        playerX={x}
        playerY={y}
        cameraX={cameraX}
        cameraY={cameraY}
        viewportW={VIEWPORT_W}
        viewportH={VIEWPORT_H}
      />
      <div className="mt-4 text-white text-sm">
        <div>플레이어 위치: ({x}, {y})</div>
        <div>카메라 좌상단: ({cameraX}, {cameraY})</div>
        <div>WASD/방향키로 이동 (벽/물/나무는 통과 불가)</div>
        <div className="text-xs text-gray-400 mt-2">
          브라우저 콘솔(F12)에서 디버깅 로그 확인 가능
        </div>
      </div>
    </div>
  );
}

export default App;
