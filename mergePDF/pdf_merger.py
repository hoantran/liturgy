from PyPDF2 import PdfFileMerger, PdfFileReader
from os import listdir
from os.path import isfile, join
import os

path = input("Path to pdf files: ")        # "/Users/huygiang/Desktop/songs/Easter-sunday/"
# print(os.listdir(path))

pdf_files = [f for f in os.listdir(path) if isfile(join(path, f))]
# print(pdf_files)

filename = input("Name it: ")

merger = PdfFileMerger()
for files in pdf_files:
    merger.append(path+files)
if not os.path.exists(path+filename):     # 'easter_sunday.pdf'
    merger.write(path+filename)           # 'easter-sunday.pdf'
merger.close()