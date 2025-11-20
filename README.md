# Neuron- Plataforma de Bem-Estar Emocional para Empresas🧠 

- O Neuron é uma plataforma web desenvolvida para promover o bem-estar emocional de colaboradores no ambiente corporativo. Através de um conjunto de ferramentas intuitivas, o sistema permite que os usuários registrem seu humor diário, acompanhem sua evolução emocional e recebam insights personalizados.

## 🚀 Status do Projeto
🟢 **Em desenvolvimento / Versão inicial funcional**

---

## 📋 Sumário
- [💡 Sobre o Projeto](#-sobre-o-projeto)  
- [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)  
- [⚡ Instalação](#-instalação)  
- [🖥️ Como Usar](#-como-usar)  
- [📂 Estrutura de Pastas](#-estrutura-de-pastas)  
- [🔗 Endpoints Principais](#-endpoints-principais)  
- [👩‍💻👨‍💻 Autores e Créditos](#-autores-e-creditos)  
- [🖼️ Screenshots](#-screenshots)  
- [🧑‍💻 GitHub](#-github)
- [▶️ YouTube](#-youtube)
- [👩‍💻🧑‍💻 Contato](#-contato)

---

## 💡 Sobre o Projeto
**Neuron** é uma plataforma web focada no **bem-estar emocional** de colaboradores em empresas.  

Ela permite:  
- Monitorar o **humor diário** dos colaboradores  
- Avaliar emoções como **estresse, motivação e felicidade**  
- Gerar **relatórios e histórico emocional**  
- Oferecer **dicas personalizadas** para melhorar o bem-estar  
- Interface **intuitiva**, com **modo claro/escuro**  

> Objetivo: Conectar tecnologia e empatia para melhorar a saúde mental no ambiente corporativo.  

---

## 🛠️ Tecnologias Utilizadas
- **Front-end:** React, TypeScript, Tailwind CSS, React Hook Form, Context API  
- **Back-end:** Java (Quarkus)  
- **Banco de Dados:** SQLOracle  
- **Autenticação:** JWT  
- **Ferramentas:** VS Code, IntelLiJ Postman  

---

## ⚡ Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/neuron.git
```
2. Instale as dependências do front-end: 
```bash
npm install
```
3. Inicie a aplicação:
```bash
npm run dev
```
---

## 🖥️ Como Usar
- Acesse 
- Clique em Começar Agora para criar uma conta
- Faça login e registre seu humor diário
- Visualize dicas personalizadas e histórico de emoções
- Explore relatórios e visão geral do time

---

## 📂 Estrutura de Pastas

O projeto está organizado da seguinte forma:

```bash
juntos-pela-saude-front-end/
├── src
│   ├── assets
│   │   ├── icons              
│   │   └── images              
│   ├── components              
│   │   ├── BarraLateral
│   │   │    └── index.tsx
│   │   ├── CardIndiceEmpresa
│   │   │    └── index.tsx
│   │   ├── CardIntegrantes
│   │   │    └── index.tsx
│   │   ├── FaqItem
│   │   │    └── index.tsx
│   │   ├── GraficoEmocoesMaisComuns
│   │   │    └── index.tsx
│   │   └── GraficoEvolucaoEmocional
│   │        └── index.tsx
│   ├── context 
│   │   ├── ThemeContext.tsx
│   ├── data 
│   │   ├── formularioEmocao.ts
│   │   ├── integrantes.ts
│   │   └── perguntasFAQ.ts
│   ├── hooks 
│   │   ├── useAuthRedirect.ts
│   ├── pages                   
│   │   ├── Cadastro
│   │   │    └── index.tsx
│   │   ├── DadosConta
│   │   │    └── index.tsx
│   │   ├── DashboardGestor
│   │   │    └── index.tsx
│   │   ├── DashboardGestorRh
│   │   │    └── index.tsx
│   │   ├── FAQContato
│   │   │    └── index.tsx
│   │   ├── FormularioEmocao
│   │   │    └── index.tsx
│   │   ├── HistoricoEmocoes
│   │   │    └── index.tsx
│   │   └── Integrantes 
│   │        └── index.tsx 
│   │   └── Login 
│   │        └── index.tsx 
│   │   └── NotFound 
│   │        └── index.tsx 
│   │   └── PaginaInicial 
│   │        └── index.tsx 
│   ├── routes
│   │   └── AppRoutes.tsx        
│   ├── services
│   │   └── authService.ts       
│   │   └── formularioService.ts     
│   │   └── ususarioService.ts  
│   ├── types                   
│   │   ├── formularioEmocao.ts
│   │   └── usuario.ts
│   ├── App.tsx
│   ├── globals.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.tsx
├── package.json
├── README.MD
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
```
---

## 🔗 Endpoints Principais

| Módulo | Método | Endpoint | Descrição |
|--------|---------|-----------|-------------|
| Auth | POST | `/auth/login` | Login |
| Auth | POST | `/auth/register` | Criar usuário |
| Usuário | GET | `/usuarios/{id}` | Buscar usuário |
| Usuário | PUT | `/usuarios/{id}` | Atualizar |
| Usuário | DELETE | `/usuarios/id/{id}` | Desativar |
| Emoções | POST | `/registro-emocao` | Criar registro de emoção |
| Emoções | GET | `/registro-emocao/usuario/{idUsuario}` | Histórico |
| Formulário | POST | `/resposta-formulario` | Criar resposta do formulário |

---

## 👩‍💻👨‍💻 Autores e Créditos

- Desenvolvedores

  - Anna Clara Russo Luca 
  - Gabriel Duarte Maciel
  - Tiago Guedes da Costa

- Mentoria
  - Alexandre Carlos de Jesus


## 🖼️ Screenshots

- **Página Inicial**
![alt text](image.png)
---
- **Formulário**
![alt text](image-1.png)
---
- **Histórico de Emoções**
![alt text](image-2.png)
---
- **Dashboard Gestor**
![alt text](image-4.png)
---
- **Dashboard RH**
![alt text](image-3.png)


## 🧑‍💻 GitHub
Você pode acessar o repositório pelo link abaixo:  
👉 [Clique aqui](https://github.com/annaclrl/neuron-front-end)  

---

## ▶️ YouTube
Demonstração completa do projeto no YouTube:
👉 [Clique aqui](https://youtu.be/mp1kwFfCt5w)  


## 👩‍💻🧑‍💻 Contato

| Nome | RM | Turma | LinkedIn | GitHub |
|------|----|-------|----------|--------|
| Anna Clara Russo Luca | 561928 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/annaclararussoluca/) | [GitHub](https://github.com/annaclrl) |
| Gabriel Duarte Maciel | 565754 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/gabriel-duarte1010) | [GitHub](https://github.com/duartegdm) |
| Tiago Guedes da Costa | 564731 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/tiago-guedes-7225a5276) | [GitHub](https://github.com/Tiagozguedes) |


