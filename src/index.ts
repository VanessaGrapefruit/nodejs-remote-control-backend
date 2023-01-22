import { config } from "dotenv";
import { OPEN, RawData, Server, WebSocket } from 'ws';
import { createServer } from 'http';
import { DrawingService } from './services/drawing-service';
import { handleCommand } from './commands/index';

config();

const wsServer = new Server({
    noServer: true
});

wsServer.on('connection', async (ws: WebSocket) => {
    await DrawingService.init();

    ws.on('message', async (msg: RawData) => {
        const result = await handleCommand(msg.toString()) as string;
        wsServer.clients.forEach(client => {
            if (client.readyState === OPEN && result) {
                client.send(result);
            }
        })
    });
});

const server = createServer(async (req, res) => {});

server.on('upgrade', async (request, socket, head) => {
    console.log('server is upgraded to WS server');
    wsServer.handleUpgrade(request, socket, head, (ws: WebSocket) => {
        wsServer.emit('connection', ws, request);
    })
})

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Http server is listening on port ${port}`);
});