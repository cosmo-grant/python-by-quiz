import socket
from threading import Thread

def client():
    sock = socket.create_connection(("127.0.0.1", 65432))
    sock.send(b"x")
    sock.close()

srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
print(conn.recv(1))
