package com.project.exe.common.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class UrlConstant {

    // Actuator
    public static final String ACTUATOR = "/actuator";
    public static final String ERROR = "/error";

    // S3
    public static final String S3_BASE_URL = "/s3";
    public static final String UPLOAD = "/upload";
    public static final String DOWNLOAD = "/download";
    public static final String DOWNLOAD_ZIP = "/download-zip";
    public static final String COMMENT = "/comment";

    // Workflow
    public static final String WORK_FLOW = "/work-flow";
    public static final String TICKET = "/ticket";
    public static final String PO_ITEM = "/po-item";
    public static final String DEVIATION = "/deviation";
    public static final String RFI_TICKET = "/rfi-ticket";

    // Actions
    public static final String SAVE = "/save";
    public static final String CANCEL = "/cancel";
    public static final String CREATE = "/create";
    public static final String SUBMIT = "/submit";
}

