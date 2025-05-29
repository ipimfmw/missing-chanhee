// 타일 종류
export type TileType = 'grass' | 'water' | 'wall' | 'sand' | 'tree';

// 단일 타일 정보
export interface Tile {
  type: TileType;
  walkable: boolean;
}

// 맵 레이어 (배경, 오브젝트, 이벤트)
export type MapLayer = 'background' | 'objects' | 'events';

// 전체 맵 구조 (레이어별 2차원 배열)
export interface GameMap {
  width: number;
  height: number;
  layers: {
    [key in MapLayer]: Tile[][];
  };
}

// 타일맵 타입
export interface TileMap {
  width: number;
  height: number;
  tileSize: number;
  tiles: number[][];
}

// 타일 아틀라스(색상/아이콘/이미지 등)
export interface TileAtlasEntry {
  name: string;
  color: string;
  icon?: string;
  walkable: boolean;
}
export type TileAtlas = TileAtlasEntry[];

// 논리 그리드(충돌 등)
export type LogicGrid = number[][]; 