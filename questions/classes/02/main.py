class BankAccount:
    next_account_number = 0

    def __init__(self, balance=0):
        self.balance = balance
        self.account = next_account_number

a = BankAccount()
print(a.account)
