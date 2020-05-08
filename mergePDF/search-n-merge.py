import gspread
from oauth2client.service_account import ServiceAccountCredentials
from fuzzywuzzy import fuzz, process
from dateutil.parser import parse
import pandas as pd
import numpy as np
import os, glob

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("FLOCK Song List").sheet1

# date = sheet.find(input('Enter date(M/D/YYYY): '))
date = sheet.find('5/10/2020')

# TODO: can we improve date search to allow different date formats?
# date = parse(input('Enter date: '), fuzzy=True)
# print(sheet.col_values(1),sheet.col_values(date.col))

# format_frame = pd.DataFrame(sheet.col_values(1))
# songs = pd.DataFrame(sheet.col_values(date.col))

extensions = ['.pdf','.mp3','guitar', '.vocal','.piano', '.1','.2','manibusan'] # to omit; it improves the match result
def remove_multiple_strings(cur_string, extensions): # function to remove extensions in string
    for cur_word in extensions:
        cur_string = cur_string.replace(cur_word, '')
    return cur_string

cells = sheet.col_values(date.col) # all cells of the column
tmp=[]  # temporary list to parse songs
merge=[] # actual list of songs
for song in cells:
    if song != '': # omit empty cells
        tmp.append(song)
for i in range(2,7): # index 2 to 7 of tmp[] contain the songs
    merge.append(tmp[i])

for song in merge:
    for root,dirs,files in os.walk("/Users/huygiang/Desktop/songs"): # change to your directory
        for file in files:
            if fuzz.token_set_ratio(remove_multiple_strings(file, extensions), song)>80: # i think score of 80 is reliable. dont ask me why
                print(fuzz.token_set_ratio(remove_multiple_strings(file, extensions), song), file)
            # i've tried .ratio, .partial_ratio, .token_sort_ratio, 

