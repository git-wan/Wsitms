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
        return (List<PageData>) dao.findForList("AssMapper.assessList", pd);
    }

    @Override
    public void addAss(PageData pd) throws Exception {
        String ADJUSTER = pd.getString("ADJUSTER");
        String HEADER = pd.getString("HEADER");
        PageData assresult = new PageData();
        assresult.put("ASS_OBJECT", pd.getString("ASS_OBJECT"));
        assresult.put("ASS_OBJECT", pd.getString("PLANNAME"));
        String ID = UuidUtil.get32UUID();
        pd.put("ID", ID);
        Date sdate = DateUtil.fomatDate(pd.get("ASS_DATE").toString());
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
        list.forEach(pageData->{
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
        });

        assresult.put("F_SCO", sum);
        if (ADJUSTER.equals(HEADER)) {
            if (sum >= 91) {
                assresult.put("ASS_LEVEL", "A");
            } else if (76 <= sum && sum <= 90) {
                assresult.put("ASS_LEVEL", "B");
            } else if (60 <= sum && sum <= 75) {
                assresult.put("ASS_LEVEL", "C");
            } else {
                assresult.put("ASS_LEVEL", "D");
            }
            dao.save("AssResMapper.addResult", assresult);
        }
        dao.save("AssMapper.addAss", pd);
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
        String ASS_ID = pd.getString("ASS_ID");
        String REMARK = pd.getString("REMARK");
        String ADJUSTER = pd.getString("userName");
        String PLANNAME = pd.getString("PLANNAME");
        String HEADER = (String) dao.findForObject("AssPlanMapper.getHeader",PLANNAME);
        assresult.put("ID", ASS_ID);
        Date ASS_DATE = new Date();
        assresult.put("ASS_DATE", ASS_DATE);
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
        ass.put("ASS_DATE", ASS_DATE);
        dao.save("AssMapper.upAss", ass);
        if (ADJUSTER.equals(HEADER)) {
        List<PageData> list = (List<PageData>) dao.findForList("AssMapper.getInfoSCO", ASS_ID);
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
        }
        assresult.put("F_SCO", sum);

            if (sum >= 91) {
                assresult.put("ASS_LEVEL", "A");
            } else if (76 <= sum && sum <= 90) {
                assresult.put("ASS_LEVEL", "B");
            } else if (60 <= sum && sum <= 75) {
                assresult.put("ASS_LEVEL", "C");
            } else {
                assresult.put("ASS_LEVEL", "D");
            }
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
    public List<PageData> AssResultList(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("AssResMapper.AssResultList", pd);
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
