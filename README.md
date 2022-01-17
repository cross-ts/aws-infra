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
$ cp init.properties.template init.properties
$ vim init.properties
```

#### Deploy init
```
$ cd init
$ aws cloudformation deploy \
    --stack-name <stack name> \
    --template-file main.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --paramter-overrides $(cat init.properties)
```
