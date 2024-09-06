import {Injectable} from "@nestjs/common";
import { ListMessageMoveTasksCommand, ReceiveMessageCommand, SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import {YcmqFeatureOptions, YcmqOptions} from "./types/ycmq-options.type";

@Injectable()
export class YcmqService<MessageBodyType=any> extends SQSClient{
    private readonly featureOptions: YcmqFeatureOptions

    constructor(options: YcmqOptions, featureOptions: YcmqFeatureOptions) {
        super(options)
        this.featureOptions = featureOptions
    }

    public async sendMessage(message: MessageBodyType, DelaySeconds?: number): Promise<void> {
        await this.send(new SendMessageCommand({
            QueueUrl: this.featureOptions.QueueUrl,
            MessageBody: JSON.stringify(message),
            DelaySeconds: DelaySeconds ?? this.featureOptions.DelaySeconds
        }))
    }

    public async listMessages(){
        const {Messages} = await this.send(new ReceiveMessageCommand({
            QueueUrl: this.featureOptions.QueueUrl,
            MaxNumberOfMessages: 1
        }))
        Messages[0].Body
    }
}