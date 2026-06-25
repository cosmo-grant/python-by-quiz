import socket

sock1 = socket.socket()
sock2 = socket.socket()
sock1.bind(("127.0.0.1", 65432))
sock2.bind(("127.0.0.1", 65432))
