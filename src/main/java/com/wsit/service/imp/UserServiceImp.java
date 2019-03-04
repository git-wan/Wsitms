package com.wsit.service.imp;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.wsit.dao.DaoSupport;
import com.wsit.service.UserService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;

@Service
public class UserServiceImp implements UserService {
	@Resource
	DaoSupport dao;

	@Override
	public PageData getUserInfo(PageData pd) throws Exception {
		return (PageData) dao.findForObject("UserMapper.getUserInfo", pd);
	}

	@Override
	public List<PageData> userPage(PageData pd) throws Exception {

		return (List<PageData>) dao.findForList("UserMapper.userPage", pd);
	}

	@Override
	public void addUser(PageData pd) throws Exception {
		dao.save("UserMapper.addUser", pd);

	}

	@Override
	public void modUser(PageData pd) throws Exception {
		dao.update("UserMapper.modUser", pd);
	}

	@Override
	public PageData userOne(String id) throws Exception {
		return (PageData) dao.findForObject("UserMapper.userOne", id);
	}

	@Override
	public List<PageData> userList() throws Exception {
		return (List<PageData>) dao.findForList("UserMapper.userList", null);
	}

	@Override
	public void editPass(PageData pd) throws Exception {
		dao.update("UserMapper.editPass", pd);
	}

	@Override
	public List<PageData> getZX() throws Exception {
		return (List<PageData>) dao.findForList("UserMapper.getZX", null);
	}

	@Override
	public List<PageData> mon_user(PageData pd) throws Exception {
		List<PageData> monusers = new ArrayList<PageData>();
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -10);
		date=calendar.getTime();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
		String dateStr = format.format(date);
		Date sdate = DateUtil.fomatDate1(dateStr);
		pd.put("ASS_DATE", sdate);
		String userName = pd.getString("userName");
		pd.put("ADJUSTER", userName);
		if(userName.equals("高兴")){
			pd.put("STATUS", "等待负责人评定");
			return (List<PageData>) dao.findForList("AssMapper.getMonthAssObj", pd);
		}
		if(userName.equals("肖凯") || userName.equals("钟育林")){
			pd.put("STATUS", "等待上级评定");
			List<PageData> assList = (List<PageData>) dao.findForList("AssMapper.getMonthAssObj", pd);//找到上级评定的对象
			String objStr = (String) dao.findForObject("AssMapper.getObj", pd);
			
			//if(assList.size()>0){
				if(objStr==""||objStr==null){
					pd.clear();
					pd.put("ASS_OBJECT", userName);
					assList.add(pd);
				//}						
			}	
			return assList;
		}		
		pd.clear();
		pd.put("ASS_OBJECT", userName);
		monusers.add(pd);
		return monusers;
	}
		/*Date date = new Date();
		PageData pds = new PageData();
		PageData pdPara = new PageData();
		List<String> assList = new ArrayList<String>();
		List<PageData> list = new ArrayList<PageData>();
		List<String> objList = new ArrayList<String>();
		List<PageData> monusers = new ArrayList<PageData>();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
		String dateStr = format.format(date);
		Date sdate = DateUtil.fomatDate1(dateStr);
		pd.put("ASS_DATE", sdate);
		String userName = pd.getString("userName");
		pds.put("ASS_OBJECT", userName);
		boolean flag = true;
		if (userName.equals("高兴") || userName.equals("肖凯") || userName.equals("钟育林")) {
			assList = (List<String>) dao.findForList("AssMapper.getMonthAss_3", pd);
			pdPara.put("ASS_DATE", sdate);
			pdPara.put("assList", assList);
			list = (List<PageData>) dao.findForList("AssMapper.getMonthAss_2", pdPara);
        
			for (PageData pageData : list) {
				String assobj = pageData.getString("ASS_OBJECT");
				String status = pageData.getString("STATUS");
				if (status.equals("等待负责人评定")) {
					objList.add(assobj);
				}
			}
			for (PageData pageData : list) {
				String assobj = pageData.getString("ASS_OBJECT");
				String status = pageData.getString("STATUS");
				if (userName.equals(assobj)) {
					flag = false;
				}
				if (userName.equals("高兴")) {
					if (status.equals("等待负责人评定")) {
						monusers.add(pageData);
					}
				} else if (userName.equals("肖凯") || userName.equals("钟育林")) {
					if (status.equals("等待上级评定")) {
						for (String pageData2 : objList) {
							if(!assobj.equals(pageData2)){
								monusers.add(pageData);
							}
						}
						
					}
				}
			}
			if (userName.equals("高兴")) {
				return monusers;
			}
		}
		if (flag) {
			monusers.add(pds);
		}
		return monusers;
	}
*/
}
