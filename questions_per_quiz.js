// Generated automatically. Do not edit.

const QUESTIONS_PER_QUIZ = {
  sockets: [
    {
      preface: ``,
      code: `import socket
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
`,
      answers: [
        `b'x'
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `A minimal example of client-server socket communication.`,
    },

    {
      preface: ``,
      code: `import socket

sock = socket.socket()
sock.connect(("127.0.0.1", 65432))  # nothing listening
`,
      answers: [
        `ConnectionRefusedError: [Errno 111] Connection refused
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `The kernel replies with a TCP RST.`,
    },

    {
      preface: ``,
      code: `import socket
from threading import Thread

def client():
    sock = socket.create_connection(("127.0.0.1", 65432))
    sock.send(b"x")

srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
`,
      answers: [
        `b'x'
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `Convenience functions.



<code>create_server()</code> returns a bound, listening socket.



<code>create_connection()</code> returns a connected socket.`,
    },

    {
      preface: ``,
      code: `import socket
from threading import Thread

def client():
    conn = socket.create_connection(("127.0.0.1", 65432))
    print(type(conn))

srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(type(srv))
print(type(conn))
`,
      answers: [
        `<class 'socket.socket'>
<class 'socket.socket'>
<class 'socket.socket'>
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `Sockets can play two roles: server sockets (switchboard operators) and client sockets (connection endpoints).

But all still sockets.`,
    },

    {
      preface: ``,
      code: `import socket
from threading import Thread

def client():
    socket.create_connection(("127.0.0.1", 65432))

srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.getsockname())
`,
      answers: [
        ``,
        `('127.0.0.1', 65432)
`,
        ``,
      ],
      correct: 1,
      explanation: `<code>accept()</code> returns a new local socket, which shares the listener's address.`,
    },

    {
      preface: ``,
      code: `import socket
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
`,
      answers: [
        ``,
        `b'x'
b''
`,
        ``,
      ],
      correct: 1,
      explanation: `<code>recv()</code> returns empty when the peer has closed the connection.`,
    },

    {
      preface: ``,
      code: `import socket

srv = socket.socket()
srv.bind(("127.0.0.1", 65432))

client = socket.socket()
client.connect(("127.0.0.1", 65432))
`,
      answers: [
        `ConnectionRefusedError: [Errno 111] Connection refused
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `<code>bind()</code> reserves the port, but the kernel rejects connections until you call <code>listen()</code>.`,
    },

    {
      preface: ``,
      code: `import socket
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
`,
      answers: [
        `here
<~3s>
b'x'
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `<code>recv(n)</code> blocks until data is available or the connection is closed, then returns up to <code>n</code> bytes.`,
    },

    {
      preface: ``,
      code: `import socket
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
`,
      answers: [
        `<~1s>
b'x'
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `<code>recv(n)</code> blocks until data is available or the connection is closed, then returns up to <code>n</code> bytes.`,
    },

    {
      preface: ``,
      code: `import socket

srv = socket.create_server(("127.0.0.1", 65432))
res = srv.accept()
print(res)
`,
      answers: [
        ``,
        ``,
        `...
`,
      ],
      correct: 2,
      explanation: `By default sockets are blocking.

For a blocking socket, <code>accept()</code> blocks until a connection is available.`,
    },

    {
      preface: ``,
      code: `import socket

srv = socket.create_server(("127.0.0.1", 65432))
srv.setblocking(False)
res = srv.accept()
print(res)
`,
      answers: [
        ``,
        ``,
        `BlockingIOError: [Errno 11] Resource temporarily unavailable
`,
      ],
      correct: 2,
      explanation: `For a non-blocking socket, operations fail if they can't be completed immediately.`,
    },

    {
      preface: ``,
      code: `import socket

sock1 = socket.socket()
sock2 = socket.socket()
sock1.bind(("127.0.0.1", 65432))
sock2.bind(("127.0.0.1", 65432))
`,
      answers: [
        ``,
        `OSError: [Errno 98] Address already in use
`,
        ``,
      ],
      correct: 1,
      explanation: ``,
    },

    {
      preface: ``,
      code: `import socket

sock = socket.socket()
sock.bind(("127.0.0.1", 44444))
sock.bind(("127.0.0.1", 55555))
`,
      answers: [
        ``,
        `OSError: [Errno 22] Invalid argument
`,
        ``,
      ],
      correct: 1,
      explanation: `Rebinding a bound port errors.

A cryptic message, no?`,
    },

    {
      preface: ``,
      code: `import socket
from threading import Thread

def client():
    socket.create_connection(("127.0.0.1", 65432))

srv1 = socket.socket()
srv1.bind(("127.0.0.1", 65432))
srv1.listen()
Thread(target=client).start()
conn, _ = srv1.accept()
conn.close()
srv1.close()

srv2 = socket.socket()
srv2.bind(("127.0.0.1", 65432))
srv2.listen()
`,
      answers: [``, ``, `OSError: [Errno 48] Address already in use`],
      correct: 2,
      explanation: `The kernel puts the connection's closing side in <code>TIME_WAIT</code> for a while, else delayed packets might bleed into fresh connections.`,
    },

    {
      preface: ``,
      code: `import socket
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
`,
      answers: [
        ``,
        `OSError: [Errno 98] Address already in use
`,
        ``,
      ],
      correct: 1,
      explanation: `The kernel puts the connection in <code>TIME_WAIT</code> state for a while.



<code>SO_REUSEADDR</code> tells the kernel to allow binds to <code>TIME_WAIT</code>s.`,
    },

    {
      preface: ``,
      code: `import socket

sock = socket.socket()
sock.listen()
ip, _ = sock.getsockname()
print(ip)
`,
      answers: [``, ``, ``],
      correct: 0,
      explanation: `<code>listen()</code> without <code>bind()</code>


<code>0.0.0.0</code> is the IPv4 wildcard address, meaning "listen on all the host's IPs".

The kernel chooses an ephemeral port.`,
    },

    {
      preface: ``,
      code: `import socket

sock = socket.socket()
sock.bind(("127.0.0.1", 44444))
sock.listen()
sock.connect(("127.0.0.1", 55555))`,
      answers: [``, ``, ``],
      correct: 0,
      explanation: `Calling <code>sock.listen()</code> makes <code>sock</code> a passive or listening socket.`,
    },

    {
      preface: ``,
      code: `import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 65432))
    sock.send(b"x")


srv = socket.create_server(("127.0.0.1", 65432))
Thread(target=client).start()
conn, _ = srv.accept()
srv.close()
print(conn.recv(1))
`,
      answers: [
        ``,
        `b'x'
`,
        ``,
      ],
      correct: 1,
      explanation: `<code>srv</code> and <code>conn</code> are independent sockets.



<code>srv.close()</code> leaves untouched <code>conn</code> and the connection.`,
    },

    {
      preface: ``,
      code: `import socket
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
`,
      answers: [
        `connected
sent
<~1s>
Exception in thread Thread-1 (client):
TimeoutError: timed out
`,
        ``,
        ``,
      ],
      correct: 0,
      explanation: `No <code>accept()</code>.



But it's the kernel that handshakes and buffers, so the client can still connect and send.`,
    },
  ],

  concurrency: [
    {
      preface: `<p>What does this output?</p>
`,
      code: `from time import sleep

sleep(3)
print("done")
sleep(3)
print("done")
print("here")
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `NOT ME!
`,
        `NOT ME!
`,
      ],
      correct: 0,
      explanation: `<p>One process, one thread, no event loop.</p>

<p>Simple. Slow.</p>
`,
    },

    {
      preface: `<p>Let's move the work into threads. Output?</p>
`,
      code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread2.start()
print("here")
`,
      answers: [
        `<~3s>
here
done
done
`,
        `here
<~3s>
done
done
`,
        `<~3s>
done
<~3s>
done
here
`,
      ],
      correct: 1,
      explanation: `<p>A thread runs only when it holds the Global Interpreter Lock.</p>

<p>
  The running thread is paused regularly, or when it makes a syscall, and a
  ready thread gets the GIL and runs. Interleaved, not parallel.
</p>

<p>
  So: when <code>thread1</code> and <code>thread2</code> sleep, the main thread
  runs.
</p>
`,
    },

    {
      preface: `<p>What if we <code>join()</code> them?</p>
`,
      code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `<~3s>
done
done
here
`,
        `here
<~3s>
done
done
`,
      ],
      correct: 0,
      explanation: `<p><code>join()</code> blocks until the receiver completes.</p>
`,
    },

    {
      preface: `<p>Does re-ordering make a difference?</p>
`,
      code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
      answers: [
        `<~3s>
done
done
here
`,
        `<~3s>
done
<~3s>
done
here
`,
        `here
<~3s>
done
done
`,
      ],
      correct: 0,
      explanation: `<p>
  <code>thread1.join()</code> blocks the main thread, but not
  <code>thread2</code>.
</p>

<p>
  <code>thread1</code> and <code>thread2</code> are io-bound, so interleaving
  helps.
</p>
`,
    },

    {
      preface: `<p>How about cpu-bound threads?</p>
`,
      code: `from threading import Thread


def cpu_bound():
    # assume the sum takes 3s of cpu
    sum(i**2 for i in range(2**25))
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
`,
      answers: [
        `<~6s>
done
done
here
`,
        `here
<~6s>
done
done
`,
        `here
<~3s>
done
done
`,
      ],
      correct: 1,
      explanation: `<p>
  The main thread runs when <code>thread1</code> and <code>thread2</code> are
  paused.
</p>

<p>
  <code>thread1</code> and <code>thread2</code> are cpu-bound, so interleaving
  doesn't help.
</p>
`,
    },

    {
      preface: `<p>Ok, let's <code>join()</code> again.</p>
`,
      code: `from threading import Thread


def cpu_bound():
    # assume the sum takes 3s of cpu
    sum(i**2 for i in range(2**25))
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `<~3s>
done
done
here
`,
        `here
<~6s>
done
done
`,
      ],
      correct: 0,
      explanation: `<p>Same as before: <code>join()</code> blocks until the receiver completes.</p>
`,
    },

    {
      preface: `<p>Does re-ordering make a difference?</p>
`,
      code: `from threading import Thread


def cpu_bound():
    # assume the sum takes 3s of cpu
    sum(i**2 for i in range(2**25))
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
      answers: [
        `here
<~3s>
done
<~3s>
done
`,
        `<~6s>
done
done
here
`,
        `<~3s>
done
<~3s>
done
here
`,
      ],
      correct: 1,
      explanation: `<p>
  <code>thread1.join()</code> blocks the main thread, not <code>thread2</code>.
</p>

<p>But they're still cpu-bound so the total time is unchanged.</p>
`,
    },

    {
      preface: `<p>Same as the previous question, no?</p>
`,
      code: `from threading import Thread


def cpu_bound():
    # assume the sum takes 3s of cpu
    sum(range(2**25))
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
      answers: [
        `<~6s>
done
done
here
`,
        `<~3s>
done
<~3s>
done
here
`,
        `<~3s>
done
done
here
`,
      ],
      correct: 1,
      explanation: `<p>
  The interpreter doesn't pause a thread while it's running native code, like
  <code>sum()</code> does.
</p>
`,
    },

    {
      preface: `<p>What if threads go bad?</p>
`,
      code: `from threading import Thread


def bad():
    raise Exception


thread = Thread(target=bad)
thread.start()
thread.join()
print("here")
`,
      answers: [
        `Exception in thread Thread-1 (bad):
Traceback (most recent call last):
  ...
Exception
`,
        `Exception in thread Thread-1 (bad):
Traceback (most recent call last):
  ...
Exception
here
`,
        `here
`,
      ],
      correct: 1,
      explanation: `<p>
  <code>threading.excepthook()</code> prints on stderr an exception raised by
  <code>Thread.run()</code>.
</p>

<p>
  But the exception doesn't propagate to the main thread, so
  <code>here</code> is still printed and the exit code is 0.
</p>
`,
    },

    {
      preface: `<p>Let's swap threads for processes.</p>
`,
      code: `from multiprocessing import Process
from time import sleep


def io_bound():
    sleep(3)
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1 = Process(target=io_bound)
    proc2 = Process(target=io_bound)
    proc1.start()
    proc2.start()
    print("here")
`,
      answers: [
        `here
<~3s>
done
done
`,
        `<~3s>
done
<~3s>
done
here
`,
        `here
<~6s>
done
done
`,
      ],
      correct: 0,
      explanation: `<p>Process objects run in separate processes, each with their own GIL.</p>

<p>So they <em>can</em> run in parallel.</p>

<p>But for io-bound work threads might be the better choice.</p>
`,
    },

    {
      preface: `<p>What about cpu-bound work?</p>
`,
      code: `from multiprocessing import Process


def cpu_bound():
    # assume the sum takes 3s of cpu
    sum(i**2 for i in range(2**25))
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1 = Process(target=cpu_bound)
    proc2 = Process(target=cpu_bound)
    proc1.start()
    proc2.start()
    proc1.join()
    proc2.join()
    print("here")
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `<~6s>
done
done
here
`,
        `<~3s>
done
done
here
`,
      ],
      correct: 2,
      explanation: `<p>
  <code>thread1</code> and <code>thread2</code> are cpu-bound, so running in
  parallel helps.
</p>
`,
    },

    {
      preface: `<p>What if processes go bad?</p>
`,
      code: `from multiprocessing import Process


def bad():
    raise Exception


if __name__ == "__main__":
    proc = Process(target=bad)
    proc.start()
    proc.join()
    print("here")
`,
      answers: [
        `Process Process-1:
Traceback (most recent call last):
  ...
Exception
`,
        `here
`,
        `Process Process-1:
Traceback (most recent call last):
  ...
Exception
here
`,
      ],
      correct: 2,
      explanation: `<p>
  Same story as for threads: the exception is printed on stderr but doesn't
  propagate to the main process.
</p>
`,
    },

    {
      preface: `<p>A third approach: <code>asyncio</code>.</p>
`,
      code: `import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    io_bound()
    io_bound()
    print("here")


asyncio.run(main())
`,
      answers: [
        `here
<~3s>
done
done
`,
        `<~3s>
done
<~3s>
done
here
`,
        `here
`,
      ],
      correct: 2,
      explanation: `<p>
  A function defined with <code>async def</code> is a coroutine function and
  returns a coroutine.
</p>

<p>Just creating a coroutine doens't schedule it on the event loop.</p>
`,
    },

    {
      preface: `<p>Ok, so let's <code>await</code>.</p>
`,
      code: `import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    await io_bound()
    await io_bound()
    print("here")


asyncio.run(main())
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `here
<~3s>
done
done
`,
        `<~3s>
done
done
here
`,
      ],
      correct: 0,
      explanation: `<p>Awaiting a coroutine blocks until it completes.</p>

<p>No speedup yet.</p>
`,
    },

    {
      preface: `<p>We need async-aware functions, like <code>asyncio.sleep()</code>, right?</p>
`,
      code: `import asyncio


async def io_bound():
    await asyncio.sleep(3)
    print("here")


async def main():
    await io_bound()
    await io_bound()
    print("done")


asyncio.run(main())
`,
      answers: [
        `done
<~3s>
here
here
`,
        `<~3s>
here
here
done
`,
        `<~3s>
here
<~3s>
here
done
`,
      ],
      correct: 2,
      explanation: `<p>
  <code>await asyncio.sleep()</code> does pass control to the event loop, but
  there's no other work scheduled at that point.
</p>
`,
    },

    {
      preface: `<p>What if we <code>gather()</code> them instead?</p>
`,
      code: `import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    await asyncio.gather(io_bound(), io_bound())
    print("here")


asyncio.run(main())
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `<~3s>
done
done
here
`,
        `here
<~3s>
done
done
`,
      ],
      correct: 0,
      explanation: `<p><code>gather()</code> runs the awaitables concurrently.</p>

<p>
  But still no speedup, because <code>sleep()</code> blocks the one and only
  thread.
</p>
`,
    },

    {
      preface: `<p>
  What if we <code>gather()</code> <em>and</em> <code>asyncio.sleep()</code>?
</p>
`,
      code: `import asyncio


async def io_bound():
    await asyncio.sleep(3)
    print("done")


async def main():
    await asyncio.gather(io_bound(), io_bound())
    print("here")


asyncio.run(main())
`,
      answers: [
        `<~3s>
done
<~3s>
done
here
`,
        `<~3s>
done
done
here
`,
        `here
<~3s>
done
done
`,
      ],
      correct: 1,
      explanation: `<p>Speedup at last!</p>
`,
    },

    {
      preface: `<p>Remember threads?</p>
`,
      code: `import asyncio
from time import sleep


def io_bound():
    sleep(3)
    print("done")


async def main():
    await asyncio.gather(
        asyncio.to_thread(io_bound),
        asyncio.to_thread(io_bound),
    )
    print("here")


asyncio.run(main())
`,
      answers: [
        `here
<~3s>
done
done
`,
        `<~3s>
done
<~3s>
done
here
`,
        `<~3s>
done
done
here
`,
      ],
      correct: 2,
      explanation: `<p>
  <code>asyncio.to_thread()</code> is useful for async-unaware io-bound
  functions.
</p>

<p>It runs the passed function in a separate thread, returning a coroutine.</p>

<p>
  <code>sleep()</code> releases the GIL so control can pass back to the main
  thread.
</p>
`,
    },

    {
      preface: `<p>Know the differences between coroutines and tasks?</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def main():
    asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
`,
      answers: [
        `it depends
`,
        `in foo
in main
`,
        `in main
in foo
`,
      ],
      correct: 2,
      explanation: `<p><code>create_task()</code> schedules the task for execution.</p>

<p>But the main coroutine keeps control.</p>
`,
    },

    {
      preface: `<p>How about this?</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def main():
    await asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
`,
      answers: [
        `in foo
in main
`,
        `it depends
`,
        `in main
in foo
`,
      ],
      correct: 0,
      explanation: `<p>Awaiting a task passes control to the event loop.</p>
`,
    },

    {
      preface: `<p>And this?</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    asyncio.create_task(foo())
    await bar()


asyncio.run(main())
`,
      answers: [
        `it depends
`,
        `in bar
in foo
`,
        `in foo
in bar
`,
      ],
      correct: 1,
      explanation: `<p>Awaiting a coroutine doesn't pass control to the event loop.</p>
`,
    },

    {
      preface: `<p>Last one on this theme.</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    asyncio.create_task(foo())
    await asyncio.create_task(bar())


asyncio.run(main())
`,
      answers: [
        `in foo
in bar
`,
        `in bar
in foo
`,
        `it depends
`,
      ],
      correct: 0,
      explanation: `<p>Awaiting a task passes control to the event loop.</p>
`,
    },

    {
      preface: `<p>What if awaitables go bad?</p>
`,
      code: `import asyncio


async def foo():
    raise Exception


async def bar():
    await asyncio.sleep(3)
    print("here")


async def main():
    await asyncio.gather(foo(), bar())
    print("done")


asyncio.run(main())
`,
      answers: [
        `Traceback (most recent call last):
  ...
Exception
done
`,
        `Traceback (most recent call last):
  ...
Exception
`,
        `<~3s>
here
done
`,
      ],
      correct: 1,
      explanation: `<p>
  By default, <code>gather()</code> propagates the first raised exception, but
  <em>doesn't</em> cancel its other awaitables.
</p>
<p>
  However, when the exception propagates to <code>asyncio.run()</code>,
  <em>it</em> cancels any remaining awaitables.
</p>
`,
    },
  ],
};
