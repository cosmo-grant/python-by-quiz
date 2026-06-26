class MyClass:
    a = 1


obj = MyClass()
print(obj.a)
obj.a = 2
print(obj.a, MyClass.a)
