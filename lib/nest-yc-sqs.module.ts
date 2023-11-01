import {DynamicModule, Module} from '@nestjs/common';
import {SQSModuleAsyncOptions, SQSModuleRootAsyncOptions} from "./types/module-options";
import {SQS_OPTIONS_TOKEN} from "./module.constants";
import {NestYcSqsService} from "./nest-yc-sqs.service";
import {NestYcSqsCoreModule} from "./nest-yc-sqs-core.module";

@Module({})
export class NestYcSqsModule {
    static forRootAsync(options: SQSModuleRootAsyncOptions): DynamicModule {
        return {
            module: NestYcSqsModule,
            imports: [NestYcSqsCoreModule.forRootAsync(options)]
        }
    }

    static forFeatureAsync(options: SQSModuleAsyncOptions): DynamicModule {
        const {imports, useFactory, inject} = options
        return {
            module: NestYcSqsModule,
            imports,
            providers: [{
                provide: SQS_OPTIONS_TOKEN,
                useFactory,
                inject
            }, NestYcSqsService],
            exports: [SQS_OPTIONS_TOKEN]
        }
    }
}
