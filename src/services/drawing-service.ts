import { getActiveWindow, Point, Region, mouse, right, left, down, up, screen, FileType } from "@nut-tree/nut-js";
import { readFile, unlink } from 'fs/promises';

export class DrawingService {
    private static BROSWER_HEADER_HEIGHT = 85;
    private static CANVAS_LEFT_OFFSET = 50;
    private static CANVAS_TOP_OFFSET = 210;

    private static position: Point;
    private static region: Region;

    public static get mousePosition(): Point {
        return new Point(this.position.x - this.region.left, this.position.y - this.region.top);
    }

    public static async init() {
        const window = await getActiveWindow();
        const region = await window.region;

        const left = region.left + this.CANVAS_LEFT_OFFSET;
        const top = region.top + this.BROSWER_HEADER_HEIGHT + this.CANVAS_TOP_OFFSET;
        const width = 942.4;
        const height = 500;

        this.region = new Region(left, top, width, height);
        this.position = new Point(left, top);
    }

    public static async moveCursor(x: number, y: number) {
        this.changeCursorPosition(x, y);

        await this.setCursonPosition();
    }

    private static changeCursorPosition(x: number, y: number) {
        let newX = this.position.x + x;
        let newY = this.position.y + y;

        if (newX < this.region.left) {
            newX = this.region.left;
        }
        if (newX > this.region.left + this.region.width) {
            newX = this.region.left + this.region.width;
        }

        if (newY < this.region.top) {
            newY = this.region.top;
        }
        if (newY > this.region.top + this.region.height) {
            newY = this.region.top + this.region.height;
        }

        this.position = new Point(newX, newY);
        console.log(`cursor position changed. Current cursor position: x = ${this.position.x}, y = ${this.position.y}`);
    }

    public static async drawSquare(width: number) {
        await this.setCursonPosition();

        await mouse.drag(right(width));
        await mouse.drag(down(width));
        await mouse.drag(left(width));
        await mouse.drag(up(width));
    }

    public static async drawRectangle(width: number, height: number) {
        await this.setCursonPosition();

        await mouse.drag(right(width));
        await mouse.drag(down(height));
        await mouse.drag(left(width));
        await mouse.drag(up(height));
    }

    public static async drawCircle(radius: number) {
        await this.setCursonPosition();

        const step = Math.PI / 16;
        for (let i = 0; i <= 2 * Math.PI + step; i += step) {
            const newX = this.position.x + (radius * Math.sin(i));
            const newY =  this.position.y + (radius * (1 - Math.cos(i)));
            const newPosition = new Point(newX, newY);
            await mouse.drag([this.position, newPosition]);
        }
    }

    public static async printScreen() {
        const region = new Region(this.position.x - 100, this.position.y - 100, 200, 200);
        const filename = 'image.png';

        await screen.captureRegion(filename, region, FileType.PNG);
        const data = await readFile(filename);

        await unlink(filename);

        return data.toString('base64');
    }

    private static async setCursonPosition() {
        await mouse.scrollDown(1000);
        await mouse.setPosition(this.position);
    }
}