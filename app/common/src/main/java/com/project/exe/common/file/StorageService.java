package com.project.exe.common.file;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface StorageService {

    String store(MultipartFile file);

    InputStream retrieve(String fileId);

    void delete(String fileId);

    boolean exists(String fileId);
}

