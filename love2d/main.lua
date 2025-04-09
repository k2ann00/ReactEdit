-- love2d/main.lua
local json = require "json"  -- Bir JSON kütüphanesi (örn. https://github.com/rxi/json.lua)
local http = require "socket.http"

local ECS = require "ecs/ECS"
local currentMode = "DEBUG"  -- DEBUG veya PLAY

function love.load()
    -- Başlangıçta Node.js'ten sahne verisini çekelim
    local body, code = http.request("http://localhost:3000/scene")
    if code == 200 then
        local data = json.decode(body)
        ECS.loadSceneData(data)
    end
end

function love.update(dt)
    if currentMode == "DEBUG" then
        -- Editör kamerası ile sahne gösterimi
        ECS.updateEditorCamera(dt)
    elseif currentMode == "PLAY" then
        -- Oyun kamerası devrede
        ECS.updateGameCamera(dt)
        ECS.update(dt)
    end
end

function love.draw()
    if currentMode == "DEBUG" then
        ECS.drawEditorScene()
    elseif currentMode == "PLAY" then
        ECS.drawGameScene()
    end
end

-- Kullanıcı bir tuşa bastığında mod değişimi örnek:
function love.keypressed(key)
    if key == "f5" then
        currentMode = (currentMode == "DEBUG") and "PLAY" or "DEBUG"
    end
end
