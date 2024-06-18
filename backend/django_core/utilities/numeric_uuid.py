import random


def generate_numeric_uuid(length=10):
    if length <= 0:
        raise ValueError("length must be positive integer")
    return str(random.randint(10**length, (10 ** (length - 1)) - 1))
