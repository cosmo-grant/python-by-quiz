class Foo:
    def __get__(self, instance, owner):
        return "in get"

class C:
    foo = Foo()

c = C()
print(c.foo)
c.foo = 2
print(c.foo)
