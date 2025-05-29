import type { TileMap, LogicGrid } from '@/types/map';

export const isWalkable = (map: TileMap, logicGrid: LogicGrid, x: number, y: number) => {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  return logicGrid[y][x] === 0;
}; 