class C:
    foo = 1


c = C()
print(c.foo)
c.foo = 2
print(c.foo)
print(C.foo)
