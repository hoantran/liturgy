'''Setup script that must be run prior to running search and merge script.

This script does the following in the song directory:
    1. Split Mass setting PDF into parts using page maps defined below and 
    storing them in their own directory.
    2. Rename directories starting with ps... to psalm... to improve fuzzy 
    matching accuracy
'''
import os
import PyPDF2
import sys
from shutil import rmtree

#Must be set to local song directory location
song_directory_root = "/Users/baotuannguyen/Desktop/ProgrammingProjects/liturgy/tools/firestore-upload/songs"
#list of directories to create, also serves as key set for page maps defined below
dirs = [
    "mass of st ann kyrie",
    "mass of st ann glory to god", 
    "mass of st ann gospel acclamation",
    "mass of st ann lenten gospel acclamation",
    "mass of st ann holy holy holy",
    "mass of st ann we proclaim your death o lord", 
    "mass of st ann great amen",
    "mass of st ann lamb of god"
]

#Dictionary mapping page ranges for each part
mass_parts_guitar_pages = {
    "mass of st ann kyrie": (2, 2), 
    "mass of st ann glory to god": (3, 6), 
    "mass of st ann gospel acclamation": (11, 11),
    "mass of st ann lenten gospel acclamation": (12, 12),
    "mass of st ann holy holy holy": (13, 13),
    "mass of st ann we proclaim your death o lord": (14, 14),  
    "mass of st ann great amen": (17, 17),
    "mass of st ann lamb of god": (18, 18)
}

mass_parts_vocal_pages = {
    "mass of st ann kyrie": (1, 2), 
    "mass of st ann glory to god": (3, 11), 
    "mass of st ann gospel acclamation": (24, 26),
    "mass of st ann lenten gospel acclamation": (27, 28),
    "mass of st ann holy holy holy": (29, 31),
    "mass of st ann we proclaim your death o lord": (32, 33),  
    "mass of st ann great amen": (37, 37),
    "mass of st ann lamb of god": (38, 39),
}

mass_parts_piano_pages = {
    "mass of st ann kyrie": (4, 5),
    "mass of st ann glory to god": (6, 14), 
    "mass of st ann gospel acclamation": (27, 29),
    "mass of st ann lenten gospel acclamation": (30, 31),
    "mass of st ann holy holy holy": (32, 34),
    "mass of st ann we proclaim your death o lord": (35, 36),  
    "mass of st ann great amen": (40, 40),
    "mass of st ann lamb of god": (42, 43),
}

def subset_pdf(source_path, start, stop, target_filepath):
    '''
    Creates a subset pdf from specified source pdf path, start to stop page
    range, and saves result as target_filename

    Parameters
        source_path (str) - filepath for source pdf
        start (int) - starting page of subset
        stop (int) - ending page of subset
        target_filename (str) - filename for subset pdf
    '''
    pdf = PyPDF2.PdfFileReader(source_path, strict=False)
    if pdf.isEncrypted:
        pdf.decrypt('')
    pdf_writer = PyPDF2.PdfFileWriter()
    
    for page in range(start -1, stop):
        pdf_writer.addPage(pdf.getPage(page))

    with open(target_filepath, 'wb') as output_pdf:
        pdf_writer.write(output_pdf)

#create directories
for dir in dirs:
    try:
        dir_path = os.path.join(song_directory_root, dir)
        os.makedirs(dir_path)
    except FileExistsError:
        try:
            rmtree(dir_path)
            os.makedirs(dir_path)
        except OSError as e:
            print("Error removing exisiting directory " + dir_path)
            print(e)
        except FileExistsError as e:
            print("Error creating directory " + dir_path)
            print(e)

    #create pdfs in the new directory
    source_guitar_pdf = os.path.join(song_directory_root, "mass of st ann/mass of st ann.guitar.1.pdf")
    start = mass_parts_guitar_pages[dir][0]
    stop = mass_parts_guitar_pages[dir][1]
    target_filename = dir + ".guitar.1.pdf"
    target_filepath = os.path.join(song_directory_root, dir, target_filename)
    subset_pdf(source_guitar_pdf, start, stop, target_filepath)

    source_vocal_pdf = os.path.join(song_directory_root, "mass of st ann/mass of st ann.vocal.1.pdf")
    start = mass_parts_vocal_pages[dir][0]
    stop = mass_parts_vocal_pages[dir][1]
    target_filename = dir + ".vocal.1.pdf"
    target_filepath = os.path.join(song_directory_root, dir, target_filename)
    subset_pdf(source_vocal_pdf, start, stop, target_filepath)

    source_piano_pdf = os.path.join(song_directory_root, "mass of st ann/mass of st ann.piano.1.pdf")
    start = mass_parts_piano_pages[dir][0]
    stop = mass_parts_piano_pages[dir][1]
    target_filename = dir + ".piano.1.pdf"
    target_filepath = os.path.join(song_directory_root, dir, target_filename)
    subset_pdf(source_piano_pdf, start, stop, target_filepath)

#Rename ps directories to psalm to improve fuzzy match accuracyf
for dir in os.listdir(song_directory_root):
    if(dir.startswith("ps ")):
        os.rename(os.path.join(song_directory_root,dir), os.path.join(song_directory_root,dir.replace("ps ", "psalm ", 1)))
