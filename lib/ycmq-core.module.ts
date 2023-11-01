import {DynamicModule, Module} from '@nestjs/common';
import {YcmqAsyncOptions} from "./types/ycmq-options.type";
import {YCMQ_OPTIONS_TOKEN} from "./ycmq.constants";

@Module({})
export class YcmqCoreModule {
    static forRootAsync(options: YcmqAsyncOptions):DynamicModule{
        return{
            module: YcmqCoreModule,
            global: true,
            imports: options.imports,
            providers: [
                {
                    provide: YCMQ_OPTIONS_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject
                }
            ],
            exports: [YCMQ_OPTIONS_TOKEN]
        }
    }
}
