package cn.jia.dto;

import cn.jia.domain.Apply;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;

@Data
public class ApplyDto {
    private Integer applyId;

    /**
     * 职位的类别（校园招聘、社会招聘）
     */
    private Integer flag;
    private String  positionName;
    private String userName;
    private Integer state;
    private String stateTrans;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date applyTime;

    public String getStateTrans(){
        if(state == null){
            return "";
        }
        if(state.intValue() == Apply.ApplyState.DCK.value){
            return "待查看";
        }
        if(state.intValue() == Apply.ApplyState.YM.value){
            return "一面";
        }
        if(state.intValue() == Apply.ApplyState.EM.value){
            return "二面";
        }
        if(state.intValue() == Apply.ApplyState.TG.value){
            return "通过";
        }else{
            return "淘汰";
        }
    }
}
