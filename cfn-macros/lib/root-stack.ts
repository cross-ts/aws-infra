import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { CFnMacroCount } from './nested-stacks/cfn-macro-count';

export class RootStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CFnMacroCount(this, id, {});
  }
}
