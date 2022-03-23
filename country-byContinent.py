import os
import sys
import pandas as pd
import csv
import string



continentFilter = pd.read_csv('data/rawData/countryDictionary.csv', lineterminator='\n', error_bad_lines=False)


for i in range(1896, 2016, 4):
	continent_list = []
	csvFileName = 'data/'+ str(i) +"/" + str(i) + "_countriesParticipated.csv"
	print(csvFileName)
	countries = pd.read_csv(csvFileName)

	for i, row in countries.iterrows():
		for j, filterrow in continentFilter.iterrows():
			if row["NOC"] == filterrow["ISO"] or row["NOC"] == filterrow["IOC"] or row["NOC"] == filterrow["FIFA"]:
				continent_list.append(filterrow["Continent"]) 
	countries["continent"] = continent_list

	countries.to_csv(csvFileName, encoding="utf-8", index=False)


for i in range(2016, 2024, 4):
	continent_list = []
	csvFileName = 'data/'+ str(i) +"/" + str(i) + "-athleteCountByCountry.csv"
	print(csvFileName)
	countries = pd.read_csv(csvFileName)
	for i, row in countries.iterrows():
		for j, filterrow in continentFilter.iterrows():
			if row["nationality"] == filterrow["ISO"] or row["nationality"] == filterrow["IOC"] or row["nationality"] == filterrow["FIFA"]:
				continent_list.append(filterrow["Continent"]) 
	countries["continent"] = continent_list

	countries.to_csv(csvFileName, encoding="utf-8", index=False);


