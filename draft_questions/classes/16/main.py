class C:
    def foo():
        return 0


c = C()
c.foo = lambda: 1
print(c.foo())
