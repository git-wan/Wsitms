package com.wsit.service.imp;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.AssessService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.UuidUtil;

@Service
public class AssessServiceImp implements AssessService {
    @Resource
    DaoSupport dao;

    @Override
    public List<PageData> assInfoList(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("AssInfoMapper.assessPage", pd);
    }

    @Override
    public void addAssInfo(PageData pd) throws Exception {
        dao.save("AssInfoMapper.addAssInfo", pd);
    }

    @Override
    public void modAssInfo(PageData pd) throws Exception {
        dao.update("AssInfoMapper.modAssInfo", pd);
    }

    @Override
    public void delAssInfo(PageData pd) throws Exception {
        dao.delete("AssInfoMapper.delAssInfo", pd);
    }

    @Override
    public List<PageData> assessList(PageData pd) throws Exception {
        List<String> objs = (List<String>) dao.findForList("AssMapper.getlead", pd);
        return (List<PageData>) dao.findForList("AssMapper.assessList", objs);
    }

    @Override
    public void addAss(PageData pd) throws Exception {
        String ADJUSTER = pd.getString("ADJUSTER");
        PageData assresult = new PageData();
        assresult.put("ASS_OBJECT", pd.getString("ASS_OBJECT"));
        String ID = UuidUtil.get32UUID();
        pd.put("ID", ID);
        Date sdate = DateUtil.fomatDate1(pd.get("ASS_DATE").toString());
        pd.put("ASS_DATE", sdate);
        assresult.put("ID", ID);
        assresult.put("ASS_DATE", sdate);
        assresult.put("ADJUSTER", ADJUSTER);
        int sum = 0;
        for (Object key : pd.keySet()) {
            String keyStr = key.toString();
            PageData assSco = new PageData();
            if (keyStr.length() == 32) {
                sum = sum + Integer.parseInt(pd.get(keyStr) + "");
                assSco.put("ASS_ID", ID);
                assSco.put("ASSINFO_ID", keyStr);
                assSco.put("ASS_SCORE", pd.getString(keyStr));
                dao.save("AssScoMapper.addAssSco", assSco);
            }
        }
        pd.put("T_SCO", sum);
        List<PageData> list = (List<PageData>) dao.findForList("AssMapper.getInfoSCO", ID);
        int score = 0;
        for (PageData pageData : list) {
            if (pageData.getString("SCOREGROUP").equals("工作质量")) {
                assresult.put("QUALITY", pageData.get("ASS_SCORE"));

            }
            if (pageData.getString("SCOREGROUP").equals("工作效率")) {
                assresult.put("EFFICIENCY", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("考勤纪律")) {
                assresult.put("CHECKWORK", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("行为规范")) {
                assresult.put("ACTION", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("责任感")) {
                assresult.put("RESPONSIBILITY", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("创新性")) {
                assresult.put("CREATIVE", pageData.get("ASS_SCORE"));
            }
            score = Integer.parseInt(pageData.get("ASS_SCORE").toString()) + score;
        }
        assresult.put("F_SCO", score);
        if (ADJUSTER.equals("高兴")) {


            if (score >= 91) {
                assresult.put("ASS_LEVEL", "A");
            } else if (76 <= score && score <= 90) {
                assresult.put("ASS_LEVEL", "B");
            } else if (60 <= score && score <= 75) {
                assresult.put("ASS_LEVEL", "C");
            } else {
                assresult.put("ASS_LEVEL", "D");
            }
            PageData f_ass = new PageData();
            List<PageData> t_scos = (List<PageData>) dao.findForList("AssMapper.getT_SCO", pd);
            int num1 = 0;
            int num2 = 0;
            double f_sco = 0;
            if (t_scos.size() > 1) {
                for (PageData pageData : t_scos) {
                    String adjust = pageData.getString("ADJUSTER");
                    String assobj = pageData.getString("ASS_OBJECT");
                    if (adjust.equals(assobj)) {
                        num1 = Integer.parseInt(pageData.get("T_SCO").toString());
                    } else {
                        num2 = Integer.parseInt(pageData.get("T_SCO").toString());
                    }
                }
                int num3 = Integer.parseInt(pd.get("T_SCO").toString());
                f_sco = num1 + (num2 + num3) / 2;
            } else {
                num1 = Integer.parseInt(t_scos.get(0).get("T_SCO").toString());
                num2 = Integer.parseInt(pd.get("T_SCO").toString());
                f_sco = num1 + num2;
            }
            f_ass.put("F_SCO", f_sco);
            if (f_sco >= 91) {
                f_ass.put("SCO_LEVEL", "A");
            } else if (76 <= f_sco && f_sco <= 90) {
                f_ass.put("SCO_LEVEL", "B");
            } else if (60 <= f_sco && f_sco <= 75) {
                f_ass.put("SCO_LEVEL", "C");
            } else {
                f_ass.put("SCO_LEVEL", "D");
            }
            f_ass.put("ID", UuidUtil.get32UUID());
            f_ass.put("ASS_DATE", pd.get("ASS_DATE"));
            f_ass.put("ASS_OBJECT", pd.get("ASS_OBJECT"));
            dao.save("AssMapper.addF_ASS", f_ass);
            pd.put("STATUS", "评定完成");
            dao.save("AssMapper.upStatus", pd);

        } else if (ADJUSTER.equals("肖凯") || ADJUSTER.equals("钟育林")) {
            if (ADJUSTER.equals(pd.get("ASS_OBJECT") + "")) {
                pd.put("STATUS", "等待负责人评定");
                dao.save("AssResMapper.AssMapper.addStatus", pd);
            } else {
                pd.put("STATUS", "等待负责人评定");
                dao.save("AssMapper.upStatus", pd);
            }
        } else {
            pd.put("STATUS", "等待上级评定");
            dao.save("AssMapper.addStatus", pd);
        }
/*		ass_status.put("STATUS", pd.get("STATUS"));
		ass_status.put("ASS_DATE", sdate);
		ass_status.put("ASS_OBJECT", pd.get("ASS_OBJECT"));*/

        dao.save("AssMapper.addAss", pd);
        dao.save("AssResMapper.addResult", assresult);
    }

    @Override
    public void modAss(PageData pd) throws Exception {
    }

    @Override
    public void delAss(PageData pd) throws Exception {

    }

    @Override
    public List<PageData> AssResList(PageData pd) throws Exception {
        PageData paData = new PageData();
        List<String> objs = (List<String>) dao.findForList("AssMapper.getlead", pd);
        paData.put("objs", objs);
        if (null == pd.get("ASS_DATE")) {
            paData.put("ASS_DATE", null);
        } else {
            paData.put("ASS_DATE", pd.get("ASS_DATE"));
        }
        return (List<PageData>) dao.findForList("AssResMapper.AssResList", paData);
    }

    @Override
    public void addAssRes(PageData pd) throws Exception {

    }

    @Override
    public void modAssRes(PageData pd) throws Exception {

    }

    @Override
    public void delAssRes(PageData pd) throws Exception {

    }

    @Override
    public List<PageData> getMonthAss(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("AssInfoMapper.getMonthAss", pd);
    }

    @Override
    public List<PageData> assInfo(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("AssMapper.assInfo", pd);
    }

    @Override
    public void modAssSco(PageData pd) throws Exception {
        PageData assresult = new PageData();
        String userName = pd.getString("userName");
        String ASS_ID = pd.getString("ASS_ID");
        String ASS_OBJECT = pd.getString("ASS_OBJECT");
        String dateStr = pd.getString("ASS_DATE");
        String REMARK = pd.getString("REMARK");
        assresult.put("ID", ASS_ID);
        Date ASS_DATE = DateUtil.fomatDate1(dateStr);
        PageData ass = new PageData();
        int sum = 0;
        for (Object key : pd.keySet()) {
            String keyStr = key.toString();
            PageData assSco = new PageData();
            if (keyStr.length() == 32) {
                sum = sum + Integer.parseInt(pd.get(keyStr) + "");
                assSco.put("ASS_ID", ASS_ID);
                assSco.put("ASSINFO_ID", keyStr);
                assSco.put("ASS_SCORE", pd.getString(keyStr));
                dao.save("AssScoMapper.modAssSco", assSco);
            }
        }
        ass.put("ID", ASS_ID);
        ass.put("T_SCO", sum);
        ass.put("REMARK", REMARK);
        dao.save("AssMapper.upAss", ass);


        List<PageData> list = (List<PageData>) dao.findForList("AssMapper.getInfoSCO", ASS_ID);
        int score = 0;
        for (PageData pageData : list) {
            if (pageData.getString("SCOREGROUP").equals("工作质量")) {
                assresult.put("QUALITY", pageData.get("ASS_SCORE"));

            }
            if (pageData.getString("SCOREGROUP").equals("工作效率")) {
                assresult.put("EFFICIENCY", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("考勤纪律")) {
                assresult.put("CHECKWORK", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("行为规范")) {
                assresult.put("ACTION", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("责任感")) {
                assresult.put("RESPONSIBILITY", pageData.get("ASS_SCORE"));
            }
            if (pageData.getString("SCOREGROUP").equals("创新性")) {
                assresult.put("CREATIVE", pageData.get("ASS_SCORE"));
            }
            score = Integer.parseInt(pageData.get("ASS_SCORE").toString()) + score;
        }
        assresult.put("F_SCO", score);

        if (userName.equals("高兴")) {

            if (score >= 91) {
                assresult.put("ASS_LEVEL", "A");
            } else if (76 <= score && score <= 90) {
                assresult.put("ASS_LEVEL", "B");
            } else if (60 <= score && score <= 75) {
                assresult.put("ASS_LEVEL", "C");
            } else {
                assresult.put("ASS_LEVEL", "D");
            }

            PageData fass = new PageData();
            fass.put("ASS_OBJECT", ASS_OBJECT);
            fass.put("ASS_DATE", ASS_DATE);
            List<PageData> t_scos = (List<PageData>) dao.findForList("AssMapper.getT_SCO", fass);
            int num1 = 0;
            int num2 = 0;
            double f_sco = 0;
            if (t_scos.size() > 1) {
                for (PageData pageData : t_scos) {
                    String adjust = pageData.getString("ADJUSTER");
                    String assobj = pageData.getString("ASS_OBJECT");
                    if (!adjust.equals("高兴")) {
                        if (adjust.equals(assobj)) {
                            num1 = Integer.parseInt(pageData.get("T_SCO").toString());
                        } else {
                            num2 = Integer.parseInt(pageData.get("T_SCO").toString());
                        }
                    }
                }
                /* int num3 = Integer.parseInt(pd.get("T_SCO").toString()); */
                f_sco = num1 + (num2 + sum) / 2;
            } else {
                num1 = Integer.parseInt(t_scos.get(0).get("T_SCO").toString());
                /* num2 = Integer.parseInt(pd.get("T_SCO").toString()); */
                f_sco = num1 + sum;
            }
            fass.put("F_SCO", f_sco);
            if (f_sco >= 91) {
                fass.put("SCO_LEVEL", "A");
            } else if (76 <= f_sco && f_sco <= 90) {
                fass.put("SCO_LEVEL", "B");
            } else if (60 <= f_sco && f_sco <= 75) {
                fass.put("SCO_LEVEL", "C");
            } else {
                fass.put("SCO_LEVEL", "D");
            }
            dao.update("AssResMapper.upF_sco", fass);
            dao.update("AssResMapper.upSco", assresult);
        }
    }

    @Override
    public List<PageData> queryDate(PageData pd) throws Exception {
        String dateStr = pd.getString("ASS_DATE");
        Date ASS_DATE = DateUtil.fomatDate1(dateStr);
        pd.put("ASS_DATE", ASS_DATE);
        List<String> objs = (List<String>) dao.findForList("AssMapper.getlead", pd);
        pd.put("objs", objs);
        return (List<PageData>) dao.findForList("AssMapper.queryDate", pd);
    }

    @Override
    public List<PageData> asjList(PageData pd) throws Exception {
        // TODO Auto-generated method stub
        return (List<PageData>) dao.findForList("AssPlanMapper.asjList", null);
    }

    @Override
    public void addAssPlan(PageData pd) throws Exception {
        String dateStr = pd.getString("STARTDATE");
        String dateStr1 = pd.getString("ENDDATE");
        Date STARTDATE = DateUtil.fomatDate1(dateStr);
        Date ENDDATE = DateUtil.fomatDate1(dateStr1);
        pd.put("STARTDATE", STARTDATE);
        pd.put("ENDDATE", ENDDATE);
        pd.put("ID", UuidUtil.get32UUID());
        dao.save("AssPlanMapper.addAssPlan", pd);

    }

    @Override
    public List<PageData> assplanList(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("AssPlanMapper.assplanList", null);
    }

    @Override
    public List<PageData> asspatList(PageData pd) throws Exception {
        // TODO Auto-generated method stub
        return (List<PageData>) dao.findForList("AssRuleMapper.assTimeList", null);
    }

    @Override
    public List<PageData> AssResultList(PageData pd) throws Exception {
        PageData paData = new PageData();
        List<String> objs = (List<String>) dao.findForList("AssMapper.getlead", pd);
        paData.put("objs", objs);
        if (null == pd.get("ASS_DATE")) {
            paData.put("ASS_DATE", null);
        } else {
            String dateStr = pd.getString("ASS_DATE");
            Date ASS_DATE = DateUtil.fomatDate1(dateStr);
            paData.put("ASS_DATE", ASS_DATE);
        }
        return (List<PageData>) dao.findForList("AssResMapper.AssResultList", paData);
    }

    @Override
    public void addAssAsj(PageData pd) throws Exception {
        pd.put("ID", UuidUtil.get32UUID());
        dao.save("AssPlanMapper.addAssAsj", pd);
    }

    @Override
    public void modAssAsj(PageData pd) throws Exception {
        dao.update("AssPlanMapper.modAssAsj", pd);
    }

    @Override
    public void modAssPlan(PageData pd) throws Exception {
        String dateStr = pd.getString("STARTDATE");
        String dateStr1 = pd.getString("ENDDATE");
        Date STARTDATE = DateUtil.fomatDate(dateStr);
        Date ENDDATE = DateUtil.fomatDate(dateStr1);
        pd.put("STARTDATE", STARTDATE);
        pd.put("ENDDATE", ENDDATE);
        dao.update("AssPlanMapper.modAssPlan", pd);
    }

    @Override
    public void delAssPlan(PageData pd) throws Exception {
        dao.delete("AssPlanMapper.delAssPlan", pd);
    }

    @Override
    public void delAssAsj(PageData pd) throws Exception {
        dao.delete("AssPlanMapper.delAssAsj", pd);
    }

    @Override
    public List<PageData> assInfoNameList(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("AssInfoMapper.assInfoNameList", null);
    }

    @Override
    public int isAsj(PageData pd) throws Exception {
        PageData pageData = new PageData();
        List<PageData> list = (List<PageData>) dao.findForList("AssPlanMapper.isAsj", pd);
        if (null != list && list.size() > 0) {

            List<String> listStr = (List<String>) dao.findForList("AssMapper.getAssObj", pd);
            pageData.put("objs", listStr);
            pageData.put("OBJ_GROUP", pd.getString("OBJ_GROUP"));
            pageData.put("ADJUSTER", pd.getString("userName"));
            List<String> objs = (List<String>) dao.findForList("AssPlanMapper.queryAsj", pageData);
            if (objs.size() == 0) {
                return 3;
            }
            return 2;
        }
        return 1;
    }

    @Override
    public List<String> getAsj(PageData pd) throws Exception {
        PageData pageData = new PageData();
        List<String> listStr = (List<String>) dao.findForList("AssMapper.getAssObj", pd);
        pageData.put("objs", listStr);
        pageData.put("OBJ_GROUP", pd.getString("OBJ_GROUP"));
        pageData.put("ADJUSTER", pd.getString("userName"));
        List<String> objs = (List<String>) dao.findForList("AssPlanMapper.queryAsj", pageData);
        return objs;
    }

}
