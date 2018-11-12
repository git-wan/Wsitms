package com.wsit.service.imp;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentProducer;
import org.apache.http.entity.EntityTemplate;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
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
					pageData.put("STATUS", "ERROR");
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
				pageData.put("PROPERTYCHAR", "Connected");
				pageData.put("STATUS", "Ok");
			}else{
				pageData.put("PROPERTYCHAR", "Disconnected");
				pageData.put("STATUS", "ERROR");
			}
		}
		return list;
	}

	@Override
	public List<PageData> tableSpaceStatus(PageData pd) throws Exception {
		
		return null;
	}

	@Override
	public List<PageData> queryTable(PageData pd) throws Exception {
		List<PageData> dbList = (List<PageData>) dao.findForList("EntityPropMapper.dbList", pd.getString("ENTITYNO"));
		String pwd=null;
		String user=null;
		String sid=null;
		String host=null;
		List<PageData> list = null;
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
		//Boolean con=false;
		if(pwd!=null&&user!=null&&sid!=null&&host!=null){
			list = DbConnectable.getTable(host, sid, user, pwd);
			return list;
		}

		return null;
	}

	@Override
	public void addError(PageData pd) throws Exception {		
		   JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
		   List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		   String PROBLEMBACKSEQ = list.get(0).getString("PROBLEMBACKSEQ");
		   dao.delete("QuestMapper.delOp", PROBLEMBACKSEQ);
		   for (PageData pageData : list) {
			   dao.save("QuestMapper.addOp", pageData);
		}
	}

	@Override
	public void addStatus(PageData pd) throws Exception {
		   JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
		   List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		   Date date = new Date();
		   for (PageData pageData : list) {			   
			   pageData.put("CYCLETIME", date);
			   dao.save("QuestMapper.addStatus", pageData);
		}
		
	}

	@Override
	public List<String> queryEntity() throws Exception {
		
		return (List<String>) dao.findForList("StatusMapper.queryEntity", null);
	}

	@Override
	public List<PageData> queryStatus(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("StatusMapper.queryStatus", pd);
	}

	@Override
	public List<PageData> webStatus(PageData pd) throws Exception {
		
		if(pd.getString("PROPERTYNO").equals("WEB")){
			List<PageData> list= webPatorl(null);
			 HttpClient client = HttpClientBuilder.create().build();


			for (PageData pageData : list) {
			 HttpPost post = new HttpPost(pageData.getString("PROPERTYVALUE"));			
			 HttpResponse response = client.execute(post);
			 int code=response.getStatusLine().getStatusCode();
			if(code==200||code==302){
				pageData.put("PROPERTYCHAR", code);
				pageData.put("STATUS", "OK");
			}else{
				pageData.put("PROPERTYCHAR", code);
				pageData.put("STATUS", "ERROR");
			}
			}
			return list;
		}			
	 return null;
	
 


	
	
	
	}

	@Override
	public List<PageData> webPatorl(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("EntityPropMapper.webPatorl", null);
	}
	
	
	
    
}
