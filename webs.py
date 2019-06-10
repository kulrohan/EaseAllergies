from bs4 import BeautifulSoup
import urllib.request
import json
from urllib.request import urlopen
from twilio.rest import Client

url = 'https://weather.com/forecast/allergy/l/USNY0996:1:US'
hdr = {'User-Agent': 'Mozilla/5.0','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'}
request = urllib.request.Request(url, headers=hdr)
page = urllib.request.urlopen(request)
soup = BeautifulSoup(page, 'html.parser')

# print(soup)
dates = []
plevels = []
weathers = []

temp_taken = soup.findAll('div', class_="styles__allergyOutlookDaysButtonContainer__1vcbN")
# temp_taken = temp_taken.div.extract()
# temp_taken.find_next('div')

# temp = temp_taken.text.strip()
for x in range(0, len(temp_taken)):
    date = temp_taken[x].div.extract();
    date = date.text.strip();
    dates.append(date);
    buff = temp_taken[x].find_next('div') #buffer for the colored dot
    pollen = buff.find_next('div') #pollen level (low, high, whatever)
    pollen = pollen.text.strip();
    pollen = plevels.append(pollen)


# print(dates)
# print(plevels)

url = 'https://weather.com/weather/tenday/l/08558:4:US'
request = urllib.request.Request(url, headers=hdr)
page = urllib.request.urlopen(request)
soup = BeautifulSoup(page, 'html.parser')

temp_taken = soup.findAll('td', class_="description")
# print(temp_taken[0].span.extract());
for x in range (0, 7):
    weather = temp_taken[x].span.extract()
    weather = weather.text.strip();
    weathers.append(weather);
# print(weathers)

sms_json = {}
for x in range(0, 7):
    sms_json[dates[x]] = [weathers[x], plevels[x]]


# print(sms_json)


with open('result.json', 'w') as outfile:
    json.dump(sms_json, outfile)

# print(temp_taken)
#it works!!!!
#
# url = 'https://news.google.com/news/?ned=us&hl=en'
# request = urllib.request.Request(url, headers=hdr)
# page = urllib.request.urlopen(request)
#
# soup = BeautifulSoup(page, 'html.parser')
#
# print(soup)
#
# head_taken = soup.find('a', attrs={'class':'nuEeue hzdq5d ME7ew'})
#
# head = head_taken.text.strip()
#
# print(head)
#
# #find multiple headlines of same tags.  Make list, set LIMIT.  use list nums to
# #arrive at some headlines.  Strip individually, then print.
#
# head_taken = soup.findAll('a', attrs={'class':'nuEeue hzdq5d ME7ew', 'role':'heading'}, limit = 100)
#
# PLSstrip = head_taken[2]
# headline = PLSstrip.text.strip()
# print(headline)
#
# for x in range (0, 100):
#     PLSstrip = head_taken[x]
#     headline = PLSstrip.text.strip()
    #print(headline)
