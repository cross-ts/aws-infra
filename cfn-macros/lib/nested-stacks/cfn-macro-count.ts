import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CFnMacroConstruct } from '../constructs/cfn-macro-construct';

export class CFnMacroCount extends NestedStack {
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    new CFnMacroConstruct(this, id, {
      functionName: 'cfn-macro-count',
      macroName: 'Count',
    })
  }
}
