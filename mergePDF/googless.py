import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import numpy as np

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
# 

client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("FLOCK Song List").sheet1

# all_cells = sheet.get_all_records()
# dates = sheet.row_values(2)

date = sheet.find('1/5/2020')
# print(sheet.col_values(1),sheet.col_values(date.col))
# sequence = pd.DataFrame(sheet.col_values(1))
dataframe = pd.DataFrame(sheet.col_values(date.col))
print(dataframe)
# dataframe = np.array(sheet.col_values(date.col))
# print(type(date.col))

# print(dates)
# Extract and print all of the values
# list_of_hashes = sheet.get_all_records()
# print(list_of_hashes)