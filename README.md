# 2019-14.

## Frontend 디렉토리 구조

```
client
├── dist
│   ├── bundle.js
│   └── index.html
├── package.json
├── package-lock.json
├── package-scripts.js
├── src
│   ├── actions: flux action들이 위치할 디렉토리
│   ├── components: react component들이 위치할 디렉토리
│   ├── index.js
│   ├── pages: 실제로 라우팅될 react page들이 위치할 디렉토리
│   ├── reducers: flux reducer들이 위치할 디렉토리
│   ├── stores: flux store들이 위치할 디렉토리
│   └── utils: 공용 모듈이 위치할 디렉토리
└── webpack.config.js
```

## Backend 디렉토리 구조
```
server
├── bin
│   └── www
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── controller
    │   └── index.js
    ├── model
    │   └── db
    │       └── mysql.js
    ├── routes
    │   ├── index.js
    │   └── users.js
    └── utils
        └── utils.js
```

