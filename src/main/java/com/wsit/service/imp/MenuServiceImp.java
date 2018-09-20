package com.wsit.service.imp;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.MenuService;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

import net.sf.json.JSONArray;
@Service
public class MenuServiceImp implements MenuService{
    @Resource
	DaoSupport dao;
	@Override
	public PageData getMenuList(PageData pd) throws Exception {
		
		   String USER_ROLE=pd.getString("USER_ROLE");
		   String USER_ID =pd.getString("USER_ID");
           //得到menu
		 //  List<PageData> menus=(List<PageData>) dao.findForList("MenuMapper.getMenus", USER_ROLE);
           List<PageData> modules =(List<PageData>) dao.findForList("MenuMapper.getRloeMoudles", USER_ROLE);
           List<PageData>  userMudules=(List<PageData>) dao.findForList("MenuMapper.getUserMoudles", USER_ID);
           if(userMudules!=null){
        	   modules.addAll(userMudules);
           }
           PageData module_menus=new PageData();
           module_menus.put("modules",modules);
  //         module_menus.put("menus",menus);
		   return module_menus;
	}
	@Override
	public List<PageData> roleMenu(PageData pd) throws Exception {
		String USER_ROLE=pd.getString("USER_ROLE");
		if(Tools.notEmpty(pd.getString("ROLE_NAME"))){
			USER_ROLE=pd.getString("ROLE_NAME");
		}
		return (List<PageData>) dao.findForList("MenuMapper.getRloeMoudles", USER_ROLE);
	}
	@Override
	public List<PageData> roleNoMenu(PageData pd) throws Exception {
		PageData map=new PageData();
		String USER_ID=pd.getString("USER_ID");
		String USER_ROLE=pd.getString("USER_ROLE");
		if(Tools.notEmpty(pd.getString("ROLE_NAME"))){
			USER_ROLE=pd.getString("ROLE_NAME");
		}
		 List<PageData> modules=   (List<PageData>) dao.findForList("MenuMapper.getRloeMoudles", USER_ROLE);
		 if(modules.size()<1){
			 modules=null;
		 }
		 map.put("modules", modules);
		 return (List<PageData>) dao.findForList("MenuMapper.getNoRloeMoudles", map);
	}
	//@SuppressWarnings("null")
	@Override
	public boolean setRoleAuth(PageData pd) throws Exception {
	   
	   String ROLE_NAME = pd.getString("ROLE_NAME");
	   JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
	   if(Tools.notEmpty(ROLE_NAME)&&json.size()>0){
	   List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
	   PageData module=new PageData();
       dao.delete("MenuMapper.delRoleMod",ROLE_NAME);
	   for (PageData pageData : list) {
		   module.put("ROLE_NAME",ROLE_NAME);
		   module.put("MODULE_ID", pageData.get("MODULE_ID").toString());
		   dao.save("MenuMapper.addRoleMod", module);
	  }	
	       return true;
	}else if(Tools.notEmpty(ROLE_NAME)&&json.size()<1){
	       dao.delete("MenuMapper.delRoleMod",ROLE_NAME);
	       return true;
	}
	   return false;
	}
	@Override
	public List<PageData> userMenu(PageData pd) throws Exception {
		 String USER_ID=pd.getString("USER_ID");
		 /* List<PageData> userMenus=(List<PageData>) dao.findForList("MenuMapper.getUserMoudles", USER_ID);
		 List<PageData> modules=  roleMenu(pd);
		if(userMenus.size()>0){
			userMenus.addAll(modules);
		}*/
		//(List<PageData>) dao.findForList("MenuMapper.getNoRloeMoudles", map);
		return (List<PageData>) dao.findForList("MenuMapper.getUserMoudles", USER_ID);
	}
	@Override
	public boolean setUserAuth(PageData pd) throws Exception {		
		   String USER_ID = pd.getString("USER_ID");
		   JSONArray json=JSONArray.fromObject(pd.get("jsonData"));
		   if(Tools.notEmpty(USER_ID)&&json.size()>0){
		   List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		   PageData module=new PageData();
	       dao.delete("MenuMapper.delUserMod",USER_ID);
		   for (PageData pageData : list) {
			   module.put("USER_ID",USER_ID);
			   module.put("MODULE_ID", pageData.get("MODULE_ID").toString());
			   dao.save("MenuMapper.addRoleMod", module);
		  }	
		       return true;
		}else if(Tools.notEmpty(USER_ID)&&json.size()<1){
		       dao.delete("MenuMapper.delUserMod",USER_ID);
		       return true;
		}
		       return false;
	}
	@Override
	public List<PageData> userNoMenu(PageData pd) throws Exception {
		 String USER_ID=pd.getString("USER_ID");
		 List<PageData> userMenus=(List<PageData>) dao.findForList("MenuMapper.getUserMoudles", USER_ID);
		 List<PageData> modules=  roleMenu(pd);
		 if(modules.size()>0){
				if(userMenus.size()>0){
					userMenus.addAll(modules);
				}
				if(userMenus.size()<1){
					userMenus=modules;
				}
		 }
		 
		 if(modules.size()<1){
/*				if(userMenus.size()>0){
					userMenus.addAll(modules);
				}*/
				if(userMenus.size()<1){
					userMenus=null;
				}
		 }

		userMenus=(List<PageData>) dao.findForList("MenuMapper.getNoUserMoudles", userMenus);

		return userMenus;
	}
}
