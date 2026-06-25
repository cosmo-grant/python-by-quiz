import socket

srv = socket.create_server(("127.0.0.1", 65432))
srv.setblocking(False)
res = srv.accept()
print(res)
