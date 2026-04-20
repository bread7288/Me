import random


secret_number = random.randint(-999, 999)
print(secret_number)
while True:
  guess = int(input("guess a number between 0 and 999: "))
  print(secret_number)
  if guess < secret_number:
    print("tooooooooo low? try a bigger number")
  elif guess > secret_number:
    print("tooooooo high? try agan")
  else:
    print("you win")
