# ClimaAgora - Aplicativo Móvel de Clima

## Estrutura de Pastas Atualizada
```
clima-agora/
│
├── assets/
│   ├── background.jpg          # Imagem de fundo da tela inicial
│   └── weather-background.jpg  # Imagem de fundo da tela de clima
│
├── hooks/
│   └── useWeatherData.js       # Hook personalizado para buscar dados de clima
│
├── screens/
│   ├── HomeScreen.js           # Tela inicial
│   └── WeatherScreen.js        # Tela de clima
│
├── App.js                      # Componente raiz e configuração de navegação
│
└── README.md                   # Documentação do projeto
```

## Principais Mudanças
- Renomeado diretório `telas/` para `screens/`
- Renomeados componentes de tela:
  - `TelaInicial.js` → `HomeScreen.js`
  - `TelaClima.js` → `WeatherScreen.js`
- Atualizada navegação no `App.js`
- Mantidas as mesmas funcionalidades do projeto anterior

## Recursos
- Tela inicial com saudação dinâmica
- Exibição de dados climáticos
- Navegação entre telas
- Integração com API de clima

## Instalação
1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure sua chave de API no hook `useWeatherData.js`
4. Inicie o projeto:
   ```
   expo start
   ```

## Tecnologias
- React Native
- Expo
- React Navigation
- OpenWeatherMap API