package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;

import com.wsit.dao.DAO;
import com.wsit.service.SaleReportService;
import com.wsit.utils.DbConnectable;
import com.wsit.utils.IpConnectable;
import com.wsit.utils.PageData;

/**
 * @author wancheng
 *
 *         2018年10月18日下午5:21:55
 */
@Service
public class SaleReportServiceImp implements SaleReportService {
	@Resource(name = "daoSupport2")
	DAO dao;
	@Resource(name = "daoSupport")
	DAO daoSupport;

	@Override
	public List<PageData> sale(PageData pd) throws Exception {

		return (List<PageData>) dao.findForList("SaleMapper.querySale", pd);
	}

	@Override
	public void dutyInput(PageData pd) throws Exception {
		List<PageData> list = (List<PageData>) daoSupport.findForList("EntityPropMapper.ipPatorl", null);
		String errorLog = "";
		pd.put("SERVERIP", "√");
		pd.put("GATEWAY", "√");
		for (PageData pageData : list) {
			Boolean con = IpConnectable.ping(pageData.getString("PROPERTYVALUE"));
			if (!con) {
				errorLog = errorLog + pageData.get("ENTITYNAME") + "IP异常   ";
				pd.put("SERVERIP", "×");
				if (pageData.getString("ENTITYNAME").contains("网关")) {
					pd.put("GATEWAY", "×");
				}
			}
		}
		List<PageData> tableList = (List<PageData>) daoSupport.findForList("EntityPropMapper.tableSpace", null);
		String pwd = null;
		String user = null;
		String sid = null;
		String host = null;
		for (PageData pageData : tableList) {
			List<PageData> dbList = (List<PageData>) daoSupport.findForList("EntityPropMapper.dbList",
					pageData.getString("ENTITYNO"));
			for (PageData db : dbList) {
				if (db.getString("PROPERTYNAME").equals("PASSWORD")) {
					pwd = db.getString("PROPERTYVALUE");
				}
				if (db.getString("PROPERTYNAME").equals("USER")) {
					user = db.getString("PROPERTYVALUE");
				}
				if (db.getString("PROPERTYNAME").equals("SID")) {
					sid = db.getString("PROPERTYVALUE");
				}
				if (db.getString("PROPERTYNAME").equals("IpAddress")) {
					host = db.getString("PROPERTYVALUE");
				}
				if (db.getString("ENTITYNAME").contains("一卡通")) {
					pd.put("ONESERVER", "√");
				}
				if (db.getString("ENTITYNAME").contains("OA")) {
					pd.put("OASERVER", "√");
				}
				if (db.getString("ENTITYNAME").contains("会员")) {
					pd.put("MEMSERVER", "√");
				}
				if (db.getString("ENTITYNAME").contains("供应链")) {
					pd.put("SUPSERVER", "√");
				}
				if (db.getString("ENTITYNAME").contains("NC")) {
					pd.put("NCSERVER", "√");
				}
				if (db.getString("ENTITYNAME").contains("人事")) {
					pd.put("PERSONSERVER", "√");
				}
				if (pwd != null && user != null && sid != null && host != null) {
					List<PageData> table = DbConnectable.getTable(host, sid, user, pwd);
					if (null != table) {
						for (PageData pageData2 : table) {
							if (Double.parseDouble(pageData2.get("UTILIZATION") + "") > 98) {

								if (db.getString("ENTITYNAME").contains("一卡通")) {
									pd.put("ONESERVER", "×");
								}
								if (db.getString("ENTITYNAME").contains("OA")) {
									pd.put("OASERVER", "×");
								}
								if (db.getString("ENTITYNAME").contains("会员")) {
									pd.put("MEMSERVER", "×");
								}
								if (db.getString("ENTITYNAME").contains("供应链")) {
									pd.put("SUPSERVER", "×");
								}
								if (db.getString("ENTITYNAME").contains("NC")) {
									pd.put("NCSERVER", "×");
								}
								if (db.getString("ENTITYNAME").contains("人事")) {
									pd.put("PERSONSERVER", "×");
								}

								errorLog = errorLog + db.get("ENTITYNAME") + "表空间异常   ";
							}
						}
					}
				}
			}
		}

		if (pd.getString("DUTYTYPE").equals("早班")) {
			List<PageData> webList = (List<PageData>) daoSupport.findForList("EntityPropMapper.webPatorl", null);
			HttpClient client = HttpClientBuilder.create().build();
			for (PageData pageData : webList) {
				if (pageData.getString("ENTITYNAME").contains("OA")) {
					pd.put("OAWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("一卡通")) {
					pd.put("ONEWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("合同")) {
					pd.put("CONWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("NC")) {
					pd.put("NCWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("人事")) {
					pd.put("PERSONWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("供应链")) {
					pd.put("SUPWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("会员")) {
					pd.put("MEMWEB", "√");
				}
				if (pageData.getString("ENTITYNAME").contains("投诉")) {
					pd.put("COMWEB", "√");
				}
				HttpPost post = new HttpPost(pageData.getString("PROPERTYVALUE"));
				HttpResponse response = client.execute(post);
				int code = response.getStatusLine().getStatusCode();
				if (code != 200 && code != 302) {
					if (pageData.getString("ENTITYNAME").contains("OA")) {
						pd.put("OAWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("一卡通")) {
						pd.put("ONEWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("合同")) {
						pd.put("CONWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("NC")) {
						pd.put("NCWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("人事")) {
						pd.put("PERSONWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("供应链")) {
						pd.put("SUPWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("会员")) {
						pd.put("MEMWEB", "×");
					}
					if (pageData.getString("ENTITYNAME").contains("投诉")) {
						pd.put("COMWEB", "×");
					}
					errorLog = errorLog + pageData.get("ENTITYNAME") + "WEB异常   ";
				}
			}
		}
		pd.put("ERRORLOG", errorLog);
		daoSupport.delete("DutyMapper.deleteDuty", pd);
		daoSupport.save("DutyMapper.addDuty", pd);
	}

}
