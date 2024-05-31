package logging

import (
	"context"
	"io"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type contextKey int

const (
	contextKeyLogWriter contextKey = iota
)

func WriterFromContext(ctx context.Context) io.Writer {
	writer, ok := ctx.Value(contextKeyLogWriter).(io.Writer)
	if !ok {
		return nil
	}
	return writer
}

func ContextWithWriter(ctx context.Context, logger io.Writer) context.Context {
	return context.WithValue(ctx, contextKeyLogWriter, logger)
}

// LoggerFromContext returns a logger from the context, or the global logger if none is found.
// this is somewhat expensive, it should be called once per task.
func Logger(ctx context.Context) *zap.Logger {
	writer := WriterFromContext(ctx)
	if writer == nil {
		return zap.L()
	}
	p := zap.NewProductionEncoderConfig()
	p.EncodeTime = zapcore.ISO8601TimeEncoder
	fe := zapcore.NewJSONEncoder(p)
	l := zap.New(zapcore.NewTee(
		zap.L().Core(),
		zapcore.NewCore(fe, zapcore.AddSync(writer), zapcore.DebugLevel),
	))
	return l
}
