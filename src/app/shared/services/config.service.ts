import {
  SSMClient,
  GetParametersByPathCommand,
  Parameter,
} from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({
  region: process.env.AWS_REGION,
});

export class ConfigService {
  static async getAllParameters(environment: string): Promise<void> {
    const path = `/${environment}/`;
    let parameters: Parameter[] = [];
    let nextToken: string | undefined;

    do {
      const command = new GetParametersByPathCommand({
        Path: path,
        Recursive: true,
        WithDecryption: true,
        NextToken: nextToken,
      });

      try {
        const response = await ssmClient.send(command);
        if (response.Parameters) {
          parameters = parameters.concat(response.Parameters);
        }
        nextToken = response.NextToken;
      } catch (error: any) {
        throw new Error(`Error fetching parameters: ${error.message}`);
      }
    } while (nextToken);

    parameters.forEach((param) => {
      const envName = param.Name!.split(path)[1];
      process.env[envName] = param.Value;
    });
  }
}
