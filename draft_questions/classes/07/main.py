class C:
    def m(*args):
        print(args)


C.m("foo")
c = C()
c.m("foo")
