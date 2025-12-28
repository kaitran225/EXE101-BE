package com.project.exe.common.file;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

public interface FileService {

    String upload(MultipartFile file);

    InputStream download(String fileId);

    void delete(String fileId);

    List<String> listFiles();

    boolean exists(String fileId);
}

