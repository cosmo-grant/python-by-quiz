import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sock.send(b"x")


srv1 = socket.create_connection(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv1.accept()
conn.recv(1)
conn.close()
srv1.close()

srv2 = socket.create_connection(("127.0.0.1", 44444))
Thread(target=client).start()
conn.recv(1)
conn.close()
srv1.close()
