package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface MenuService {
	
	public PageData  getMenuList(PageData pd)throws Exception;
	
	
	public List<PageData>  roleMenu(PageData pd)throws Exception;
	
	public List<PageData>  userMenu(PageData pd)throws Exception;
	
	public List<PageData>  roleNoMenu(PageData pd)throws Exception;
	
	public List<PageData>  userNoMenu(PageData pd)throws Exception;
		
	public boolean  setRoleAuth(PageData pd)throws Exception;
	
	public boolean  setUserAuth(PageData pd)throws Exception;

}
