Desafio Técnico: Comunicação com WebSockets
Este projeto implementa uma solução básica de comunicação bidirecional utilizando WebSockets, conforme proposto no desafio técnico. A solução consiste em um servidor (Backend) desenvolvido com FastAPI e um cliente (Frontend) baseado em HTML, CSS (TailwindCSS) e JavaScript puro.

Visão Geral
O objetivo principal é demonstrar a capacidade de estabelecer e gerenciar conexões WebSocket, permitindo a troca de mensagens em tempo real entre múltiplos clientes. A abordagem utilizada para o envio de mensagens é o broadcast, onde cada mensagem recebida por um cliente é retransmitida para todos os outros clientes conectados.

Estrutura do Projeto
O projeto está organizado nas seguintes pastas:

WebSocket_desafio/
├── backend/                  # Contém o código do servidor FastAPI
│   ├── main.py               # Lógica principal do servidor WebSocket
│   └── requirements.txt      # Dependências Python para o backend
├── frontend/                 # Contém os arquivos do cliente web (navegador)
│   ├── index.html            # Estrutura da interface do usuário
│   └── script.js             # Lógica JavaScript para WebSocket e UI
├── .gitignore                # Arquivo para o Git ignorar pastas/arquivos específicos
└── README.md                 # Este arquivo

Tecnologias Utilizadas
Backend (Python)
Python 3.x: Linguagem de programação.

FastAPI: Framework web moderno e de alta performance para construir APIs, com suporte nativo para WebSockets.

Uvicorn: Servidor ASGI utilizado para rodar a aplicação FastAPI.

websockets: Biblioteca Python (usada implicitamente pelo FastAPI para lidar com a comunicação WebSocket).

Frontend (Web)
HTML5: Para a estrutura e conteúdo da página.

CSS3 (Tailwind CSS): Framework CSS para estilização rápida e responsiva da interface. (Utilizado via CDN para simplificar o setup local).

JavaScript (ES6+): Para a lógica do cliente WebSocket, envio/recebimento de mensagens e manipulação do DOM.

Instalação e Execução
Siga os passos abaixo para configurar e executar o projeto:

Pré-requisitos
Certifique-se de ter o Python 3.x e pip (gerenciador de pacotes do Python) instalados em seu sistema.

1. Clonar o Repositório (se aplicável)
Se este projeto estiver em um repositório Git, clone-o para sua máquina local:

```bash
git clone https://github.com/GuilhermeFer29/WebSocket_DeSafio
>>>>>>> Stashed changes
cd WebSocket_desafio
```

2. Configurar e Iniciar o Backend (Servidor)
Navegue até o diretório backend, instale as dependências e inicie o servidor:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8765
```

O comando uvicorn main:app --reload --port 8765 iniciará o servidor FastAPI na porta 8765. O --reload é útil para desenvolvimento, pois reinicia o servidor automaticamente a cada alteração no código.

Mantenha este terminal aberto, pois o servidor precisa estar em execução para o frontend funcionar.

3. Iniciar o Frontend (Cliente)
Em um novo terminal (ou aba), navegue até o diretório frontend:
```bash
cd ../frontend # Se você estiver na pasta backend, use este comando
# Ou, se estiver na raiz do projeto (WebSocket_desafio):
# cd frontend
```

Para iniciar o cliente, basta abrir o arquivo index.html em seu navegador web. Você pode fazer isso de duas maneiras:

Pelo explorador de arquivos: Localize o arquivo index.html dentro da pasta frontend e dê um duplo clique nele. Seu navegador padrão irá abri-lo.

Copiando o caminho do arquivo: Abra seu navegador e na barra de endereço digite file:/// e cole o caminho completo para o arquivo index.html (ex: file:///C:/caminho/para/WebSocket_desafio/frontend/index.html).

Como Usar
Com o servidor FastAPI em execução (passo 3 da seção "Instalação e Execução").

Abra o arquivo index.html no seu navegador.

Para testar a funcionalidade de broadcast, abra o index.html em múltiplas abas ou múltiplos navegadores.

Digite uma mensagem no campo de entrada e pressione "Enviar" ou a tecla "Enter".

A mensagem será exibida na sua tela (como "Você:") e também será retransmitida e aparecerá nas outras abas/navegadores conectados (como "Outro:").

Comentários e Explicações Pertinentes
Comunicação Bidirecional: O WebSocket permite que tanto o cliente quanto o servidor iniciem a comunicação a qualquer momento, ao contrário do HTTP tradicional onde o cliente sempre inicia.

Pool de Conexões: O backend mantém um set (CONNECTED_CLIENTS) para gerenciar todas as conexões WebSocket ativas, permitindo que as mensagens sejam enviadas para todos os clientes.

Tratamento de Desconexões: Tanto o backend quanto o frontend possuem lógica para detectar e lidar com desconexões (seja por fechamento normal ou erro), removendo clientes inativos do pool e atualizando o status na interface.

Assincronicidade: O Python Backend (FastAPI e websockets) utiliza programação assíncrona (asyncio, await) para lidar eficientemente com múltiplas conexões concorrentes sem bloquear o servidor.

Frontend Simplificado: O frontend foi construído com JavaScript puro para demonstrar a interação direta com a API WebSocket do navegador, sem a necessidade de frameworks de frontend complexos, focando nos requisitos do desafio. O Tailwind CSS é utilizado para garantir uma interface visualmente agradável e responsiva com o mínimo de CSS customizado.

Considerações Finais
Este projeto demonstra uma implementação funcional dos conceitos de WebSockets, focando na clareza do código e na aderência aos requisitos do desafio. As instruções de instalação e execução são diretas para facilitar a avaliação.
