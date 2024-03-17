
# S3 Local Replica

This project is the replica of AWS S3 using localstorage



## Installation

Install project with npm

```bash
  ** convert .env.example to .env (config file) and update database credentials
  npm install 
  npm run db:migrate
  npm start
    -project running at PORT 8000
    -postman collection at root
```
    
## API Reference

#### Create Bucket

```http
  POST /api/aws/create/bucket?bucketName=bucket1&createdBy=1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `createdBy` | `number` | **Required**. User Id |


#### List Buckets

```http
  GET /api/aws/list/buckets?createdBy=1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `createdBy` | `number` | **Required**. User Id |
| `bucketName`      | `string` | **Required**. Bucket Name In Which File Stored |


#### List Objects

```http
  GET /api/aws/list/objects?createdBy=1&bucketName=bucket1
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createdBy`      | `number` | **Required**. User Id |
| `bucketName`      | `string` | Bucket Name In Which File Stored |


#### Delete Object

```POST
  GET /api/aws/delete-object?bucketName=bucket2&fileId=3&createdBy=1
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createdBy`      | `number` | **Required**. User Id |
| `bucketName`      | `string` |**Required**. Bucket Name In Which File Stored |
| `fileId`      | `number` |**Required**. File Id Is Unique To File Inside Objects |


#### Get Object

```http
  GET /api/aws/get-object/${bucketName}?createdBy=1&fileId=2
```
for instance bucket2

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createdBy`      | `number` | **Required**. User Id |
| `bucketName`      | `string` |**Required**. Bucket Name In Which File Stored |
| `fileId`      | `number` |**Required**. File Id Is Unique To File Inside Objects |



#### Put Object

```http
  GET /api/aws/put-object/${bucketName}&createdBy=1
```
for instance bucket1

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createdBy`      | `number` | **Required**. User Id |
| `bucketName`      | `string` |**Required**. Bucket Name In Which File Stored |
| `file`      | `file` |**Required**. Flie is added through form-data (Screen Shot Attached Below). File is stored in-memory till it write, so large file can cause out of memory issue |




## Screenshots

[List Object-Screenshots](https://iili.io/JXoxsmN.png)

[List Bucket-Screenshots](https://freeimage.host/i/JXozjGn)

[Put Object-Screenshots](https://freeimage.host/i/JXoI7N2)

[Get Object-Screenshots](https://freeimage.host/i/JXoTbB1)

[Create Bucket-Screenshots](https://freeimage.host/i/JXoTK0u)

[Delete Bucket-Screenshots](https://freeimage.host/i/JXoTw7f)



## Tech Stack



**Server:** Node, Express, Sequelize, Sequelize CLI, Multer, Typescript, Javascript, Nodemon, bcrypt

**Database:** PostgreSQL

