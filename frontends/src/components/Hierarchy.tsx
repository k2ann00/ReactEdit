// src/components/Hierarchy.tsx
import { SceneData } from "../types/Scene";

interface Props {
  scene: SceneData;
  selectedEntityId: string | null;
  onSelect: (id: string) => void;
}

export default function Hierarchy({ scene, selectedEntityId, onSelect }: Props) {
  return (
    <ul className="text-sm space-y-1 max-h-[300px] overflow-auto">
      {scene.entities.map((entity) => (
        <li
          key={entity.id}
          className={`cursor-pointer px-2 py-1 rounded ${
            selectedEntityId === entity.id
              ? "bg-zinc-700 text-white"
              : "hover:bg-zinc-700 text-zinc-300"
          }`}
          onClick={() => onSelect(entity.id)}
        >
          {entity.name || entity.id}
        </li>
      ))}
    </ul>
  );
}
