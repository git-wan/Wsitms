package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.StateService;
import com.wsit.utils.DbConnectable;
import com.wsit.utils.IpConnectable;
import com.wsit.utils.PageData;

import net.sf.json.JSONArray;
@Service
public class StateServiceImp implements StateService{
    @Resource
	DaoSupport dao;

	@Override
	public List<PageData> ipPatorl(PageData pd) throws Exception {		
		return (List<PageData>) dao.findForList("EntityPropMapper.ipPatorl", null);
	}

	@Override
	public List<PageData> dbPatorl(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("EntityPropMapper.dbPatorl", null);
	}

	@Override
	public List<PageData> tableSpace(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("EntityPropMapper.tableSpace", null);
	}

	@Override
	public List<PageData> ipStatus(PageData pd) throws Exception {
		//JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
        //List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		
        			
			if(pd.getString("PROPERTYNO").equals("IP")){
				List<PageData> list= ipPatorl(null);
				for (PageData pageData : list) {
				Boolean con=IpConnectable.ping(pageData.getString("PROPERTYVALUE"));
				
				if(con){
					pageData.put("PROPERTYCHAR", "Connected");
					pageData.put("STATUS", "OK");
				}else{
					pageData.put("PROPERTYCHAR", "TimeOut");
					pageData.put("STATUS", "Error");
				}
				}
				return list;
			}
			
			if(pd.getString("PROPERTYNO")=="Tablespace"){
				
			}
			if(pd.getString("PROPERTYNO")=="DBCONNECT"){
				
			}
		
		return null;
	}

	@Override
	public List<PageData> dbStatus(PageData pd) throws Exception {
		List<PageData> list = (List<PageData>) dao.findForList("EntityPropMapper.dbPatorl", null);
		
		   for (PageData pageData : list) {
			String ENTITYNO= pageData.getString("ENTITYNO");
			List<PageData> dbList = (List<PageData>) dao.findForList("EntityPropMapper.dbList", ENTITYNO);
			String pwd=null;
			String user=null;
			String sid=null;
			String host=null;
			for (PageData db : dbList) {
				if(db.getString("PROPERTYNAME").equals("PASSWORD")){
					 pwd=db.getString("PROPERTYVALUE");
				}
				if(db.getString("PROPERTYNAME").equals("USER")){
					 user=db.getString("PROPERTYVALUE");
				}
				if(db.getString("PROPERTYNAME").equals("SID")){
					 sid=db.getString("PROPERTYVALUE");
				}
				if(db.getString("PROPERTYNAME").equals("IpAddress")){
					 host=db.getString("PROPERTYVALUE");
				}				
			}
			Boolean con=false;
			if(pwd!=null&&user!=null&&sid!=null&&host!=null){
				con=DbConnectable.getConnection(host, sid, user, pwd);
			}
			if(con){
				pageData.put("PROPERTYCHAR", "Disconnected");
				pageData.put("STATUS", "Error");
			}
		}
		return list;
	}

	@Override
	public List<PageData> tableSpaceStatus(PageData pd) throws Exception {
		
		return null;
	}
	
	
	
    
}
