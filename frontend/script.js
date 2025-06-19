document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendButton');
    const statusText = document.getElementById('status');

    const socket = new WebSocket('ws://localhost:8765/ws');

    socket.onopen = () => {
        statusText.textContent = 'Status: Conectado ao servidor.';
        statusText.className = 'mt-4 text-center text-sm text-green-600';
        addMessage('Você se conectou ao chat.', 'system');
    };

    socket.onmessage = (event) => {
        addMessage(event.data, 'other');
    };

    socket.onclose = (event) => {
        statusText.textContent = `Status: Desconectado. Código: ${event.code}, Razão: ${event.reason}`;
        statusText.className = 'mt-4 text-center text-sm text-red-600';
        addMessage('Você foi desconectado do chat.', 'system');
    };

    socket.onerror = (error) => {
        statusText.textContent = 'Status: Erro na conexão.';
        statusText.className = 'mt-4 text-center text-sm text-red-700';
        addMessage('Erro na conexão com o servidor.', 'system error');
    };

    function addMessage(msg, type) {
        const msgEl = document.createElement('p');
        msgEl.classList.add('p-2', 'rounded-lg', 'my-1', 'max-w-[80%]');

        if (type === 'self') {
            msgEl.classList.add('bg-blue-500', 'text-white', 'ml-auto');
            msgEl.textContent = `Você: ${msg}`;
        } else if (type === 'other') {
            msgEl.classList.add('bg-gray-200', 'text-gray-800', 'mr-auto');
            msgEl.textContent = `Outro: ${msg}`;
        } else if (type === 'system') {
            msgEl.classList.add('text-gray-500', 'text-center', 'italic');
            msgEl.textContent = msg;
        } else if (type === 'system error') {
             msgEl.classList.add('text-red-500', 'text-center', 'italic');
             msgEl.textContent = msg;
        }
        messages.appendChild(msgEl);
        messages.scrollTop = messages.scrollHeight;
    }

    function sendMessage() {
        const msg = input.value.trim();
        if (msg && socket.readyState === WebSocket.OPEN) {
            socket.send(msg);
            addMessage(msg, 'self');
            input.value = '';
        } else if (socket.readyState !== WebSocket.OPEN) {
            statusText.textContent = 'Erro: Conexão não está aberta. Tente novamente.';
            statusText.className = 'mt-4 text-center text-sm text-orange-600';
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
