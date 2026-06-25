def foo():
    global y
    y += 1

y = 0
x = (foo() for i in range(3))
print(y)
next(x)
print(y)
