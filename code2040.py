"""This is the code challenge written in Python"""

import requests
import json

#Register for the challenge
payload = { "email" : "jen.araujo112@gmail.com", "github" : "https://github.com/jenara112/Code2040-API-Challenge"}
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/register", json = payload, headers = headers)


#Store the token into a variable
token = r.json()

#Reverse a string -- Stage 1

payload = { "token" : token["result"]}
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/getstring", json = payload, headers = headers)

#Store the given string in a variable
first_string = r.json()
print first_string["result"]

"""[::-1]is a slice syntax that means [begin:end:step], when used as done in
this program, the string will be reversed."""

rev_string = first_string["result"][::-1]
print rev_string

#Send the string back to the code 2040 servers

payload = { "token" : token["result"], "string": rev_string}
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/validatestring", json = payload, headers = headers)

#Needle in a haystack -- Stage II
payload = { "token" : token["result"]}
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/haystack", json = payload, headers = headers)

#Store the needle and haystack in variables
dictionary = r.json()
hay_stack = dictionary["result"]["haystack"]
needle = dictionary["result"]["needle"]
print needle

#Find the posiiton of the needle using index
position = hay_stack.index(needle)
print position

# Send the needle back to the server
payload = { "token" : token["result"], "needle": position}
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/validateneedle", json = payload, headers = headers)
print r.json()

#Stage III Prefix
payload = { "token" : token["result"]}
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/prefix", json = payload, headers = headers)

#Variables to store the prefix and array
result = r.json()
prefix = result["result"]["prefix"]
print prefix
array = result["result"]["array"]
print array
new_list = []

#For loop to find values without the prefix
for value in array:
	if value.startswith(prefix) == False:
		new_list.append(value)

final_list = json.dumps(new_list)
print final_list

#Send back to the server
payload = { "token" : token["result"], "array": final_list }
headers = {'content-type': 'application/json', "Accept": 'application/json'}
r = requests.post("http://challenge.code2040.org/api/validateprefix", json = payload, headers = headers)









