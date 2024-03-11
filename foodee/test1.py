from sendsms.message import SmsMessage

message = SmsMessage(body='I can haz txt', from_phone='+919106930717', to=['+919106930717'])
message.send()