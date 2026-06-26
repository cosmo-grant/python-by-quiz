class C:
    def __len__(self):
        return 0


c = C()
c.__len__ = lambda: 1
print(len(c))
print(c.__len__())
