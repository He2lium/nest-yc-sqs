import {Inject} from "@nestjs/common";
import {getClientTokenUtil} from "../utils/get-client-token.util";

export const InjectQueue = (token: string) => Inject(getClientTokenUtil(token))