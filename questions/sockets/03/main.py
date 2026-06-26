import socket
from threading import Thread


def client():
    conn = socket.create_connection(("127.0.0.1", 44444))
    print(type(conn).__name__)


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print(type(srv).__name__)
print(type(conn).__name__)
