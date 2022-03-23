import os
import sys
import pandas as pd
import csv
import string


gender = pd.read_excel('data/rawData/countryDict.xlsx', 'Sheet1', index_col=None)



gender.to_csv("data/rawdata/countryDictionary.csv", encoding="utf-8", index=False);

# for i in range(1896, 2024, 4):
# 	print("===========================")
# 	print(i)
# 	if i != 1916 and i != 1940 and i != 1944:
# 		olympic = gender.loc[gender['Year'] == i]
# 		femaleCount = int(olympic["Women"])
# 		maleCount = int(olympic["Men"])
# 		totalCount = femaleCount + maleCount

# 		print(femaleCount)
# 		print(maleCount)
# 		print(totalCount)
		

# 		to_csv = pd.DataFrame({'female': [femaleCount],
# 	                   'male': [maleCount],
# 	                   'total': [totalCount]})
		
# 		title = str(i)+"-gender.csv"
# 		dirName = str(i)
# 		print(dirName)
# 		print(title)
# 		to_csv.to_csv(dirName+"/"+title, encoding="utf-8", index=False)
