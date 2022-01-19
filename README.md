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
* デフォルトの挙動と違うのは以下
  * デプロイの際にtmpを作成するS3バケットをCFnと共通で使えるように名前をつけている
  * Asset用のS3バケットとECRにLifecycle設定を追加している

### How to Use?
#### Create main.properties
```
$ cd cdk-toolkit
$ cp main.properties.template main.properties
$ vim main.properties
```

#### Deploy cdk-toolkit
```
$ cd cdk-toolkit
$ aws cloudformation deploy \
    --stack-name $(basename $(pwd)) \
    --template-file main.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --paramter-overrides $(cat main.properties)
```

#### If you change from default.

See: https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/bootstrapping.html#bootstrapping-custom-synth
