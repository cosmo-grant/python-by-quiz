import socket
from threading import Thread

def client():
    sock = socket.socket()
    sock.connect(("127.0.0.1", 65432))
    sock.send(b"x")

srv = socket.socket()
srv.bind(("127.0.0.1", 65432))
srv.listen()
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
