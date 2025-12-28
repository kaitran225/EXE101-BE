package com.project.exe.common.cache;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
public class CacheService {

    @Cacheable(value = "default", keyGenerator = "customKeyGenerator")
    public <T> T get(String key, Supplier<T> supplier) {
        return supplier.get();
    }

    @CachePut(value = "default", keyGenerator = "customKeyGenerator")
    public <T> T put(String key, T value) {
        return value;
    }

    @CacheEvict(value = "default", allEntries = true)
    public void evictAll() {
        // Evict all cache entries
    }

    @CacheEvict(value = "default", key = "#key")
    public void evict(String key) {
        // Evict specific cache entry
    }
}

