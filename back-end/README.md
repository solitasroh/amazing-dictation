
## Description

Amazing-dictation backend api server

## Installation (순차적으로 진행)

```bash
$ npm install
# db 생성
$ docker-compose up -d # 이후 database 생성 필요

# db migration
$ npm run migrate

# db generate
$ npm run generate 
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


```

## Docker (Postgresql)

```bash
# execute docker image (daemon)
$ docker-compose up -d
```

## .env
```dotenv
# google login oauth 
GOOGLE_CLIENT_ID=<xxxxxxxxxxxx>
GOOGLE_SECRET=<xxxxxxxxxxxx>
GOOGLE_CLIENT_REDIRECT=<xxxxxxxxxxxx>

#kakao login oauth
KAKAO_CLIENT_ID=<xxxxxxxxxxxx>
KAKAO_CLIENT_SECRET=<xxxxxxxxxxxx>
KAKAO_CLIENT_REDIRECT=<xxxxxxxxxxxx>

# aws s3 (music data)
AWS_S3_BUCKET=<xxxxxxxxxxxx>
AWS_ACCESS_KEY_ID=<xxxxxxxxxxxx>
AWS_SECRET_ACCESS_KEY=<xxxxxxxxxxxx>
AWS_REGION=<xxxxxxxxxxxx>

# database
DB_USER_ID=<db 사용자 id>
DB_USER_PASSWORD=<db 사용자 패스워드>
POSTGRES_HOME_DIR=<local db backup 경로>
DB_PORT=<db port>
DB_NAME=<db name>
DATABASE_URL="postgresql://<db_user_id>:<db_user_password>@localhost:<db_port>/<db_name>?schema=public"
```
