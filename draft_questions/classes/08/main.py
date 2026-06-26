class C:
    @classmethod
    def class_meth(*args):
        print(args)


C.class_meth("foo")
c = C()
c.class_meth("foo")
