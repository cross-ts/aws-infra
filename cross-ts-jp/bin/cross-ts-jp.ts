#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LocalStack } from '../lib/local-stack';
import { GlobalStack } from '../lib/global-stack';

const app = new cdk.App();
new LocalStack(app, 'LocalStack', {
  env: { region: 'ap-northeast-1' },
  domain: app.node.tryGetContext('domain'),
});

new GlobalStack(app, 'GlobalStack', {
  env: { region: 'us-east-1' },
  domain: app.node.tryGetContext('domain'),
});
