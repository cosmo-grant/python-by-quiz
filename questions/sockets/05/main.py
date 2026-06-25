import socket
from threading import Thread

def client():
    socket.create_connection(("127.0.0.1", 65432))

srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.getsockname())
