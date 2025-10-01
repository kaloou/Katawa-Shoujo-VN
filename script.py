import os
try:
    from PIL import Image
except ImportError:
    print("Pillow non installé. Installe avec : pip install pillow")
    raise

# Config
image_list_file = "images_names.txt"      # à la racine
search_dir = os.path.join("assets", "extern")
output_file = "found_images.txt"

def build_file_map(root_dir):
    """Parcours récursif de root_dir et retourne {filename: [fullpath, ...]}."""
    file_map = {}
    for root, _, files in os.walk(root_dir):
        for f in files:
            file_map.setdefault(f, []).append(os.path.join(root, f))
    return file_map

def main():
    if not os.path.isfile(image_list_file):
        print(f"Fichier introuvable: {image_list_file}")
        return
    if not os.path.isdir(search_dir):
        print(f"Dossier introuvable: {search_dir}")
        return

    # Lire la liste (conserver l'ordre). Supprime guillemets éventuels.
    with open(image_list_file, "r", encoding="utf-8") as f:
        images = [line.strip().strip("'\"") for line in f if line.strip()]

    file_map = build_file_map(search_dir)

    results = []
    for idx, name in enumerate(images, start=1):
        matches = file_map.get(name)
        if matches:
            path = matches[0]  # si plusieurs, prendre le premier trouvé
            try:
                with Image.open(path) as img:
                    w, h = img.size
                results.append(f"{idx} | {name} | {w}x{h}")
            except Exception:
                # trouvé mais impossible de lire la résolution -> marqueur '?x?'
                results.append(f"{idx} | {name} | ?x?")
        else:
            # non trouvé -> écrire l'index et le nom, sans résolution
            results.append(f"{idx} | {name} |")

    with open(output_file, "w", encoding="utf-8") as out:
        for line in results:
            out.write(line + "\n")

    found_count = sum(1 for r in results if r.split("|")[-1].strip())
    missing_count = len(results) - found_count
    print(f"Terminé — trouvées: {found_count}, non trouvées: {missing_count}. Résultats -> {output_file}")

if __name__ == "__main__":
    main()
