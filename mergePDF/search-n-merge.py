import gspread
from oauth2client.service_account import ServiceAccountCredentials
from fuzzywuzzy import fuzz, process
from dateutil.parser import parse
import pandas as pd
import numpy as np
import os, glob
from PyPDF2 import PdfFileMerger

song_directory = ""
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("FLOCK Song List").sheet1


# date = sheet.find(input('Enter date(M/D/YYYY): '))
date = '5/10/2020'
# TODO: can we improve by allowing different/multiple date formats?
# date = parse(input('Enter date: '), fuzzy=True)
# print(sheet.col_values(1),sheet.col_values(date.col))

# format_frame = pd.DataFrame(sheet.col_values(1))
# songs = pd.DataFrame(sheet.col_values(date.col))


def remove_file_extension(filename):
    return os.path.splitext(filename)[0]

def find_vocal_pdf(directory):
    '''
    Function to find a filename with 'vocal' as a substring. If only one file
    in directory, that file is returned regardless if it contains 'vocal'.

    Parameters
        directory (str) - absolute path to directory to be searched

    Returns
        filename (str) - filename of vocal PDF
    '''

    files = os.listdir(directory)
    assert(len(files) != 0)
    if(len(files) == 1):
        return files[0]
    else:
        for file in files:
            if("vocal" in file):
                return file
        
def handle_matching_error(song):
    '''
    Function to handle when a matching PDF cannot be found for a song. 
    Currently asks user to find a approriate PDF and provide absolute filepath.

    Parameters
        song (str) - Song for which a matching PDF could not be found

    Retuns
        filepath - User provided filepath for 
    '''

    print("PDF file could not be found for: " + song + ". Please provide absolute path to PDF: ")
    filepath = input()
    while(not os.path.exists(filepath)):
        print("User provided filepath does not exists. Please provide path again: ")
        filepath = input()

if song_directory == "":
    print("Error please set song_directory filepath to your local song directory.")
    assert()

cells = sheet.col_values(sheet.find(date).col) # all cells of the column
tmp=[]  # temporary list to parse songs
merge=[] # actual list of songs
filepaths=[] #list of filepaths for pdfs to merge

#extract songs from google sheet cells
for song in cells:
    if song != '': # omit empty cells
        tmp.append(song)
for i in range(2,7): # index 2 to 7 of tmp[] contain the songs
    merge.append(tmp[i])

#finding pdf match for each song
for song in merge:
    found_pdf = False
    for dir in os.listdir(song_directory):
        if fuzz.token_set_ratio(dir, song)>80: # i think score of 80 is reliable. dont ask me why
            directory_path = os.path.join(song_directory, dir)
            filename = find_vocal_pdf(directory_path)
            filepath = os.path.join(directory_path, filename)
            filepaths.append(filepath)
            found_pdf = True
            break
    #Matching PDF for song could not be found
    if(not found_pdf):
        handle_matching_error(song)

#creating pdf
filename = "FLOCK_" + date.replace("/", "_") + "_vocal.pdf"
merger = PdfFileMerger(strict=False)
for filepath in filepaths:
    merger.append(filepath)
merger.write("./"+filename)
merger.close()