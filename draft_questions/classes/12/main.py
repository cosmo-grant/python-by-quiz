class A:
    def meth(self):
        print("in A")


class B:
    def meth(self):
        print("in B")
        super().meth()


class C(B, A):
    def meth(self):
        print("in C")
        super().meth()


c = C()
c.meth()
