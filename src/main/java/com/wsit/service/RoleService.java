package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface RoleService {
	
	
	public List<PageData> roleList(PageData pd)throws Exception;
	
	public void addRole(PageData pd)throws Exception;
	
	public void modRole(PageData pd)throws Exception;

}
