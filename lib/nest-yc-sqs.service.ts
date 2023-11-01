import {Inject, Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {SQS_OPTIONS_TOKEN, SQS_ROOT_OPTIONS_TOKEN} from "./module.constants";
import {SQSModuleOptions, SQSModuleRootOptions} from "./types/module-options";

@Injectable()
export class NestYcSqsService implements OnApplicationBootstrap{
    constructor(
        @Inject(SQS_ROOT_OPTIONS_TOKEN) private readonly rootOptions: SQSModuleRootOptions,
        @Inject(SQS_OPTIONS_TOKEN) private readonly sqsOptions: SQSModuleOptions,
    ) {
    }

    onApplicationBootstrap(): any {

    }

    async getConfig():Promise<any>{
        return {
            ...this.rootOptions,
            ...this.sqsOptions
        }
    }
}
