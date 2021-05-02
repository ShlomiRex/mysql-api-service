import psutil

while True:
	cpu = psutil.cpu_percent(interval=3)
	ram = psutil.virtual_memory()

	ram_avail = ram[1]
	ram_percent = ram[2]
	ram_used = ram[3]

	print(f"CPU: {cpu}, RAM percent: {ram_percent}")