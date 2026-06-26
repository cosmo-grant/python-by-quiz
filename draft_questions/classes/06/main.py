class C:
    @staticmethod
    def stat_meth(*args):
        print(args)

    @classmethod
    def class_meth(*args):
        print(args)


c = C()
c.stat_meth("foo")
c.class_meth("foo")
