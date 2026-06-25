import socket
from threading import Thread
from time import sleep


def client():
    sock = socket.create_connection(("127.0.0.1", 65432))
    sleep(1)
    sock.send(b"x")
    sleep(1)
    sock.send(b"y")


srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(2))
