# **Hospital Score**

**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** Estácio  
**Disciplina:** Programação para Dispositivos Móveis em Android  
**Objetivo:** Desenvolver um aplicativo para avaliação de hospitais públicos.  

---

## **Visão Geral**

O **Hospital Score** é um aplicativo desenvolvido para permitir que os usuários avaliem hospitais públicos, oferecendo uma plataforma simples e intuitiva. O objetivo é fornecer uma ferramenta que ajude os cidadãos a compartilhar suas experiências nos hospitais, promovendo transparência e melhorias na qualidade dos serviços de saúde pública.

O projeto foi desenvolvido para a disciplina **Programação para Dispositivos Móveis em Android**, no curso de **Análise e Desenvolvimento de Sistemas**, entre **outubro e novembro de 2024**. O sistema é composto por uma interface em **React Native** para o frontend e uma API RESTful desenvolvida com **Node.js** e **TypeScript** para o backend, com banco de dados **MySQL**.

---

## **Levantamento de Requisitos com o Cliente**

**Cliente:** Rodrigo Nunes  
**Objetivo do Cliente:** Criar um aplicativo para avaliação de hospitais públicos, com funcionalidades que permitam aos usuários realizar avaliações detalhadas sobre hospitais e acessar informações como localização e dados de contato.  

### **Requisitos Funcionais:**

1. **Tela de Login:**
   - Permitir que o usuário faça login com suas credenciais.
   - O login deve ser rápido e seguro.

2. **Tela de Cadastro de Usuário:**
   - O usuário deve poder se registrar no sistema fornecendo nome, e-mail e senha.
   - O cadastro deve ser simples e garantir a validação dos dados fornecidos.

3. **Tela Home:**
   - Exibir botões que direcionem o usuário para a lista de hospitais e para a tela de perfil do usuário.
   - O design da tela deve ser simples e amigável.

4. **Tela de Hospitais:**
   - Exibir uma lista de hospitais públicos cadastrados.
   - Cada hospital deve ter um botão para ser avaliado.

5. **Tela de Avaliação de Hospital:**
   - O usuário pode avaliar um hospital em 4 critérios: Atendimento, Limpeza, Tempo de Espera, Qualidade das Instalações.
   - O usuário também pode adicionar um comentário livre sobre a experiência no hospital.

6. **Tela de Detalhes do Hospital:**
   - Exibir informações detalhadas sobre o hospital: Endereço, Telefone e Localização no mapa.
   - O mapa deve ser interativo e permitir que o usuário visualize o local do hospital.

---

## **Requisitos Não Funcionais:**

1. **Segurança:**
   - O sistema deve garantir a segurança das informações dos usuários, principalmente os dados pessoais e as avaliações feitas.

2. **Desempenho:**
   - A aplicação deve ser ágil, especialmente ao carregar a lista de hospitais e ao exibir as avaliações.
   
3. **Compatibilidade:**
   - O sistema deve ser compatível com dispositivos Android.

4. **Usabilidade:**
   - A interface do aplicativo deve ser simples, intuitiva e acessível.

---

## **Tecnologias Utilizadas**

- **Frontend:** React Native  
- **Backend:** Node.js com TypeScript  
- **Banco de Dados:** MySQL (utilizando Sequelize ORM)  
- **Mapas:** Biblioteca para exibição de mapas (Google Maps ou equivalente)  

---

## **Estrutura do Projeto**

O repositório contém o código tanto do frontend quanto do backend, centralizados no mesmo projeto.

1. **`frontend/`**: Código do aplicativo móvel desenvolvido em React Native.
2. **`backend/`**: API RESTful desenvolvida em Node.js com TypeScript.  

---

## **Planejamento de Desenvolvimento**

### **Etapas do Projeto**

O desenvolvimento foi realizado em conjunto com o cliente Rodrigo Nunes, levando em consideração os requisitos levantados. O cronograma de desenvolvimento seguiu as seguintes etapas:

| Etapa                            | Descrição                                                                 | Início        | Término       | Status    |
|----------------------------------|---------------------------------------------------------------------------|---------------|---------------|-----------|
| **Configuração inicial**         | Criação dos repositórios, configuração do ambiente e escolha das tecnologias. | 25/10/2024    | 27/10/2024    | ✅ Concluído |
| **Estruturação do backend**      | Modelagem do banco de dados e criação dos endpoints iniciais.               | 28/10/2024    | 03/11/2024    | ✅ Concluído |
| **Implementação do frontend**    | Desenvolvimento das telas iniciais: login, cadastro e home.                | 04/11/2024    | 10/11/2024    | ✅ Concluído |
| **Listagem de hospitais**        | Tela com listagem de hospitais cadastrados no backend.                     | 11/11/2024    | 14/11/2024    | ✅ Concluído |
| **Sistema de avaliação**         | Tela para avaliação dos hospitais e integração com backend.                | 15/11/2024    | 20/11/2024    | ✅ Concluído |
| **Detalhamento do hospital**     | Tela para exibir detalhes, como endereço, telefone e localização.          | 21/11/2024    | 25/11/2024    | ✅ Concluído |

---

## **Funcionalidades Implementadas**

### **Frontend (React Native)**

1. **Tela de Login:**  
   Permite que os usuários façam login utilizando suas credenciais.  
2. **Tela de Cadastro de Usuário:**  
   Interface para novos usuários se registrarem no sistema.  
3. **Tela Home:**  
   Apresenta botões para navegação rápida às telas de hospitais e outras funcionalidades.  
4. **Tela de Hospitais:**  
   Lista os hospitais disponíveis com botões para avaliar cada um.  
5. **Tela de Avaliação:**  
   Permite aos usuários avaliarem os hospitais em critérios como:  
   - Atendimento  
   - Limpeza  
   - Tempo de Espera  
   - Qualidade das Instalações  
   - Comentário adicional em texto livre  
6. **Tela de Detalhes do Hospital:**  
   Exibe informações detalhadas, como endereço, telefone e localização em um mapa.  

### **Backend (Node.js com TypeScript)**

1. **Autenticação:**  
   - Endpoints para login e registro de usuários.  
2. **Gerenciamento de Hospitais:**  
   - CRUD completo para hospitais.  
3. **Sistema de Avaliação:**  
   - Endpoints para registrar e consultar avaliações.  
4. **Integração com Mapas:**  
   - Fornece dados de localização para exibição no frontend.  

---

## **Instalação e Execução**

### **Pré-requisitos**
- Node.js (v18 ou superior)  
- MySQL  
- Ambiente configurado para React Native  

### **Passos para Instalação**

1. Clone o repositório:  
   ```bash
   git clone https://github.com/usuario/hospitalScore.git
   
   cd hospitalScore/hospitalScore-api
   npm install
   
   cd ../hospitalScore
   npm install

   npm run build
   npm start

   npx react-native run-android
