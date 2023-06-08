from stegano import lsb

def inject_text(image_path, secret_text, output_path):
    # Inject the secret text into the image using LSB steganography
    secret_image = lsb.hide(image_path, secret_text)
    secret_image.save(output_path)

def retrieve_text(image_path):
    # Retrieve the secret text from the image using LSB steganography
    secret_text = lsb.reveal(image_path)
    return secret_text

# Example usage
input_image = 'image.png'
output_image = 'image.png'
secret_text = "This is a secret message."

# Inject the secret text into the image
inject_text(input_image, secret_text, output_image)
print("Secret text injected into the image.")

# Retrieve the secret text from the image
retrieved_text = retrieve_text(output_image)
print("Retrieved secret text:", retrieved_text)
