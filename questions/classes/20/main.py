t = type("C", (), {"a": 1, "foo": lambda self: self.a + 1})
c = t()
print(c.a)
print(c.foo())
