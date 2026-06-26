class C:
    @staticmethod
    def stat_meth(*args):
        print(args)

    @classmethod
    def class_meth(*args):
        print(args)


C.stat_meth("foo")
C.class_meth("foo")
