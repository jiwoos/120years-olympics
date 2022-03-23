import os
import sys
import pandas as pd
import csv
import string


medals2016 = pd.read_csv('2016-medals.csv')

medals = medals2016.sort_values(by=['Gold'], ascending=False)


for i, row in medals2016.iterrows():



	print(row)

	# # os.mkdir(dirName)
	# olympic.to_csv(dirName+"/"+title, encoding="utf-8", index=False)


# top10_countries.to_csv('2016-top10.csv', encoding="utf-8", index=False)
