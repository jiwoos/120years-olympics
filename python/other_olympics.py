import os
import sys
import pandas as pd
import csv
import string


summer = pd.read_csv('summer.csv')


for i in range(1896, 2016, 4):
	olympic = summer.loc[summer['Year'] == i]
	title = str(i)+".csv"
	print(title)
	dirName = str(i)
	print(dirName)
	# os.mkdir(dirName)
	olympic.to_csv(dirName+"/"+title, encoding="utf-8", index=False)




