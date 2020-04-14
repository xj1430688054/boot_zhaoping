package cn.jia.domain;

import lombok.Data;

import java.util.Date;

/**
 * Created by matou on 2020/01/4.
 * 职位申请
 */
@Data
public class Apply {
    private Integer id;
    private Integer pId;
    private Integer userId;
    private Integer resumeId; //1代表在线简历，2代表附件简历
    private Integer state;
    private Integer handleUser;
    private Date handleTime;
    private Date applyTime;


    public Apply(Integer id, Integer userId, Integer pId, Integer resumeId, Integer state, Integer handleUser,
                 Date handleTime,Date applyTime) {
        this.id = id;
        this.pId = pId;
        this.userId = userId;
        this.resumeId = resumeId;
        this.state = state;
        this.handleTime = handleTime;
        this.handleUser = handleUser;
        this.applyTime = applyTime;
    }
    public Apply(){}

    public static enum ApplyState{
        DCK(0),YM(1),EM(2),TG(3),TT(4);
        public int value;
        ApplyState(int value){
            this.value = value;
        }
    }
}
