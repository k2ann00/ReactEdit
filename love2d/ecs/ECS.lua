-- love2d/ecs/ECS.lua
local ECS = {}
local entities = {}
local editorCamera = {x = 0, y = 0, zoom = 1}
local gameCamera = {x = 0, y = 0, zoom = 1}

function ECS.loadSceneData(sceneData)
    entities = sceneData.entities or {}
    editorCamera = sceneData.camera or editorCamera
end

function ECS.updateEditorCamera(dt)
    -- Editör kamerasını istenirse klavye/fare ile kontrol edebilirsiniz
end

function ECS.updateGameCamera(dt)
    -- Oyun kamerası, sahnedeki bir "Camera" entity'si veya ECS'den alınan bir veriye göre hareket edebilir
    -- Örneğin, sceneData.entities içinden "camera" tag'ine sahip entity bulunup gameCamera'ya eşlenebilir
end

function ECS.update(dt)
    -- Tüm ECS sistemlerini güncelle
    for _, entity in ipairs(entities) do
        -- MovementSystem, CollisionSystem vb. sistemleri çağırın
    end
end

function ECS.drawEditorScene()
    -- Editör kamerasına göre sahneyi çizin
    love.graphics.push()
    love.graphics.translate(-editorCamera.x, -editorCamera.y)
    love.graphics.scale(editorCamera.zoom)
    
    for _, entity in ipairs(entities) do
       -- Debug görselleri veya bounding box'ları çizebilirsiniz
       love.graphics.rectangle("line", entity.x, entity.y, entity.width, entity.height)
    end
    
    love.graphics.pop()
end

function ECS.drawGameScene()
    -- Oyun kamerasına göre sahneyi çizin
    love.graphics.push()
    love.graphics.translate(-gameCamera.x, -gameCamera.y)
    love.graphics.scale(gameCamera.zoom)
    
    for _, entity in ipairs(entities) do
       love.graphics.draw(entity.sprite, entity.x, entity.y)
    end

    love.graphics.pop()
end

return ECS
