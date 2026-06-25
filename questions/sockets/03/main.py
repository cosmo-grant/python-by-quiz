import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 65432))
    sock.send(b"x")


srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
