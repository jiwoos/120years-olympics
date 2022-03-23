import os
import sys
import pandas as pd
import csv
import string


summer = pd.read_csv('Summer_olympic_Medals.csv')


for i in range(1896, 2024, 4):
	olympic = summer.loc[summer['Year'] == i]
	medals = olympic.sort_values(by=['Gold'], ascending=False)
	medals = medals.rename(columns={"Country_Code": "Code", "Country_Name": "Team"})
	top10_countries = medals[:10] 
	title = str(i)+"-top10.csv"
	dirName = "data/" + str(i)
	print(title)
	# # os.mkdir(dirName)
	top10_countries.to_csv(dirName+"/"+title, encoding="utf-8", index=False)

