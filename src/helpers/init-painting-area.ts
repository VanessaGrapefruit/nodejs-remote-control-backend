import { getActiveWindow, mouse, Point, down, right, Region } from "@nut-tree/nut-js";

const BROSWER_HEADER_HEIGHT = 85;
const CANVAS_LEFT_OFFSET = 50;
const CANVAS_TOP_OFFSET = 210;

export async function initPaintingArea() {
    const window = await getActiveWindow();
    const region = await window.region;

    //mouse.config.mouseSpeed = 100;
    mouse.scrollDown(1000);

    const left = region.left + CANVAS_LEFT_OFFSET;
    const top = region.top + BROSWER_HEADER_HEIGHT + CANVAS_TOP_OFFSET;
    const width = 942.4;
    const height = 500;
    const painingAreaRegion = new Region(left, top, width, height);
    await mouse.setPosition(new Point(left, top));

    // await mouse.drag(down(50));
    // await mouse.drag(right(50));
    // await mouse.drag(down(50));
    // await mouse.drag(right(50));
    // await mouse.drag(down(50));
    // await mouse.drag(right(50));
}