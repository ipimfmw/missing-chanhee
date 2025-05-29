import React, { type JSX } from 'react';
import type { TileMap as TileMapType, TileAtlas, LogicGrid } from '@/types/map';

interface TileMapProps {
  map: TileMapType;
  logicGrid: LogicGrid;
  tileAtlas: TileAtlas;
  playerX: number;
  playerY: number;
  cameraX: number;
  cameraY: number;
  viewportW: number;
  viewportH: number;
}

export const TileMap: React.FC<TileMapProps> = ({
  map, logicGrid, tileAtlas, playerX, playerY, cameraX, cameraY, viewportW, viewportH,
}) => {
  const { tileSize } = map;
  const tiles: JSX.Element[] = [];

  // 디버깅용 로그
  console.log('TileMap render:', { 
    mapSize: `${map.width}x${map.height}`, 
    viewport: `${viewportW}x${viewportH}`,
    camera: `(${cameraX}, ${cameraY})`,
    player: `(${playerX}, ${playerY})`,
    tilesLength: map.tiles.length
  });

  for (let row = 0; row < viewportH; row++) {
    for (let col = 0; col < viewportW; col++) {
      const mapY = cameraY + row;
      const mapX = cameraX + col;
      
      // 맵 범위 체크
      if (mapY >= 0 && mapY < map.height && mapX >= 0 && mapX < map.width) {
        const idx = map.tiles[mapY]?.[mapX] ?? 0;
        const atlas = tileAtlas[idx] || tileAtlas[0]; // 기본값으로 첫 번째 타일
        const isPlayer = mapX === playerX && mapY === playerY;
        
        tiles.push(
          <div
            key={`${row}-${col}`}
            className="tile-cell"
            style={{
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              backgroundColor: atlas.color,
              border: '1px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              fontSize: `${tileSize * 0.7}px`,
            }}
          >
            {atlas.icon && <span>{atlas.icon}</span>}
            {isPlayer && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              >
                <span style={{ fontSize: '24px' }}>👾</span>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  borderRadius: '2px', 
                  padding: '1px 2px',
                  marginTop: '-4px'
                }}>YOU</span>
              </div>
            )}
          </div>
        );
      } else {
        // 맵 범위를 벗어난 경우 빈 타일
        tiles.push(
          <div
            key={`${row}-${col}`}
            className="tile-cell"
            style={{
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              backgroundColor: '#000',
              border: '1px solid #222',
            }}
          />
        );
      }
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${viewportW}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${viewportH}, ${tileSize}px)`,
        gap: '0px',
        width: `${viewportW * tileSize}px`,
        height: `${viewportH * tileSize}px`,
        border: '4px solid #000',
        backgroundColor: '#111',
        overflow: 'hidden',
      }}
    >
      {tiles}
    </div>
  );
}; 