package cn.jia.dto;

import lombok.Data;

@Data
public class ScoreDetail {

    private int id;

    private String answer;

    private String result;

    public static final String RESULT_YES = "y";

    public static final String RESULT_NO = "n";
}
