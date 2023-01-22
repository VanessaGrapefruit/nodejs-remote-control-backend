import { DrawingService } from "../services/drawing-service";

export async function drawSquare(width: number) {
    await DrawingService.drawSquare(width);
}

export async function drawRectangle(width: number, height: number) {
    await DrawingService.drawRectangle(width, height);
}

export async function drawCircle(radius: number) {
    await DrawingService.drawCircle(radius);
}