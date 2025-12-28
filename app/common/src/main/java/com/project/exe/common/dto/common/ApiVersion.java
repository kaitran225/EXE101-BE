package com.project.exe.common.dto.common;

import lombok.Getter;

@Getter
public enum ApiVersion {
    V1("v1", "1.0.0"),
    V2("v2", "2.0.0");

    private final String version;
    private final String versionNumber;

    ApiVersion(String version, String versionNumber) {
        this.version = version;
        this.versionNumber = versionNumber;
    }

    public static ApiVersion fromString(String version) {
        for (ApiVersion v : values()) {
            if (v.version.equalsIgnoreCase(version)) {
                return v;
            }
        }
        return V1; // Default to V1
    }
}

