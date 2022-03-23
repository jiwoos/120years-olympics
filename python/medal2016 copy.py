import os
import sys
import pandas as pd
import csv
import string


medals2016 = pd.read_csv('2016-medals.csv')

medals2016.drop(['Year', 'Host_country', 'Host_city'], axis=1, inplace=True)

# medals2016.rename(columns={'Year':'NOC'})
medals2016.rename(columns={'Country_Code':'NOC'},inplace=True)

medals2016 = medals2016[["NOC", "Gold", "Silver", "Bronze", "Country_Name"]]
print(medals2016)

medals2016.to_csv('2016-medalcount.csv', encoding="utf-8", index=False)

# for i, row in medals2016.iterrows():

# 	print(row)
	# Year,Host_country,Host_city



	# # os.mkdir(dirName)
	# olympic.to_csv(dirName+"/"+title, encoding="utf-8", index=False)


# top10_countries.to_csv('2016-top10.csv', encoding="utf-8", index=False)
