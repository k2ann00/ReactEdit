// frontends/src/components/SceneView.tsx

import React, { useEffect, useRef } from "react";
import { SceneData } from "../types/Scene";

interface SceneViewProps {
  scene: SceneData;
  onSceneChange: (scene: SceneData) => void;
  onSelectEntity: (entityId: string | null) => void;
  selectedEntityId: string | null;
}

export default function SceneView({
  scene,
  onSceneChange,
  onSelectEntity,
  selectedEntityId,
}: SceneViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Kamera transformu
    ctx.save();
    ctx.translate(-scene.camera.x, -scene.camera.y);
    ctx.scale(scene.camera.zoom, scene.camera.zoom);

    // Sahnedeki entity'leri çiz
    for (const entity of scene.entities) {
      // Seçili entity daha kalın bir kenarlıkla çizilsin
      if (entity.id === selectedEntityId) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
      }
      ctx.beginPath();
      ctx.rect(entity.x, entity.y, entity.width, entity.height);
      ctx.stroke();
    }

    ctx.restore();
  }, [scene, selectedEntityId]);

  // Kamera hareketleri
  const handleCameraMove = (dx: number, dy: number) => {
    const newCamera = {
      ...scene.camera,
      x: scene.camera.x + dx,
      y: scene.camera.y + dy,
    };
    onSceneChange({ ...scene, camera: newCamera });
  };

  const handleZoom = (factor: number) => {
    const newCamera = {
      ...scene.camera,
      zoom: scene.camera.zoom * factor,
    };
    onSceneChange({ ...scene, camera: newCamera });
  };

  // Canvas'a tıklayınca entity seçme
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Canvas koordinatlarını hesapla
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Kamera transformunu geri alarak gerçek sahne koordinatlarını bulalım:
    const sceneX = mouseX / scene.camera.zoom + scene.camera.x;
    const sceneY = mouseY / scene.camera.zoom + scene.camera.y;

    // Sahnedeki hangi entity'nin içine tıklanmış bak
    let clickedEntityId: string | null = null;
    for (const entity of scene.entities) {
      if (
        sceneX >= entity.x &&
        sceneX <= entity.x + entity.width &&
        sceneY >= entity.y &&
        sceneY <= entity.y + entity.height
      ) {
        clickedEntityId = entity.id;
        break;
      }
    }

    onSelectEntity(clickedEntityId);
  };

  return (
    <div>
      <h2 className="font-semibold">Scene View</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: "1px solid black" }}
        onClick={handleCanvasClick}
      />
      <div className="mt-2 flex gap-2">
        <button onClick={() => handleCameraMove(-10, 0)}>Left</button>
        <button onClick={() => handleCameraMove(10, 0)}>Right</button>
        <button onClick={() => handleCameraMove(0, -10)}>Up</button>
        <button onClick={() => handleCameraMove(0, 10)}>Down</button>
        <button onClick={() => handleZoom(1.1)}>Zoom In</button>
        <button onClick={() => handleZoom(0.9)}>Zoom Out</button>
      </div>
    </div>
  );
}
