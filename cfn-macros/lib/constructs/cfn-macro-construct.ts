import {
  aws_cloudformation as cloudformation,
  aws_lambda as lambda,
  aws_logs as logs,
  aws_iam as iam,
  RemovalPolicy
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface CFnMacroConstructProps {
  macroName: string,
  functionName: string,
  functionRuntime?: lambda.Runtime,
  functionHandler?: string,
}

export class CFnMacroConstruct extends Construct {

  readonly lambdaRole: iam.Role;
  readonly lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: CFnMacroConstructProps) {
    super(scope, id);

    this.lambdaRole = new iam.Role(scope, `${props.functionName}-Role`, {
      roleName: props.functionName,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })

    this.lambdaFunction = new lambda.Function(scope, props.functionName, {
      functionName: props.functionName,
      code: lambda.Code.fromAsset(`lambda/${props.functionName}/src`),
      runtime: props.functionRuntime ?? lambda.Runtime.PYTHON_3_9,
      handler: props.functionHandler ?? 'index.handler',
      role: this.lambdaRole,
    });

    const logGroup = new logs.LogGroup(scope, `${props.functionName}-LogGroup`, {
      logGroupName: `/aws/lambda/${props.functionName}`,
      retention: logs.RetentionDays.ONE_DAY,
      removalPolicy: RemovalPolicy.DESTROY,
    })
    logGroup.grantWrite(this.lambdaFunction)

    new cloudformation.CfnMacro(scope, props.macroName, {
      functionName: this.lambdaFunction.functionArn,
      name: props.macroName,
      logGroupName: logGroup.logGroupName,
    })
  }
}
