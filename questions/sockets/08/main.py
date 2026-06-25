import socket
from threading import Thread
from time import sleep


def client():
    sock = socket.create_connection(("127.0.0.1", 65432))
    sleep(3)
    sock.send(b"x")


srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print("here")
print(conn.recv(1))
