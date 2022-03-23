import os
import sys
import pandas as pd
import csv
import string


countries = pd.read_csv('data/2020/2020-athleteCountByCountry.csv')
# countries = pd.read_csv('data/2012/2012_countriesParticipated.csv')
continentFilter = pd.read_csv('data/rawData/countrycodes.numbers')
num = 0

# for i, row in countries.iterrows():
# 	# print(row["nationality"])
# 	for j, filterrow in continentFilter.iterrows():
# 		if row["nationality"] == filterrow["ISO 3166-1 alpha3"] or row["nationality"] == filterrow["IOC"]:
# 			num+=1

# 			print(row["nationality"])
print(num)
		
