"""file=open('DNA.txt','r')
sequence=file.read()
file.close()"""

import sys
#sequence=input("Enter sequence")
sequence = (sys.argv[1])

RNA=''
for base in sequence:
    if base=='T':
        RNA+='U'
    else:
        RNA+=str(base)

position=[RNA.find('A')]
base=RNA.find('A')
for n in RNA:
    if n=='A':
        position.append(RNA.find('A',base+1))
        base=RNA.find('A',base+1)
del position[-1]
#print (position)
output=''
for a in position:
    if RNA[a+1]=='U':
        if RNA[a+2]=='G':
            output+=RNA[a:]
            break
        else:
            continue
    else:
        continue
#print (output)
lis=[]
i=0
while len(lis)*3<len(output):
    lis.append(output[i:i+3])
    i+=3
coding_sequence=lis
for codon in lis:
    if codon=='UAA'or codon=='UAG' or codon=='UGA':
        del coding_sequence[lis.index(codon):]
        break
    else:
        continue
#print (coding_sequence)
genetic_code={'UUU':'F','UUC':'F','UUA':'F','UUG':'F','CUU':'L','CUC':'L','CUA':'L','CUG':'L','AUU':'I','AUC':'I','AUA':'I','AUG':'M','GUU':'V','GUC':'V','GUA':'V','GUG':'V','UCU':'S','UCC':'S','UCA':'S','UCG':'S','CCU':'P','CCC':'P','CCA':'P','CCG':'P','ACU':'T','ACC':'T','ACA':'T','ACG':'T','GCU':'A','GCC':'A','GCA':'A','GCG':'A','UAU':'Y','UAC':'Y','CAU':'H','CAC':'H','CAA':'Q','CAG':'Q','AAU':'N','AAC':'N','AAA':'K','AAG':'K','GAU':'D','GAC':'D','GAA':'E','GAG':'E','UGU':'C','UGC':'C','UGG':'W','CGU':'R','CGC':'R','CGA':'R','CGG':'R','AGU':'S','AGC':'S','AGA':'R','AGG':'R','GGU':'G','GGC':'G','GGA':'G','GGG':'G'}


aminoacid=''
for y in coding_sequence:
    z=genetic_code[y]
    aminoacid+=z
print (aminoacid)
