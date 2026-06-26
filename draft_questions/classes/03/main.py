class Foo:
    bar = 1

    def __init__(self):
        bar = 2
        self.bar = 3
        print(Foo.bar, bar, self.bar)


Foo()
