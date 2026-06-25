import socket
from threading import Thread


def client():
    sock = socket.socket()
    sock.settimeout(1)
    sock.connect(("127.0.0.1", 65432))
    print("connected")
    sock.send(b"x")
    print("sent")
    sock.recv(1024)
    print("received")


srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
