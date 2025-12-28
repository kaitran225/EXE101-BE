package com.project.exe.common.file;

import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

public class FileValidator {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "gif"
    );

    public static boolean isValid(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return false;
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            return false;
        }

        String extension = getFileExtension(originalFilename);
        return ALLOWED_EXTENSIONS.contains(extension.toLowerCase());
    }

    private static String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1 || lastDotIndex == filename.length() - 1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1);
    }
}

