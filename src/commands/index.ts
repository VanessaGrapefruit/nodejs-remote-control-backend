import { mouseDown, mouseLeft, mousePosition, mouseRight, mouseUp } from "./mouse-commands";
import { drawCircle, drawRectangle, drawSquare } from './drawing-commands';

const commandHandlersMap: Record<string, (...args: any[]) => Promise<unknown>> = {
    'mouse_up': mouseUp,
    'mouse_down': mouseDown,
    'mouse_left': mouseLeft,
    'mouse_right': mouseRight,
    'mouse_position': mousePosition,
    'draw_circle': drawCircle,
    'draw_square': drawSquare,
    'draw_rectangle': drawRectangle,

}

export async function handleCommand(query: string): Promise<unknown> {
    const [command, ...args ] = query.split(' ');

    const handler = commandHandlersMap[command];
    const parsedArgs = args.map(arg => parseInt(arg, 10));

    return await handler(...parsedArgs);
}