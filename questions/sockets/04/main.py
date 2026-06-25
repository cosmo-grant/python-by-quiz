import socket
from threading import Thread


def client():
    conn = socket.create_connection(("127.0.0.1", 65432))
    print(type(conn))


srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(type(srv))
print(type(conn))
