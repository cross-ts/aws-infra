import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface GlobalStackProps extends StackProps {
  readonly domain: string,
}

export class GlobalStack extends Stack {
  constructor(scope: Construct, id: string, props: GlobalStackProps) {
    super(scope, id, props);
  }
}
