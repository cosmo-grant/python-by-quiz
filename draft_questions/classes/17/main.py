class Foo:
    def __get__(self, instance, owner):
        return "in get"

    def __set__(self, instance, value):
        print("in set")


class C:
    foo = Foo()


c = C()
print(c.foo)
c.foo = 2
c.__dict__["foo"] = 3
print(c.foo)
