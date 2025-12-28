package com.project.exe.common.performance;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class BatchProcessor {

    private static final int DEFAULT_BATCH_SIZE = 100;

    public static <T> void processInBatches(List<T> items, Consumer<List<T>> processor) {
        processInBatches(items, DEFAULT_BATCH_SIZE, processor);
    }

    public static <T> void processInBatches(List<T> items, int batchSize, Consumer<List<T>> processor) {
        for (int i = 0; i < items.size(); i += batchSize) {
            int end = Math.min(i + batchSize, items.size());
            List<T> batch = items.subList(i, end);
            processor.accept(batch);
        }
    }

    public static <T, R> List<R> processInBatches(List<T> items, Function<List<T>, List<R>> processor) {
        return processInBatches(items, DEFAULT_BATCH_SIZE, processor);
    }

    public static <T, R> List<R> processInBatches(List<T> items, int batchSize, Function<List<T>, List<R>> processor) {
        return items.stream()
                .collect(java.util.stream.Collectors.groupingBy(item -> items.indexOf(item) / batchSize))
                .values()
                .stream()
                .flatMap(batch -> processor.apply(batch).stream())
                .toList();
    }
}

