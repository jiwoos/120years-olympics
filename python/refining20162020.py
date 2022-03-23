import os
import sys
import pandas as pd
import csv
import string


countries = pd.read_csv('data/2020/2020-athleteCountByCountry.csv')
# countries = pd.read_csv('data/2008/2008_countriesParticipated.csv')
continentFilter = pd.read_csv('data/rawData/countryDictionary.csv', lineterminator='\n', error_bad_lines=False)
continent_list = []


for i, row in countries.iterrows():
	for j, filterrow in continentFilter.iterrows():
		if row["nationality"] == filterrow["ISO"] or row["nationality"] == filterrow["IOC"] or row["nationality"] == filterrow["FIFA"]:
			continent_list.append(filterrow["Country (en)"]) 

countries["Country_Name"] = continent_list


countries.drop("Unnamed: 0", axis=1, inplace=True)



countries.to_csv("data/2020/2020-athleteCountByCountry.csv", encoding="utf-8", index=False);
# countries.to_csv("data/2008/2008_countriesParticipated.csv", encoding="utf-8", index=False);