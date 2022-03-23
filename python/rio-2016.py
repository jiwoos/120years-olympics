import os
import sys
import pandas as pd
import csv
import string


medals2016 = pd.read_csv('2016-medalcount.csv')

# print(medals2016)
medals = medals2016.sort_values(by=['gold'], ascending=False)

medals = medals.rename(columns={"nationality": "Code", "gold": "Gold", "silver": "Silver", "bronze": "Bronze"})
top10_countries = medals[:10] 



top10_countries.to_csv('2016-top10.csv', encoding="utf-8", index=False)
