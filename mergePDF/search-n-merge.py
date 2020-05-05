import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import numpy as np
import os

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("FLOCK Song List").sheet1

date = sheet.find(input('Enter date(M/D/YYYY): '))
# print(sheet.col_values(1),sheet.col_values(date.col))

# format_frame = pd.DataFrame(sheet.col_values(1))
# songs = pd.DataFrame(sheet.col_values(date.col))

# print(pd.concat([format_frame,songs], keys=['format_frame','songs'], axis=1))
# print(format_frame)

def get_songs(str):
    songs = sheet.col_values(date.col)
    songs_to_merge = []
    tmp=[]
    for song in songs:
        if song != '':
            tmp.append(song)
    for i in range(2,7):
        songs_to_merge.append(tmp[i])
    
    for song in songs_to_merge:
        path = os.path.join("/Users/huygiang/Desktop/songs/",f"{song}")
        if os.path.exists(path):
            print(song + ' exists')
            if os.path.isdir(path):
                print(song + ' is a directory')
            else:
                print(song + ' is not a directory')
        else:
            print(song + ' does not exist')

get_songs(date)


