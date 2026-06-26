class A:
    def meth(self):
        print("in A")


class B(A):
    def meth(self):
        print("in B")
        super().meth()


class C(B):
    def meth(self):
        print("in C")
        super(B, self).meth()


c = C()
c.meth()
