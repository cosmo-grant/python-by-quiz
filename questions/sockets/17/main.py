import socket

sock = socket.socket()
sock.bind(("127.0.0.1", 44444))
sock.listen()
sock.connect(("127.0.0.1", 55555))