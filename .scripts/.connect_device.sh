IP_ADDRESS="192.168.11.18"

# Initialize variables
PORT=""
CODE=""

# Parse command-line arguments manually
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --port)
            PORT="$2"
            shift 2
            ;;
        --code)
            CODE="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Use the parsed arguments (uncomment adb commands when needed)
echo "$IP_ADDRESS:$PORT $CODE"
adb pair $IP_ADDRESS:$PORT $CODE
adb devices

# Output the values for testing
echo "Port: $PORT"
echo "Code: $CODE"
