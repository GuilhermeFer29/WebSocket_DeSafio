from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Set
import asyncio
import websockets
# Criando a Aplicação FastAPI
app= FastAPI()

# Criando um Set para armazenar as conexões WebSocket Garantindo a A eficiencia
CONNECTED_CLIENTS: Set[WebSocket] = set() 

# Criando uma rota WebSocket para lidar com as conexões
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    # Aceitando a conexão
    await websocket.accept()
    print(f"Cliente conectado: {websocket.client.host}: {websocket.client.port}")
    CONNECTED_CLIENTS.add(websocket) # Adicionando a conexão 

    # Criando um loop para receber as mensagens
    try:

        while True:
            message = await websocket.receive_text()
            print(f"Mensagem recebida de {websocket.client.host}: {websocket.client.port}:{message}")

            disconnect_clients = set() 
            for client in list(CONNECTED_CLIENTS):
                if client != websocket:
                    try:
                        # Enviando a mensagem para o cliente
                        await client.send_text(message)

                    # Tratando exceção de erro
                    except RuntimeError as e:
                        print(f"Erro ao enviar mensagem para {client.client.host}: {client.client.port}: {e}")
                        disconnect_clients.add(client)
                    except WebSocketDisconnect:
                        print(f"Cliente desconectado: {client.client.host}: {client.client.port}")
                        disconnect_clients.add(client)
                for client in disconnect_clients:
                    if client in CONNECTED_CLIENTS:
                        CONNECTED_CLIENTS.remove(client)
                        print(f"Cliente removido ( apos broadcast): {client.client.host}: {client.client.port}")

    except WebSocketDisconnect:
        # exceção de desconexão
        print(f"Cliente desconectado: {websocket.client.host}: {websocket.client.port}")
    except Exception as e:
        # exceção de erro
        print(f"Erro na conexão: {websocket.client.host}: {websocket.client.port}: {e}")
    finally:
        # Garantido que a conexao seja removida
        if websocket in CONNECTED_CLIENTS:
            CONNECTED_CLIENTS.remove(websocket)
            print(f"Cliente removido  do broadcast: {websocket.client.host}: {websocket.client.port}")

#Adicionando Endpoint 
@app.get("/")
async def read_root():
    return {"message": "Bem-vindo ao servidor WebSocket"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8765)
