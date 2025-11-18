import { Game } from "./lib/imports.js";var game = new Game;
function tick(){game.tick();requestAnimationFrame(tick)};game.init();requestAnimationFrame(tick)