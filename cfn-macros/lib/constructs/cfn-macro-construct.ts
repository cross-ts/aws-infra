import {
  aws_cloudformation as cloudformation,
  aws_lambda as lambda,
  aws_logs as logs,
  RemovalPolicy
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface CFnMacroConstructProps {
  functionName: string,
  macroName: string,
}

export class CFnMacroConstruct extends Construct {
  constructor(scope: Construct, id: string, props: CFnMacroConstructProps) {
    super(scope, id);

    const fn = new lambda.Function(scope, props.functionName, {
      functionName: props.functionName,
      code: lambda.Code.fromAsset(`lambda/${props.functionName}/src`),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.handler',
    });

    new logs.LogGroup(scope, `${props.functionName}-LogGroup`, {
      logGroupName: `/aws/lambda/${fn.functionName}`,
      retention: logs.RetentionDays.ONE_DAY,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    new cloudformation.CfnMacro(scope, props.macroName, {
      functionName: fn.functionArn,
      name: props.macroName,
    })
  }
}
