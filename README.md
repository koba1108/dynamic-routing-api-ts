# Title
動的ルーティングAPIのサンプル

## Description
動的にコンテンツを生成するようなサービスを作るときに、
どのような仕組みでAPIを作るかを考えるためのサンプルです。

## ルーティング

### 動的コンテンツ操作用のAPI
```
// http://localhost:3000/users/1/product/1
GET: /users/:userId/:contentTypeName/:contentId
```
