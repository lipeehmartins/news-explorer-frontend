# News Explorer Frontend

Interface web do projeto Full-Stack News Explorer.

## Links

- Projeto em produção (Vercel): https://news-explorer-frontend-green.vercel.app
- API em produção (Render): https://news-explorer-backend-xu1z.onrender.com/api
- Health check da API: https://news-explorer-backend-xu1z.onrender.com/api/health
- Repositório Frontend: https://github.com/lipeehmartins/news-explorer-frontend
- Repositório Backend: https://github.com/lipeehmartins/news-explorer-backend

## Scripts

- npm run dev — inicia o app em modo desenvolvimento.
- npm run build — gera a build de produção em dist.
- npm run preview — executa preview local da build.
- npm run lint — executa o lint.

## Variáveis de ambiente

- VITE_API_BASE_URL
- VITE_NEWS_API_KEY (apenas desenvolvimento local)
- VITE_NEWS_API_BASE_URL (opcional, padrão: https://newsapi.org, apenas desenvolvimento local)

Valor sugerido para VITE_API_BASE_URL:

- https://news-explorer-backend-xu1z.onrender.com/api

## Tecnologias

- React
- Vite
- React Router
