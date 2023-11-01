import {DynamicModule, Global, Module} from "@nestjs/common";
import {SQSModuleRootAsyncOptions} from "./types/module-options";
import {SQS_ROOT_OPTIONS_TOKEN} from "./module.constants";

@Module({})
@Global()
export class NestYcSqsCoreModule {
    static forRootAsync(options: SQSModuleRootAsyncOptions): DynamicModule {
        const {imports, useFactory, inject} = options
        return {
            module: NestYcSqsCoreModule,
            imports,
            providers: [{
                provide: SQS_ROOT_OPTIONS_TOKEN,
                useFactory,
                inject
            }],
            exports: [SQS_ROOT_OPTIONS_TOKEN]
        }
    }
}