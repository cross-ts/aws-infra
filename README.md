# aws-infra
cross_tsのAWSインフラ周りを適当にまとめるリポジトリ

## init

最初に雑に必要そうなものを定義している。
* AdministratorAccessをつけたUser
* GitHub OIDC Providerのtrust
* cfn templateのupload用S3 Bucket

### How to Use?
#### create init.properties
```
$ cd init
$ cp main.properties.template main.properties
$ vim main.properties
```

#### Deploy init
```
$ cd init
$ aws cloudformation deploy \
    --stack-name $(basename $(pwd)) \
    --template-file main.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --paramter-overrides $(cat main.properties)
```

## cdk-toolkit

* `cdk bootstrap` で実行されるCFnのテンプレートを吐き出したもの
* デプロイの際にtmpを作成するS3バケットをCFnと共通で使えるように名前をつけている

### How to Use?
#### Create bootstrap.properties
```
$ cd cdk-toolkit
$ cp bootstrap.properties.template bootstrap.properties
$ vim bootstrap.properties
```

#### Deploy cdk-toolkit
```
$ cd cdk-toolkit
$ aws cloudformation deploy \
    --stack-name $(basename $(pwd)) \
    --template-file bootstrap.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --paramter-overrides $(cat main.properties)
```
