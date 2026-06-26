class C:
    @property
    def foo(self):
        return 1


c = C()
c.__dict__["foo"] = 2
print(c.foo)
