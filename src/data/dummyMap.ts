import type { TileMap, TileAtlas, LogicGrid } from '@/types/map';

// 0: grass, 1: wall, 2: water, 3: sand, 4: tree
export const tileAtlas: TileAtlas = [
  { name: 'grass', color: '#4ade80', icon: '', walkable: true },
  { name: 'wall', color: '#6b7280', icon: '🧱', walkable: false },
  { name: 'water', color: '#38bdf8', icon: '🌊', walkable: false },
  { name: 'sand', color: '#fde68a', icon: '', walkable: true },
  { name: 'tree', color: '#166534', icon: '🌳', walkable: false },
];

const WIDTH = 30;
const HEIGHT = 30;
const TILE_SIZE = 32;

// 패턴이 있는 맵 생성 (디버깅용)
const tiles: number[][] = [];
for (let y = 0; y < HEIGHT; y++) {
  const row: number[] = [];
  for (let x = 0; x < WIDTH; x++) {
    // 경계는 벽으로
    if (x === 0 || x === WIDTH - 1 || y === 0 || y === HEIGHT - 1) {
      row.push(1); // wall
    }
    // 플레이어 시작 위치 주변은 걸을 수 있게
    else if (Math.abs(x - 5) <= 2 && Math.abs(y - 5) <= 2) {
      row.push(0); // grass
    }
    // 나머지는 패턴으로
    else if ((x + y) % 4 === 0) {
      row.push(2); // water
    } else if ((x + y) % 3 === 0) {
      row.push(4); // tree
    } else if ((x + y) % 2 === 0) {
      row.push(3); // sand
    } else {
      row.push(0); // grass
    }
  }
  tiles.push(row);
}

// 논리 그리드(벽/물/나무는 1, 나머지는 0)
const logicGrid: LogicGrid = tiles.map(row =>
  row.map(idx => (tileAtlas[idx].walkable ? 0 : 1))
);

export const dummyMap: TileMap = {
  width: WIDTH,
  height: HEIGHT,
  tileSize: TILE_SIZE,
  tiles,
};

export { logicGrid }; 