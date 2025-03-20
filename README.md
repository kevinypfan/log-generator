# Log Generator

![Docker Pulls](https://img.shields.io/docker/pulls/kevinypfan/log-generator)
![Docker Image Size](https://img.shields.io/docker/image-size/kevinypfan/log-generator)

A simple HTTP service for generating JSON-formatted logs of specified sizes. This tool is useful for testing log system performance, storage capacity, or simulating log generation scenarios.

[GitHub Repository](https://github.com/kevinypfan/log-generator) | [Docker Hub](https://hub.docker.com/r/kevinypfan/log-generator)

## Features

- Generate JSON-formatted logs with controllable sizes
- HTTP API support
- Winston for log processing
- Docker support
- Console log output

## Tech Stack

- Node.js 22
- Express.js
- Winston (Log Processing)
- Docker

## Quick Start

### Using Docker (Recommended)

```bash
# Pull and run the container
docker run -p 3000:3000 -d kevinypfan/log-generator
```

The service will be available at http://localhost:3000

### Local Build

If you want to build the image yourself:

```bash
git clone https://github.com/kevinypfan/log-generator.git
cd log-generator
docker build -t log-generator .
docker run -p 3000:3000 -d log-generator
```

### Local Development

```bash
# Install dependencies
npm install

# Start the service
npm start
```

## API Documentation

### Generate Log

```
GET /log?bytes=<size>
```

Parameters:
- `bytes`: Specify the size of the generated log (unit: bytes, default: 100)

Example:
```bash
# Generate a log of approximately 500 bytes
curl "http://localhost:3000/log?bytes=500"
```

Response format:
```json
{
  "message": "Log generated",
  "requestedBytes": "500",
  "actualBytes": 523,
  "logObject": {
    "message": "Generated log of approximately 500 bytes",
    "targetBytes": 500,
    "actualBytes": 523,
    "variation": 3,
    "randomContent": "...",
    "finalSize": 523
  }
}
```

## Key Features

1. **Size Variation**: The actual log size will have a random variation of ±10 bytes from the requested size to simulate real scenarios
2. **JSON Format**: All logs are output in structured JSON format
3. **Console Output**: Logs are output to the console for easy viewing and debugging

## Container Information

- Base Image: `node:22-alpine`
- Exposed Port: `3000`
- Container Size: Minimized (using Alpine Linux)

### Environment Variables

No required environment variables at this time.

### Persistence

All logs are output to the console and can be viewed using `docker logs`.

## Versions

- `latest`: Most recent version
- `1.x.x`: Specific version tags

## Links

- [GitHub Repository](https://github.com/kevinypfan/log-generator)
- [Issues](https://github.com/kevinypfan/log-generator/issues)
- [Docker Hub](https://hub.docker.com/r/kevinypfan/log-generator)
