import argparse

def parse_arguments():
    parser = argparse.ArgumentParser(description='CLI Tool')
    parser.add_argument('--name', help='Specify your name', required=True)
    parser.add_argument('--age', help='Specify your age', type=int, required=True)
    return parser.parse_args()

def handle_arguments(args):
    print(f'Hello, {args.name}! You are {args.age} years old.')

def main():
    args = parse_arguments()
    handle_arguments(args)

if __name__ == '__main__':
    main()