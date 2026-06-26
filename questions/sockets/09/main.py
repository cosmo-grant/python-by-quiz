import socket

srv = socket.create_server(("127.0.0.1", 44444))
conn, _ = srv.accept()
print(conn)
