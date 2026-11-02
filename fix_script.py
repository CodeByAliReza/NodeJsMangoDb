with open(r'C:\backend\script.js', 'r') as f:
    content = f.read()

old = "app.all('*', (req,res)=>{\n\n  res.status(HttpStatus.NOT_FOUND).json(\n  {\n    status : \"fail\",\n    message: `cant Find ${req.originalUrl} on this server`\n  }\n)}"

new = "app.use((req, res) => {\n  res.status(HttpStatus.NOT_FOUND).json(\n  {\n    status : \"fail\",\n    message: `cant Find ${req.originalUrl} on this server`\n  }\n)\n})"

if old in content:
    content = content.replace(old, new)
    with open(r'C:\backend\script.js', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Old string not found")
    lines = content.split('\n')
    for i in range(36, 46):
        if i < len(lines):
            print(f"{i+1}: {repr(lines[i])}")