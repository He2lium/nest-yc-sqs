import {FactoryProvider, ModuleMetadata} from "@nestjs/common";
import {SQSClientConfig} from "@aws-sdk/client-sqs";

export interface YcmqOptions extends SQSClientConfig {}

export type YcmqAsyncOptions =
    Pick<ModuleMetadata, "imports">
    &
    Pick<FactoryProvider<YcmqOptions>,"useFactory"|"inject">

export interface YcmqFeatureOptions{
    QueueUrl: string,
}

export type YcmqFeatureAsyncOptions =
    Pick<ModuleMetadata, "imports">
    &
    Pick<FactoryProvider<YcmqFeatureOptions>,"useFactory"|"inject">
    &
    {QueueToken: string}