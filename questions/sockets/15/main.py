import socket
from threading import Thread

def client():
    socket.create_connection(("127.0.0.1", 44444))

srv1 = socket.socket()
srv1.bind(("127.0.0.1", 44444))
srv1.listen()
Thread(target=client).start()
conn, _ = srv1.accept()
conn.close()
srv1.close()

srv2 = socket.socket()
srv2.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
srv2.bind(("127.0.0.1", 44444))
