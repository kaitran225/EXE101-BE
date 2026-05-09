package app.together.common.workflow.dto;

import app.together.common.shared.dto.BaseAuditDTO;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import app.together.common.shared.constant.MessageConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;



@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentDto extends BaseAuditDTO {
    public Long documentId;
    @NotBlank(message = MessageConstants.MESSAGE_USER_SSO_REQUIRED)
    @Size(max = 255)
    public String userSso;
    public Long categoryId;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_TITLE_REQUIRED)
    @Size(max = 500)
    public String title;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_FILE_PATH_REQUIRED)
    @Size(max = 2048)
    public String filePath;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_FILE_NAME_REQUIRED)
    @Size(max = 255)
    public String fileName;
    public Long fileSize;
    public String fileType;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_MIME_TYPE_REQUIRED)
    @Size(max = 255)
    public String mimeType;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_PROCESSING_STATUS_REQUIRED)
    @Size(max = 255)
    public String processingStatus;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_PAGE_COUNT_REQUIRED)
    @Size(max = 10)
    public Integer pageCount;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_WORD_COUNT_REQUIRED)
    @Size(max = 10)
    public Integer wordCount;
    @NotBlank(message = MessageConstants.MESSAGE_DOCUMENT_LANGUAGE_REQUIRED)
    @Size(max = 255)
    public String language;

}
