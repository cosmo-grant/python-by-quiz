import socket

srv = socket.create_server(("127.0.0.1", 65432))
res = srv.accept()
print(res)
