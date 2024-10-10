import matplotlib.pyplot as plt
from random import uniform, randint
SENSITIVITY = 0.5
MAX_TEMP = 8
MIN_TEMP = 4
Number = 0
T = randint(MIN_TEMP, MAX_TEMP)
T_values = [T]  # List to store temperature values

while Number < 1000:
    if T >= MAX_TEMP-SENSITIVITY :
       T-= SENSITIVITY 
       
    elif T <= MIN_TEMP+SENSITIVITY :
        T+= SENSITIVITY 
    else:
      T+= uniform(- SENSITIVITY , SENSITIVITY )
    T_values.append(T)  # Append updated temperature to the list
    Number += 1

# Plotting the graph
print(T_values)
plt.plot(T_values)
plt.title("Temperature Variation Over Time")
plt.xlabel("Iteration")
plt.ylabel("Temperature (T)")
plt.grid(True)
plt.show()
