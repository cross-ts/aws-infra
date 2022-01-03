all: \
	admin-user \
	github-oidc-provider \
	prefix-list

admin-user: admin-user.yml
	@aws cloudformation deploy \
		--template-file admin-user.yml \
		--stack-name AdminUser \
		--capabilities CAPABILITY_NAMED_IAM

github-oidc-provider: github-oidc-provider.yml
	@aws cloudformation deploy \
		--template-file github-oidc-provider.yml \
		--stack-name GitHubOIDCProvider

prefix-list: prefix-list.yml
	@aws cloudformation deploy \
		--template-file prefix-list.yml \
		--stack-name PrefixList \
		--parameter-overrides \
			MyIPv4Cidr=$(MyIPv4Cidr) \
			MyIPv6Cidr=$(MyIPv6Cidr)
