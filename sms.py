from twilio.rest import Client
import json
# Download the helper library from https://www.twilio.com/docs/python/install


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'XXXXXXXXXXXXX'
auth_token = 'XXXXXXXXXXXXXXX'
client = Client(account_sid, auth_token)

#get forecast

with open('result.json') as json_file:
    yo = json.load(json_file)
    # print(len(yo))

    forecast1 = "Today, the weather is " + yo["Tonight"][0] + ' and the pollen level is ' + yo["Tonight"][1] + '.'
    forecast2 = " On Sunday June 9, the weather is " + yo["Sun 9"][0] + ' and the pollen level is ' + yo["Sun 9"][1] + '.'
    forecast3 = " On Monday June 10, the weather is " + yo["Mon 10"][0] + ' and the pollen level is ' + yo["Mon 10"][1] + '.'
    forecast4 = " On Tuesday June 11, the weather is " + yo["Tue 11"][0] + ' and the pollen level is ' + yo["Tue 11"][1] + '.'
    forecast5 = " On Wednesday June 12, the weather is " + yo["Wed 12"][0] + ' and the pollen level is ' + yo["Wed 12"][1] + '.'
    forecast6 = " On Thrusday June 13, the weather is " + yo["Thu 13"][0] + ' and the pollen level is ' + yo["Thu 13"][1] + '.'
    forecast7 = " On Friday June 14, the weather is " + yo["Fri 14"][0] + ' and the pollen level is ' + yo["Fri 14"][1] + '.'

    forecast = forecast1 + forecast2 + forecast3 + forecast4 + forecast5 + forecast6 + forecast7



with open('tf.json') as json_file:
    data = json.load(json_file)
    my_result = data["analysis"]
    if my_result == True: #you will fall sick

        with open('t.json') as t_file:
            data = json.load(t_file)
            t0 = data["t0"];
            t1 = data["t1"];
            t2 = data["t2"];
            if t0 == t1:
                t0 = ''
            elif t0 == t2:
                t0 = ''
            elif t1 == t2:
                t1 = ''
            else:
                pass
            treatment_text = ' According to your history, some drugs that may help you include ' + t0 + ' ' + t1 + ' ' + t2 + '.'
            # print(treatment_text)

        with open('s.json') as s_file:
            sdata = json.load(s_file)
            s0 = sdata["symp0"]["1"];
            s1 = sdata["symp0"]["2"];
            s2 = sdata["symp1"]["1"];
            s3 = sdata["symp1"]["2"];
            s4 = sdata["symp2"]["1"];
            s5 = sdata["symp2"]["2"];

            if s0 == s2:
                s0 = ''
            elif s0 == s3:
                s0 = ''
            elif s0 == s4:
                s0 = ''
            elif s0 == s5:
                s0 = ''
            else:
                pass

            if s1 == s2:
                s1 = ''
            elif s1 == s3:
                s1 = ''
            elif s1 == s4:
                s1 = ''
            elif s1 == s5:
                s1 = ''
            else:
                pass

            if s2 == s4:
                s2 = ''
            elif s2 == s5:
                s2 = ''
            else:
                pass
            if s3 == s4:
                s3 = ''
            elif s3 == s5:
                s3 = ''
            else:
                pass

            # print(s1 + s2 + s3 + s4 + s5 + s0)
            symptoms_text = ' In previous allergies, you have suffered from ' + s1 + ' ' + s2 + ' ' + s3 + ' ' + s4 + ' ' + s5 +  ' ' + s0 + '.'

            thistext = forecast + symptoms_text + treatment_text
    else: #you will not fall sick
        thistext = forecast + ' Based on your medical history, you are not at risk of falling sick today.'






message = client.messages \
                .create(
                     body=thistext,
                     from_='+18583755172',
                     to='+19085528307'
                 )

print(message.sid)
