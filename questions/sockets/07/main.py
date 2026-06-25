import socket

srv = socket.socket()
srv.bind(("127.0.0.1", 65432))

client = socket.socket()
client.connect(("127.0.0.1", 65432))
