// frontends/src/components/Inspector.tsx
import React from "react";
import { Entity, SceneData } from "../types/Scene";

interface InspectorProps {
  scene: SceneData;
  selectedEntityId: string | null;
  onSceneChange: (scene: SceneData) => void;
}

export default function Inspector({
  scene,
  selectedEntityId,
  onSceneChange,
}: InspectorProps) {
  // Seçili entity’yi bul:
  const entity = scene.entities.find((e) => e.id === selectedEntityId);

  if (!entity) {
    return (
      <div>
        <h2 className="font-semibold">Inspector</h2>
        <p>No entity selected.</p>
      </div>
    );
  }

  // Değişiklik olduğunda sahneyi güncelle
  const updateEntity = (updatedFields: Partial<Entity>) => {
    const newEntities = scene.entities.map((e) => {
      if (e.id === entity.id) {
        return { ...e, ...updatedFields };
      }
      return e;
    });
    onSceneChange({ ...scene, entities: newEntities });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Entity
  ) => {
    const value = parseFloat(e.target.value);
    updateEntity({ [field]: isNaN(value) ? 0 : value });
  };

  return (
    <div>
      <h2 className="font-semibold">Inspector</h2>
      <p>Entity ID: {entity.id}</p>
      <div className="flex flex-col gap-2 mt-2">
        <label>
          X:
          <input
            type="number"
            value={entity.x}
            onChange={(e) => handleInputChange(e, "x")}
          />
        </label>
        <label>
          Y:
          <input
            type="number"
            value={entity.y}
            onChange={(e) => handleInputChange(e, "y")}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            value={entity.width}
            onChange={(e) => handleInputChange(e, "width")}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={entity.height}
            onChange={(e) => handleInputChange(e, "height")}
          />
        </label>
      </div>
    </div>
  );
}
