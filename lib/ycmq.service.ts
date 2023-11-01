import {Injectable} from "@nestjs/common";
import {SendMessageCommand, SQSClient} from "@aws-sdk/client-sqs";
import {YcmqFeatureOptions, YcmqOptions} from "./types/ycmq-options.type";

@Injectable()
export class YcmqService<MessageBodyType=any> extends SQSClient{
    private readonly featureOptions: YcmqFeatureOptions

    constructor(options: YcmqOptions, featureOptions: YcmqFeatureOptions) {
        //console.log('OPT',options, "FOPT", featureOptions)
        super(options)
        this.featureOptions = featureOptions
    }

    public async sendMessage(message: MessageBodyType){
        await this.send(new SendMessageCommand({
            QueueUrl: this.featureOptions.QueueUrl,
            MessageBody: JSON.stringify(message)
        }))
    }
}