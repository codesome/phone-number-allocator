import pprint
import requests

if __name__ == "__main__":

	url = "http://localhost:3000"

	option = int(input("""

1. Get a number
2. Get a secial number
3. Get N numbers

Your choice: """))

	if option==1:
		r = requests.post(url+"/getNumber")
		print("Response:")
		pprint.pprint(r.json())

	elif option==2:
		wantedNumber = input("Enter the special number: ")
		data = {'number': wantedNumber}
		r = requests.post(url+"/getSpecialNumber", data=data)
		print("Response:")
		pprint.pprint(r.json())

	elif option==3:
		N = int(input("Enter N: "))
		for i in range(N):
			r = requests.post(url+"/getNumber")
			pprint.pprint(r.json())

	else:
		print("Invalid Option")