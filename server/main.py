import psutil
import requests
import json

while True:
	cpu_percent = psutil.cpu_percent(interval=3)
	ram = psutil.virtual_memory()

	ram_avail = ram[1]
	ram_percent = ram[2]
	ram_used = ram[3]

	print(f"CPU: {cpu_percent}, RAM percent: {ram_percent}")

	api_key = "fd925d38-0c48-4c20-9b74-67502c5a3096"
	headers = {'content-type': 'application/json'}
	payload = {
		'cpu_percent': cpu_percent,
		'api_key': api_key,
		'ram_percent': ram_percent
	}
	url = "http://localhost:80/hardware_usage"
	
	response = requests.post(url, data=json.dumps(payload), headers=headers)