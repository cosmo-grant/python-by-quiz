import socket

sock = socket.socket()
sock.listen()
ip, _ = sock.getsockname()
print(ip)
