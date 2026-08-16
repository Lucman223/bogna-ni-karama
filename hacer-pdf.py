"""Prépare le markdown pour le PDF : les images locales sont converties en
données incorporées (data:), pour que le générateur n'ait aucune adresse à
résoudre. Le fichier source reste lisible ; seule la copie temporaire est
lourde."""
import base64, io, os, re, sys

src, dst = sys.argv[1], sys.argv[2]
base = os.path.dirname(os.path.abspath(src))
s = io.open(src, encoding='utf-8').read()

TYPES = {'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png'}
faits = []

def remplacer(m):
    alt, chemin = m.group(1), m.group(2)
    if chemin.startswith(('http:', 'https:', 'data:')):
        return m.group(0)
    plein = os.path.join(base, chemin)
    if not os.path.isfile(plein):
        print('INTROUVABLE:', chemin)
        return m.group(0)
    ext = os.path.splitext(plein)[1].lower()
    mime = TYPES.get(ext)
    if not mime:
        print('TYPE INCONNU:', chemin)
        return m.group(0)
    b64 = base64.b64encode(open(plein, 'rb').read()).decode('ascii')
    faits.append(chemin)
    return '![%s](data:%s;base64,%s)' % (alt, mime, b64)

s = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', remplacer, s)
io.open(dst, 'w', encoding='utf-8').write(s)
print('images incorporées:', len(faits))
for f in faits:
    print('  ·', f)
