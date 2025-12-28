package com.project.exe.common.cache;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.stream.Collectors;

@Component("customKeyGenerator")
public class CacheKeyGenerator implements KeyGenerator {

    @Override
    public Object generate(Object target, Method method, Object... params) {
        String className = target.getClass().getSimpleName();
        String methodName = method.getName();
        String paramsKey = Arrays.stream(params)
                .map(param -> param != null ? param.toString() : "null")
                .collect(Collectors.joining(":"));
        return String.format("%s::%s::%s", className, methodName, paramsKey);
    }
}

