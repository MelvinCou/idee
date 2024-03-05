FROM golang:1.22-alpine as builder

WORKDIR /server

# Install swag CLI
RUN go install github.com/swaggo/swag/cmd/swag@v1.8.11

COPY go.mod go.sum ./

RUN go mod download

COPY . .
# Compile without debugging symbols
RUN swag init && \
    go build -ldflags='-s -w'

FROM alpine:3.19
# Set gin framework to release
ENV GIN_MODE=release
# Change default port
ENV PORT=5312
EXPOSE 5312

RUN apk add -U --no-cache ca-certificates

COPY --from=builder /server/server /server

CMD ["/server"]
