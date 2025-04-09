import { useEffect, useState } from "react";
import AssetManager from "./components/AssetManager";
import Hierarchy from "./components/Hierarchy";
import Inspector from "./components/Inspector";
import SceneView from "./components/SceneView";
import ApiService from "./services/ApiService";
import { connectWebSocket, sendMessage } from "./services/WebSocketService";
import { SceneData } from "./types/Scene";

export default function Editor() {
  const [scene, setScene] = useState<SceneData>({
    entities: [],
    camera: { x: 0, y: 0, zoom: 1 },
  });
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getScene().then(setScene);
    connectWebSocket((msg) => {
      if (msg.type === "SCENE_UPDATED") setScene(msg.payload);
    });
  }, []);

  const updateScene = (updated: SceneData) => {
    setScene(updated);
    sendMessage({ type: "UPDATE_SCENE", payload: updated });
  };

  return (
    <div className="h-screen w-screen flex flex-row bg-zinc-900 text-white">
      {/* SOL PANEL */}
      <div className="w-[250px] flex flex-col border-r border-zinc-700 p-3 space-y-4">
        {/* Hierarchy */}
        <div className="flex-1 overflow-auto">
          <h2 className="text-sm font-bold uppercase mb-2 text-zinc-400">Hierarchy</h2>
          <Hierarchy
            scene={scene}
            selectedEntityId={selectedEntityId}
            onSelect={setSelectedEntityId}
          />
        </div>
        {/* Asset Manager */}
        <div className="max-h-[200px] overflow-auto">
          <h2 className="text-sm font-bold uppercase mb-2 text-zinc-400">Assets</h2>
          <AssetManager />
        </div>
      </div>

      {/* ORTA PANEL */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Butonlar */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-sm font-semibold">
            ▶ Play
          </button>
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold">
            🛠 Debug
          </button>
        </div>
        {/* Scene View */}
        <div className="flex-1 bg-zinc-800 rounded-lg p-4 shadow overflow-hidden">
          <SceneView
            scene={scene}
            onSceneChange={updateScene}
            selectedEntityId={selectedEntityId}
            onSelectEntity={setSelectedEntityId}
          />
        </div>
      </div>

      {/* SAĞ PANEL */}
      <div className="w-[300px] flex flex-col border-l border-zinc-700 p-3 space-y-4">
        {/* Inspector */}
        <div className="flex-1 overflow-auto">
          <h2 className="text-sm font-bold uppercase mb-2 text-zinc-400">Inspector</h2>
          <Inspector
            scene={scene}
            selectedEntityId={selectedEntityId}
            onSceneChange={updateScene}
          />
        </div>
        {/* Console (gelecek için placeholder) */}
        <div className="h-24 bg-black text-green-400 text-xs p-2 font-mono rounded">
          // Console output will appear here
        </div>
      </div>
    </div>
  );
}
