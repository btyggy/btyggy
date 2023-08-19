import struct
import wave

def convert_8svx_to_wav(input_filename, output_filename):
    # Open the input 8SVX file in binary mode
    with open(input_filename, 'rb') as input_file:
        # Read the 8SVX header
        id = input_file.read(4)
        if id != b'8SVX':
            print("Not a valid 8SVX file.")
            return
        
        # Read the 8SVX header size
        header_size = struct.unpack('>I', input_file.read(4))[0]
        
        # Read the sampling rate
        sampling_rate = struct.unpack('>I', input_file.read(4))[0]
        
        # Read the data size
        data_size = struct.unpack('>I', input_file.read(4))[0]
        
        # Read the loop start and end points
        loop_start = struct.unpack('>I', input_file.read(4))[0]
        loop_end = struct.unpack('>I', input_file.read(4))[0]
        
        # Read the C5X header size
        c5x_header_size = struct.unpack('>I', input_file.read(4))[0]
        
        # Read the C5X data
        c5x_data = input_file.read(c5x_header_size)
        
        # Read the 8SVX data
        data = input_file.read(data_size)
    
    # Create a WAV file using the WAV library
    with wave.open(output_filename, 'wb') as wav_file:
        wav_file.setnchannels(1)  # Mono audio
        wav_file.setsampwidth(2)  # 16-bit samples
        wav_file.setframerate(sampling_rate)
        wav_file.writeframes(data)
    
    print("Conversion completed.")

# Usage example
input_file = 'input.8svx'
output_file = 'output.wav'
convert_8svx_to_wav(input_file, output_file)
