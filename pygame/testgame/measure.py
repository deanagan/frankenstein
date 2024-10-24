from PIL import Image

# Load the sprite sheet
sprite_sheet = Image.open("testgame/zoro.png")

# Get the total width and height of the sheet
sheet_width, sheet_height = sprite_sheet.size

# Assume we have 4 columns and 2 rows in the sprite sheet (example)
columns = 4
rows = 2

# Calculate individual frame width and height
sprite_width = sheet_width // columns
sprite_height = sheet_height // rows

print(f"Each sprite is {sprite_width}x{sprite_height} pixels.")
