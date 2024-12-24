def list_directory_html(directory, skip_dirs=None):
    try:
        if skip_dirs is None:
            skip_dirs = []
        items = os.listdir(directory)
        items.sort()
        html = "<ul>"
        for item in items:
            path = os.path.join(directory, item)
            if os.path.isdir(path) and item in skip_dirs:
                continue
            if os.path.isdir(path):
                html += f"<li>{item}/</li>"
                html += list_directory_html(path, skip_dirs)
            else:
                html += f"<li>{item}</li>"
        html += "</ul>"
        return html
    except Exception as e:
        return f"<li>[Errore: {str(e)}]</li>"

# Salva l'output HTML
with open("directory-structure.html", "w", encoding="utf-8") as f:
    f.write("<html><body>")
    f.write("<h1>Struttura della Directory</h1>")
    f.write(list_directory_html(os.getcwd(), skip_dirs=["venv"]))
    f.write("</body></html>")
