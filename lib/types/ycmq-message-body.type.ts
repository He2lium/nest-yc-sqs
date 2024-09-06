export interface YcmqMessageBody<Body=any> {
  Authorization?: string
  URL?: string,
  Body: Body
}