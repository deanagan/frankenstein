import pygame
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sprite Animation Example")

# Load the sprite sheet
sprite_sheet = pygame.image.load("testgame/zoro.png").convert_alpha()

# Define constants for the character
SPRITE_WIDTH = 128  # Width of each frame in the sheet
SPRITE_HEIGHT = 128  # Height of each frame

# Function to extract individual frames from the sheet
def get_frames(sheet, frame_count, y_row=0):
    frames = []
    for i in range(frame_count):
        frame = sheet.subsurface((i * SPRITE_WIDTH, y_row * SPRITE_HEIGHT, 
                                  SPRITE_WIDTH, SPRITE_HEIGHT))
        frames.append(frame)
    return frames

# Extract frames (e.g., first row with 6 frames of running animation)
run_frames = get_frames(sprite_sheet, 6, y_row=0)
duck_frames = get_frames(sprite_sheet, 6, y_row=1)

# Set up the clock to control the frame rate
clock = pygame.time.Clock()
FPS = 10  # Control animation speed

# Animation state variables
frame_index = 0
animation = run_frames
x, y = WIDTH // 2, HEIGHT // 2

# Main game loop
while True:
    screen.fill((0, 0, 0))  # Clear screen

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_DOWN:  # Switch to ducking animation
                animation = duck_frames
            elif event.key == pygame.K_UP:  # Back to running animation
                animation = run_frames

    # Update frame index
    frame_index = (frame_index + 1) % len(animation)

    # Draw the current frame
    screen.blit(animation[frame_index], (x, y))

    pygame.display.flip()  # Refresh the screen
    clock.tick(FPS)  # Control the frame rate
