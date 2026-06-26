import socket
from threading import Thread


def client():
    sock = socket.socket()
    sock.connect(("127.0.0.1", 44444))
    print("connected")
    sock.send(b"x")
    print("sent")


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
