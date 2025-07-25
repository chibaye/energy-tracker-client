# Energy Usage CRUD Application

A React-based CRUD application for managing customer energy usage records. This application provides a clean interface to create, read, update, and delete energy usage data through a REST API.

## Features

- **Create** new energy usage records with customer ID, kWh usage, and optional timestamp
- **Read** and display all usage records in a responsive table
- **Update** existing records with inline editing
- **Delete** records with confirmation dialog
- Real-time feedback with success/error messages
- Responsive design for mobile and desktop
- Form validation and error handling

## API Endpoints

The application consumes the following REST API endpoints:

### GET Endpoints
```bash
# Get all usage records
curl --request GET http://localhost:3000/api/usage

# Get specific usage record by ID
curl --request GET http://localhost:3000/api/usage/1
```

### POST Endpoint (Create)
```bash
# Create with timestamp
curl --request POST http://localhost:3000/api/usage \
  --header "Content-Type: application/json" \
  --data '{"customer_id": 12345,"kwh_used": 150.75,"timestamp": "2025-01-25T10:30:00Z"}'

# Create without timestamp (uses current time)
curl --request POST http://localhost:3000/api/usage \
  --header "Content-Type: application/json" \
  --data '{"customer_id": 12345,"kwh_used": 150.75}'
```

### PUT Endpoint (Update)
```bash
# Update all fields
curl --request PUT http://localhost:3000/api/usage/1 \
  --header "Content-Type: application/json" \
  --data '{"customer_id": 54321,"kwh_used": 200.50,"timestamp": "2025-01-25T14:45:00Z"}'

# Update partial fields
curl --request PUT http://localhost:3000/api/usage/1 \
  --header "Content-Type: application/json" \
  --data '{"kwh_used": 200.50}'
```

### DELETE Endpoint
```bash
# Delete usage record
curl --request DELETE http://localhost:3000/api/usage/1
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open [http://localhost:3001](http://localhost:3001) to view it in the browser

**Note:** Make sure your API server is running on `http://localhost:3000` before starting the React application.

## Project Structure

```
src/
├── components/
│   ├── UsageForm.js      # Form component for creating/editing records
│   └── UsageList.js      # Table component for displaying records
├── services/
│   └── api.js           # API service for HTTP requests
├── App.js               # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles
```

## Usage

### Creating a Record
1. Fill in the Customer ID and kWh Used fields
2. Optionally set a timestamp (defaults to current time if empty)
3. Click "Create Record"

### Editing a Record
1. Click the "Edit" button on any record in the table
2. Modify the fields in the form
3. Click "Update Record" or "Cancel" to abort

### Deleting a Record
1. Click the "Delete" button on any record
2. Confirm the deletion in the dialog

## Data Format

The application expects the following data structure:

```json
{
  "id": 1,
  "customer_id": 12345,
  "kwh_used": 150.75,
  "timestamp": "2025-01-25T10:30:00Z"
}
```

## Error Handling

- Network errors are caught and displayed to the user
- Form validation ensures required fields are filled
- Confirmation dialogs prevent accidental deletions
- Loading states provide feedback during API calls

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request