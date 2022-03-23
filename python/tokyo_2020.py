import os
import sys
import pandas as pd
import csv
import string


entries_gender = pd.read_excel('EntriesGender.xlsx', 'Details', dtype=str, index_col=None)
teams =  pd.read_excel('Teams.xlsx', 'Details', dtype=str, index_col=None)
medals = pd.read_excel('Medals.xlsx', 'Details', dtype=str, index_col=None)
athletes = pd.read_excel('Athletes.xlsx', 'Details', dtype=str, index_col=None)



countries = []

top10_countries = medals[:10]

femaleCount = 0
maleCount = 0
totalCount = 0

for i in entries_gender['Female']:
	femaleCount += int(i)

for i in entries_gender['Male']:
	maleCount += int(i)

for i in entries_gender['Total']:
	totalCount += int(i)



gender = pd.DataFrame({'female': [femaleCount],
                   'male': [maleCount],
                   'total': [totalCount]})


# all_countries = teams.drop_duplicates(subset=['NOC'])
# print(all_countries)
top10_countries.to_csv('2020-top10.csv', encoding="utf-8", index=False)
# gender.to_csv('2020-gender.csv', encoding="utf-8", index=False)
