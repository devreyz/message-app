# MessageApp

## Descrição
MessageApp é um aplicativo de mensagens desenvolvido com React Native e Expo. Embora ainda esteja em desenvolvimento, ele já possui algumas funcionalidades principais, como tema claro e escuro, listagem de contatos, adição de contatos, tela de configurações, tela de mensagens e um sistema de atualização de contatos utilizando gestos.

## Funcionalidades
- **Tema Claro/Escuro**: Alternância entre temas claro e escuro.
- **Listagem de Contatos**: Tela inicial com listagem de contatos.
- **Adicionar Contato**: Botão para adicionar um novo contato.
- **Tela de Configurações**: Interface para ajustar configurações do aplicativo.
- **Tela de Mensagens**: Interface para exibição e envio de mensagens.
- **Atualização de Contatos**: Sistema para atualizar contatos salvos usando gestos.

## Tecnologias Utilizadas
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [SQLite](https://www.sqlite.org/index.html)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- Expo CLI

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/devreyz/message-app.git
   cd messageapp
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npm start
   ```

### Scripts Disponíveis
- `start`: Inicia o aplicativo Expo.
- `android`: Inicia o aplicativo no Android.
- `ios`: Inicia o aplicativo no iOS.
- `web`: Inicia o aplicativo no navegador web.

## Configuração
No momento, não são necessárias configurações adicionais além da instalação das dependências.

## Uso
### Executando o App
1. Abra o Expo Go no seu dispositivo móvel.
2. Escaneie o QR code que aparece após rodar `npm start`.

## Dependências
```json
{
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/native": "^6.0.2",
    "expo": "~51.0.14",
    "expo-font": "~12.0.7",
    "expo-linking": "~6.3.1",
    "expo-router": "~3.5.16",
    "expo-splash-screen": "~0.27.5",
    "expo-status-bar": "~1.12.1",
    "expo-system-ui": "~3.0.6",
    "expo-web-browser": "~13.0.3",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.74.2",
    "react-native-reanimated": "~3.10.1",
    "react-native-safe-area-context": "4.10.1",
    "react-native-screens": "3.31.1",
    "react-native-web": "~0.19.10",
    "expo-sqlite": "~14.0.3"
  }
}
```

## DevDependencies
```json
{
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "jest": "^29.2.1",
    "jest-expo": "~51.0.1",
    "react-test-renderer": "18.2.0",
    "tailwindcss": "^3.3.2",
    "typescript": "~5.3.3"
  }
}
```

## Contribuição
Se você deseja contribuir, por favor, siga as diretrizes:
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/<nome-da-feature>`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/<nome-da-feature>`).
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

