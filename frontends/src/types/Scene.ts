// frontends/src/types/Scene.ts
export interface Entity {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    components: Record<string, any>;
  }
  
  export interface Camera {
    x: number;
    y: number;
    zoom: number;
  }
  
  export interface SceneData {
    entities: Entity[];
    camera: Camera;
  }
  