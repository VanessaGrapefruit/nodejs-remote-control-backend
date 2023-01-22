import { config } from "dotenv";
import { OPEN, RawData, Server, WebSocket } from 'ws';
import { createServer } from 'http';
import { DrawingService } from './services/drawing-service';
import { handleCommand } from './commands/index';

config();
const port = process.env.PORT || 8080;

const wsServer = new Server({
    noServer: true
});

wsServer.on('connection', async (ws: WebSocket) => {
    console.log(`Websocket connection is open on port ${port}`);
    await DrawingService.init();

    ws.on('message', async (msg: RawData) => {
        const result = await handleCommand(msg.toString()) as string;
        wsServer.clients.forEach(client => {
            if (client.readyState === OPEN && result) {
                client.send(result);
            }
        })
    });

    ws.on('close', (code) => {
        console.log(`Websocket closed with code ${code}`);
    })
});

const server = createServer(async (req, res) => {});

server.on('upgrade', async (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws: WebSocket) => {
        wsServer.emit('connection', ws, request);
    })
});

server.listen(port, () => {
    console.log(`Http server is listening on port ${port}`);
});