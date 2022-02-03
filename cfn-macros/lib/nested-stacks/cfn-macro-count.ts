import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CFnMacroConstruct } from '../constructs/cfn-macro-construct';

export interface CFnMacroCountProps extends NestedStackProps {
}

export class CFnMacroCount extends NestedStack {
  constructor(scope: Construct, id: string, props?: CFnMacroCountProps) {
    super(scope, id, props);

    new CFnMacroConstruct(this, id, {
      macroName: 'Count',
      functionName: 'cfn-macro-count',
    })
  }
}
