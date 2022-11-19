# aws-sdk-client

### 개발 환경
- docker 20.10.8, docker-compose 1.29.2
- npm 8.1.4

### 설치 및 실행
```
npm install

export AWS_ACCESS_KEY_ID={YOUR_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY={YOUR_SECRET_ACCESS_KEY}

/bin/sh start.sh
```

### apis
- GET /aws/vpcs?region={YOUR_REGION}
- GET /aws/subnets?region={YOUR_REGION}