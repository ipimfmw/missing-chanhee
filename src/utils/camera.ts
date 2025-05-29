// 플레이어 중심 렌더 버퍼 좌상단 좌표 계산
export const getRenderBufferTopLeft = (
  playerX: number,
  playerY: number,
  mapWidth: number,
  mapHeight: number,
  bufferW: number,
  bufferH: number
) => {
  const halfW = Math.floor(bufferW / 2);
  const halfH = Math.floor(bufferH / 2);
  let left = playerX - halfW;
  let top = playerY - halfH;
  // 맵 경계 보정
  left = Math.max(0, Math.min(left, mapWidth - bufferW));
  top = Math.max(0, Math.min(top, mapHeight - bufferH));
  return { left, top };
};

// 뷰포트 좌상단 (렌더 버퍼 내 상대 좌표)
export const getViewportTopLeftInBuffer = (
  playerX: number,
  playerY: number,
  bufferW: number,
  bufferH: number,
  viewportW: number,
  viewportH: number,
  bufferX: number,
  bufferY: number
) => {
  const playerInBufferX = playerX - bufferX;
  const playerInBufferY = playerY - bufferY;
  const viewportHalfW = Math.floor(viewportW / 2);
  const viewportHalfH = Math.floor(viewportH / 2);
  let left = playerInBufferX - viewportHalfW;
  let top = playerInBufferY - viewportHalfH;
  left = Math.max(0, Math.min(left, bufferW - viewportW));
  top = Math.max(0, Math.min(top, bufferH - viewportH));
  return { left, top };
};

export const getCameraTopLeft = (
  playerX: number,
  playerY: number,
  mapW: number,
  mapH: number,
  viewportW: number,
  viewportH: number
) => {
  let cameraX = playerX - Math.floor(viewportW / 2);
  let cameraY = playerY - Math.floor(viewportH / 2);
  cameraX = Math.max(0, Math.min(cameraX, mapW - viewportW));
  cameraY = Math.max(0, Math.min(cameraY, mapH - viewportH));
  return { cameraX, cameraY };
}; 