import uuid

# UUID1 checks hardware. We don't want that. We want complete random.
_uuid = uuid.uuid4()
print(_uuid)
print("Length: " + str(len(str(_uuid))))
