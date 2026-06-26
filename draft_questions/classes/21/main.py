def fooy(class_name):
    return type(class_name, (object,), {"foo": 1})


C = fooy("C")
print(C.__name__)
print(C.__mro__)
print(C.foo)
