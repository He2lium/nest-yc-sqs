import {DynamicModule, Module} from '@nestjs/common';
import {YcmqAsyncOptions, YcmqFeatureAsyncOptions, YcmqFeatureOptions, YcmqOptions} from "./types/ycmq-options.type";
import {YcmqCoreModule} from "./ycmq-core.module";
import {YCMQ_OPTIONS_TOKEN} from "./ycmq.constants";
import {YcmqService} from "./ycmq.service";

@Module({})
export class YcmqModule {

    static forRootAsync(options: YcmqAsyncOptions): DynamicModule {
        return {
            module: YcmqModule,
            imports: [YcmqCoreModule.forRootAsync(options)]
        }
    }

    static forFeatureAsync(options: YcmqFeatureAsyncOptions): DynamicModule {
        const options_token = `YCMQ_FEATURE_${options.QueueToken}_OPTIONS`
        const client_token = `YCMQ_FEATURE_${options.QueueToken}_CLIENT`
        return {
            module: YcmqModule,
            imports: options.imports,
            providers: [
                {
                    provide: options_token,
                    useFactory: options.useFactory,
                    inject: options.inject
                }, {
                    provide: client_token,
                    useFactory: (options: YcmqOptions, featureOptions: YcmqFeatureOptions) =>
                        new YcmqService(options, featureOptions),
                    inject: [YCMQ_OPTIONS_TOKEN, options_token]
                }
            ],
            exports: [client_token]
        }
    }
}
