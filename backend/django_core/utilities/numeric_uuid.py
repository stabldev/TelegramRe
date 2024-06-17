import random


def generate_numeric_uuid():
    return str(random.randint(10**15, (10**16) - 1))
