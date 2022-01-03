# aws-infra
cross_tsのAWSインフラ周りを適当にまとめるリポジトリ

## How to Use?
### AdministratorAccessを付けたAWS credentialsを使えるようにする
```
$ make admin-user
```

AdministratorAccessを付けたユーザグループを作成し、そこにIAM Userを登録している。  
AWSコンソールからIAM Userのcredentialsを作成し保存し使用可能にする。  
rootユーザのcredentialsを削除し、このIAM Userのcredentialsを使用するようにする。  
ただしこちらも結局AdministratorAccessが付いているので後々必要な権限のみ切り出して使用したい。

### GitHub Actions用のOIDC Providerを登録する
```
$ make github-oidc-provider
```

GitHub Actions側からID FedarationでIAM Roleを使用できるようにOIDC Providerを登録する。  
使用するIAM Role側に作成したOIDC ProviderのARNを使ったfederated設定が必要なので注意。  


### 特定のIPを登録したPrefix Listを作成する
```
$ make prefix-list \
    MyIPv4Cidr=192.0.2.0/24 \
    MyIPv6Cidr=2001:DB8::/32 
```

#### (参考)ドキュメント用のIPアドレス範囲
* IPv4: [RFC5737](https://datatracker.ietf.org/doc/html/rfc5737)
* IPv6: [RFC3849](https://datatracker.ietf.org/doc/html/rfc3849)
