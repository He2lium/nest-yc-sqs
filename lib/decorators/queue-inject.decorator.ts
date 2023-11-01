import {Inject} from "@nestjs/common";

export const InjectQueue = (token: string) => Inject(`YCMQ_FEATURE_${token}_CLIENT`)