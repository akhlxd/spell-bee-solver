import pandas as pd
import sys

class Solver:
    def __init__(self):
        self.special_char = ''
        self.char1 = ''
        self.char2 = ''
        self.char3 = ''
        self.char4 = ''
        self.char5 = ''
        self.char6 = ''
    def get_special_character(self, special_char):
        self.special_char = special_char
    def get_other_six_characters(self, ch1, ch2, ch3, ch4, ch5, ch6):
        self.char1 = ch1
        self.char2 = ch2
        self.char3 = ch3
        self.char4 = ch4
        self.char5 = ch5
        self.char6 = ch6
    def get_special_character_words(self):
        df = pd.read_csv('dictionary.csv', index_col=False)
        df['a'].dropna()
        df = df[df['a'].str.contains(special_char, na=False)]
        alph = 'qwertyuiopasdfghjklzxcvbnm'
        word = ''
        for i in range(len(alph)):
            if (alph[i] != ch1 and alph[i] != ch2 and alph[i] != ch3 and alph[i] != ch4 and alph[i] != ch5 and alph[i] != ch6 and alph[i] != special_char):
                word = word+alph[i]+'|'
        word = word[:-1]
        df = df[~df['a'].str.contains(word, case=False, na=False)]
        mask = (df['a'].str.len() >= 4)
        df = df.loc[mask]
        index_sorted = df['a'].str.len().sort_values(ascending=False).index
        df = df.reindex(index_sorted)
        df = df.reset_index(drop=True)
        df = df.head(50)
        result = df.to_html()
        print(result)


solver = Solver()
special_char = sys.argv[1]
ch1 = sys.argv[2]
ch2 = sys.argv[3]
ch3 = sys.argv[4]
ch4 = sys.argv[5]
ch5 = sys.argv[6]
ch6 = sys.argv[7]

solver.get_special_character(special_char)
solver.get_other_six_characters(ch1, ch2, ch3, ch4, ch5, ch6)
solver.get_special_character_words()
