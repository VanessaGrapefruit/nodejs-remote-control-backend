import { DrawingService } from '../services/drawing-service';

export async function printScreen() {
    const data = await DrawingService.printScreen();
    return `prnt_scrn ${data}`;
}