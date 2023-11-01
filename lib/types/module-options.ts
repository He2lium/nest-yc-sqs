import {SQSClientConfig} from "@aws-sdk/client-sqs";
import {FactoryProvider, ModuleMetadata} from "@nestjs/common";

export interface SQSModuleRootOptions extends SQSClientConfig{

}

export interface SQSModuleOptions{
    sqs_url: string
}

export type SQSModuleRootAsyncOptions =
    Pick<ModuleMetadata, "imports"> &
    Pick<FactoryProvider<SQSModuleRootOptions>,"useFactory"|"inject">

export type SQSModuleAsyncOptions =
    Pick<ModuleMetadata, "imports"> &
    Pick<FactoryProvider<SQSModuleOptions>,"useFactory"|"inject">