package cn.jia.domain;
import lombok.Data;

@Data
public class Grade {
    private Integer id;

    private Integer userId;

    private Float score;

    private String classify;

    private String origQuest;

    private String scoreDetail;
}