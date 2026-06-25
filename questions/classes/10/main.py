class A:
    def __init__(self):
        print("in A")

class B(A):
    def __init__(self):
        print("in B")
        super().__init__()

b = B()
