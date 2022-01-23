#!/usr/bin/env node
import * as path from 'path';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RootStack } from '../lib/root-stack';

const app = new cdk.App();
new RootStack(app, 'RootStack', {
  stackName: path.basename(path.resolve()),
  synthesizer: new cdk.DefaultStackSynthesizer({
    fileAssetsBucketName: app.node.tryGetContext("fileAssetsBucketName"),
  }),
});
