import { Fn, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface LocalStackProps extends StackProps {
  readonly domain: string,
}

export class LocalStack extends Stack {
  constructor(scope: Construct, id: string, props: LocalStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: props.domain,
    });

    const organization = this.node.tryGetContext('organization');
    const repository = this.node.tryGetContext('repository');
    const oidcProviderArn = Fn.importValue('GitHubOIDCProviderArn');
    const deployRole = new iam.Role(this, 'DeployRole', {
      assumedBy: new iam.WebIdentityPrincipal(oidcProviderArn, {
        'StringLike': {
          'token.actions.githubusercontent.com:sub': `repo:${organization}/${repository}:*`,
        },
      }),
    });
    bucket.grantDelete(deployRole);
    bucket.grantWrite(deployRole);
  }
}
