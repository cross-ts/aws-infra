#!/usr/bin/env node
import * as path from 'path';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MinecraftStack } from '../lib/minecraft-stack';

const app = new cdk.App();
new MinecraftStack(app, 'MinecraftStack', {
  stackName: path.basename(path.resolve()),
  synthesizer: new cdk.DefaultStackSynthesizer({
    fileAssetsBucketName: app.node.tryGetContext("fileAssetsBucketName"),
  }),
});
