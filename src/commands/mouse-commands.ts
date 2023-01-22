import { DrawingService } from "../services/drawing-service";

export async function mouseUp(y: number) {
    await DrawingService.moveCursor(0, -y);
}

export async function mouseDown(y: number) {
    await DrawingService.moveCursor(0, y);
}

export async function mouseLeft(x: number) {
    await DrawingService.moveCursor(-x, 0);
}

export async function mouseRight(x: number) {
    await DrawingService.moveCursor(x, 0);
}

export async function mousePosition(): Promise<string> {
    const position = DrawingService.mousePosition;
    return `mouse_position ${position.x},${position.y}`;
}