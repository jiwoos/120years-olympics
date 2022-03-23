import os
import sys
import pandas as pd
import csv
import string


gender = pd.read_excel('statistic_id1090581_number-of-athletes-at-the-summer-olympics-by-gender-1896-2020.xlsx', 'Data2', index_col=None)



femaleCount = 0
maleCount = 0
totalCount = 0

for i in range(1896, 2024, 4):
	print("===========================")
	print(i)
	if i != 1916 and i != 1940 and i != 1944:
		olympic = gender.loc[gender['Year'] == i]
		femaleCount = int(olympic["Women"])
		maleCount = int(olympic["Men"])
		totalCount = femaleCount + maleCount

		print(femaleCount)
		print(maleCount)
		print(totalCount)


		to_csv = pd.DataFrame({'female': [femaleCount],
	                   'male': [maleCount],
	                   'total': [totalCount]})

		title = str(i)+"-gender.csv"
		dirName = str(i)
		print(dirName)
		print(title)
		to_csv.to_csv(dirName+"/"+title, encoding="utf-8", index=False)
