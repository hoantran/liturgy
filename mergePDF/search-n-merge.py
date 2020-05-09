import fnmatch
import gspread
import os
import PyPDF2
from fuzzywuzzy import process
from oauth2client.service_account import ServiceAccountCredentials

#Set Sunday date below and set path to your local song directory
date = '5/10/2020'
song_directory = ""

def find_vocal_pdf(directory):
    '''
    Function to find a filename with 'vocal' as a substring. Will assert if no
    pdfs are found in directory.

    Parameters
        directory (str) - absolute path to directory to be searched

    Returns
        filename (str) - filename of vocal PDF
    '''

    files = fnmatch.filter(os.listdir(directory), "*.pdf")
    assert(len(files) != 0)
    if(len(files) == 1):
        return files[0]
    else:
        for file in files:
            if("vocal" in file):
                return file
        for file in files:
            if("guitar" in file):
                return file
        return files[0]

def find_instrumental_pdf(directory):
    '''
    Function to find a filename with 'guitar' or 'piano' as a substring. Will assert if no
    pdfs are found in directory.

    Parameters
        directory (str) - absolute path to directory to be searched

    Returns
        filename (str) - filename of vocal PDF
    '''

    files = fnmatch.filter(os.listdir(directory), "*.pdf")
    assert(len(files) != 0)
    if(len(files) == 1):
        return files[0]
    else:
        for file in files:
            if("guitar" in file):
                return file
        for file in files:
            if("piano" in file):
                return file
        for file in files:
            if("vocal" in file):
                return file
        return files[0]
        
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
    return filepath

if song_directory == "":
    print("Error please set song_directory filepath variable in this P to your local song directory.")
    assert()

#Pull data from Google Sheet
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)
sheet = client.open("FLOCK Song List").sheet1
cells = sheet.col_values(sheet.find(date).col)[2:] # remove first 2 cells which are Sunday and Date
songs = list(filter(None, cells)) #filter out empty cells

#Search song directory pdfs for each song
vocal_set=[]
instrumental_set=[]
dirs = os.listdir(song_directory)

for song in songs:
    directory_name, match_score = process.extractOne(song, dirs)
    if match_score > 80:
        directory_path = os.path.join(song_directory, directory_name)

        vocal_filename = find_vocal_pdf(directory_path)
        print("For [" + song + "] found a " + str(match_score) + "% matching directory ["
         + directory_name +  "] and vocal file [" + vocal_filename + "]")
        filepath = os.path.join(directory_path, vocal_filename)
        vocal_set.append(filepath)

        instrumental_filename = find_instrumental_pdf(directory_path)
        print("For [" + song + "] found a " + str(match_score) + "% matching directory ["
         + directory_name +  "] and instrumental file [" + instrumental_filename + "]")
        filepath = os.path.join(directory_path, instrumental_filename)
        instrumental_set.append(filepath)
    
    else:
        print("pdf not found for song: " + song)
        #vocal_set.append(handle_matching_error(song)) #uncomment to request missing pdf from user

#Create pdf sets
filename = "FLOCK_" + date.replace("/", "_") + "_vocal.pdf"
merger = PyPDF2.PdfFileMerger(strict=False)
for filepath in vocal_set:
    merger.append(filepath)
merger.write("./"+filename)

filename = "FLOCK_" + date.replace("/", "_") + "_instrumental.pdf"
merger = PyPDF2.PdfFileMerger(strict=False)
for filepath in instrumental_set:
    merger.append(filepath)
merger.write("./"+filename)

merger.close()
