# Palavra Viva

Aplicacao web MVP para apoiar a leitura biblica diaria com uma experiencia simples, visual e objetiva. O sistema reune verso do dia, temas de interesse, planos de leitura e indicadores de progresso em uma unica interface.

## Sobre o Projeto
<img width="1808" height="851" alt="image" src="https://github.com/user-attachments/assets/d8721613-d861-4323-9d1b-7f58d8cc34b3" />




Palavra Viva foi pensado para pessoas que querem manter constancia na leitura da Biblia, mas precisam de uma experiencia mais guiada e acessivel. A proposta do projeto e oferecer uma pagina unica, com navegacao clara e secoes que ajudam o usuario a iniciar a leitura, encontrar passagens relacionadas ao momento que esta vivendo e acompanhar sua jornada.

Como MVP, o foco esta em simplicidade, funcionalidade e valor rapido. Por isso, a aplicacao evita fluxos complexos e privilegia componentes claros, conteudo direto e uma integracao pontual com IA na parte mais relevante para descoberta de conteudo.



## Temas

### Como a IA e utilizada no projeto

A Inteligencia Artificial e usada na secao Temas. Nela, o usuario escolhe um assunto como ansiedade, perdao, esperanca, gratidao ou sabedoria e pode pedir novas sugestoes de textos biblicos relacionadas a esse contexto.

<img width="1458" height="771" alt="image" src="https://github.com/user-attachments/assets/861ca516-bcfd-4785-82c1-14833ae15a7e" />

### Papel da IA dentro do sistema

A IA funciona como um mecanismo de recomendacao. Ela amplia a experiencia do usuario ao gerar novas combinacoes de referencias, trechos e insights curtos, mantendo a interface principal enxuta e centrada no conteudo.

### Como funciona

1. O usuario seleciona um tema no frontend.
2. Ao clicar em Gerar novas sugestoes, a aplicacao envia o tema para um backend simples em Express.
3. O backend monta o prompt e consulta a API da OpenAI.
4. A resposta volta em formato estruturado com sugestoes biblicas.
5. O frontend atualiza os cards exibidos na secao Temas.

### Exemplo pratico de uso

Se o usuario escolher o tema Ansiedade, a IA pode retornar passagens como Filipenses 4:6-7, Mateus 6:34 e Salmos 94:19, acompanhadas de um insight curto sobre paz, confianca e consolo.

## Contexto Academico

Este projeto foi desenvolvido como atividade final do curso IA e Soft Skills para Programadores, dentro do programa Geracao Tech.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- shadcn/ui
- Lucide React
- TanStack Query
- Node.js
- Express
- OpenAI API

## Estrutura do Projeto

- `src/components`: secoes e componentes reutilizaveis da interface
- `src/pages`: paginas principais da aplicacao
- `src/hooks`: hooks utilitarios
- `src/lib`: funcoes auxiliares
- `server`: backend simples para a geracao de sugestoes com IA

## Como Executar o Projeto

### Requisitos

- Node.js 18+
- npm

### Passo a passo

1. Instale as dependencias:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz com base no `.env.example`.

Exemplo:

```env
VITE_ABIBLIA_TOKEN=
VITE_API_BASE_URL=http://localhost:5174
OPENAI_API_KEY=sua_chave_openai
CORS_ORIGIN=http://localhost:8080
```

3. Inicie o frontend:

```bash
npm run dev
```

4. Em outro terminal, inicie o backend:

```bash
npm run server
```

5. Abra no navegador a URL informada pelo Vite.

## Uso de IA na Arquitetura

- O frontend exibe temas predefinidos e um conjunto inicial de sugestoes.
- O backend concentra a integracao com a OpenAI e protege a chave da API.
- A resposta da IA e convertida para um formato simples: tema e lista de sugestoes.
- Quando a IA nao responde corretamente, a interface continua funcional com conteudo inicial.

## Refatoracoes Aplicadas

- Remocao de boilerplate e arquivo CSS inutilizado do template inicial
- Simplificacao de estados no componente de verso do dia
- Melhoria de nomenclatura interna na secao Temas
- Ajuste do `.gitignore` para proteger arquivos de ambiente
- Organizacao da documentacao tecnica do projeto

## Melhorias Futuras

- Validar respostas da IA com schema para reduzir erros de integracao
- Persistir favoritos e historico de sugestoes por usuario
- Substituir dados mockados de progresso por dados reais
- Adicionar observabilidade basica no backend
- Permitir mais temas e personalizacao por perfil de usuario
