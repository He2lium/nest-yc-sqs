import {DynamicModule, Module, Provider} from '@nestjs/common';
import {YcmqAsyncOptions, YcmqFeatureAsyncOptions, YcmqFeatureOptions, YcmqOptions} from "./types/ycmq-options.type";
import {YcmqCoreModule} from "./ycmq-core.module";
import {YCMQ_OPTIONS_TOKEN} from "./ycmq.constants";
import {YcmqService} from "./ycmq.service";
import {Type} from "@nestjs/common/interfaces/type.interface";
import {ForwardReference} from "@nestjs/common/interfaces/modules/forward-reference.interface";
import {getClientTokenUtil} from "./utils/get-client-token.util";

@Module({})
export class YcmqModule {

    static forRootAsync(options: YcmqAsyncOptions): DynamicModule {
        return {
            module: YcmqModule,
            imports: [YcmqCoreModule.forRootAsync(options)]
        }
    }

    static forFeatureAsync(options: YcmqFeatureAsyncOptions[]): DynamicModule {
        const providers: Provider[] = []
        const exports: string[] = []
        let imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> = []
        for(let option of options){
            const options_token = `YCMQ_FEATURE_${option.QueueToken}_OPTIONS`
            const client_token = getClientTokenUtil(option.QueueToken)
            providers.push({
                provide: options_token,
                useFactory: option.useFactory,
                inject: option.inject
            })
            providers.push({
                provide: client_token,
                useFactory: (options: YcmqOptions, featureOptions: YcmqFeatureOptions) =>
                    new YcmqService(options, featureOptions),
                inject: [YCMQ_OPTIONS_TOKEN, options_token]
            })
            exports.push(client_token)
            option.imports?.forEach(i=>{if(i)imports.push(i)})
        }

        return {
            module: YcmqModule,
            imports: [...new Set(imports)],
            providers,
            exports
        }
    }
}
