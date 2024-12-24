import os

def list_directory(directory, indent=""):
    try:
        items = os.listdir(directory)
        report = ""
        
        # Ordina gli elementi alfabeticamente
        items.sort()
        
        for item in items:
            path = os.path.join(directory, item)
            
            if os.path.isdir(path):
                report += f"{indent}|-- {item}/\n"
                # Esplora ricorsivamente la sottodirectory
                report += list_directory(path, indent + "    ")
            else:
                report += f"{indent}|-- {item}\n"
                
        return report
    except Exception as e:
        return f"{indent}|-- [Errore: {str(e)}]\n"

# Directory principale del sito
main_directory = "C:/SitoDanyTranchillo"

# Crea il report
report = f"Struttura completa del sito in: {main_directory}\n"
report += list_directory(main_directory)

# Salva il report
with open("struttura_completa_sito.txt", "w", encoding="utf-8") as f:
    f.write(report)

print("Report completo generato in 'struttura_completa_sito.txt'")
