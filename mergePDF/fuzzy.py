from fuzzywuzzy import fuzz, process
from dateutil.parser import parse
import re, os, glob, datetime

# print(type(fuzz.ratio("Ba Vua Hành Khúc", "ba vua hanh khuc")))
# print(dt)

# date = input('Enter date(M/D/YYYY): ')
# date = parse(input('Enter date: '), fuzzy=True)
# print(date)

# t = datetime.datetime(date)
# print(date.strftime('%m/%d/%Y'))

# for root, dirs, files in os.walk("/Users/huygiang/Desktop/songs"):
#     for file in files:
#         # if file.endswith(".pdf"):
#             # print(os.path.join(root,file))
#         if fuzz.ratio(file,"Ba Vua Hành Khúc")>40:
#             print(fuzz.ratio(file,"Ba Vua Hành Khúc"), file)

# a = "Ba Vua Hành Khúc"
# b = "ba vua hanh khuc.vocal.1.pdf"
a="Come To to the Water / I Will Run (Foley/Maher)"
b="come to the water.guitar.1.pdf"
# c = [".pdf", ".mp3", ".vocal", ".guitar", "piano"]
# re.sub(r'|'.join(map(re.escape, replace_list)),'',a)
# print(fuzz.ratio())


words = 'word1 word2 word3 word4, word5'
extensions = ['.pdf', '.vocal', '.1']

def remove_multiple_strings(cur_string, replace_list):
  for cur_word in replace_list:
    cur_string = cur_string.replace(cur_word, '')
  return cur_string

print(fuzz.ratio(remove_multiple_strings(b, extensions),a))
